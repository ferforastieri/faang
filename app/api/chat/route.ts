import { safeValidateUIMessages } from "ai";

/**
 * The chat runtime the chat screen talks to.
 *
 * One model, one path: Cloudflare's Workers AI through the `AI` binding. The
 * binding is the credential, so a deployment needs no key at all and there is
 * nothing to leak. The route validates the messages, streams the answer back in
 * the UI-message format the chat already reads, and reports its own state on
 * `GET` so an unconfigured deployment can explain itself instead of failing on
 * the first message.
 *
 * Contract kept deliberately narrow: `POST /api/chat` with `{ messages }`, a UI
 * message stream coming back, `GET /api/chat` describing what will answer.
 */

/** Bumped when the contract below changes in a way templates can depend on. */
const RUNTIME_CONTRACT = 1;

/** Streaming replies outlive the default budget on longer answers. */
export const maxDuration = 30;

/** The model Workers AI runs. `CHAT_MODEL` overrides it. */
const MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8-fast";

const SYSTEM_PROMPT = [
  "You are Faang's chat, a demo of a React design system for agent interfaces.",
  "Answer in the visitor's language, be brief and concrete, and never invent",
  "features the design system does not have: the components are source files",
  "installed with `npx faang@latest add <name>`, and the docs live at /docs.",
].join(" ");

/** The `AI` binding, narrowed to the one method this route calls. */
interface WorkersAIBinding {
  run(model: string, inputs: unknown, options?: unknown): Promise<unknown>;
}

/** The rate-limit binding from `wrangler.jsonc`, same narrowing. */
interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/** Room for a real conversation, not for a free model endpoint. */
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 4000;
const MAX_TOTAL_CHARS = 12000;

/** Empty and whitespace-only values count as unset. */
function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

/**
 * The binding, when this code runs inside a Worker. Outside one — a plain
 * `next dev`, a container — there is nothing to call and the route says so;
 * `npm run preview` runs the Worker locally, binding included.
 */
async function binding(): Promise<{
  ai: WorkersAIBinding | null;
  limiter: RateLimitBinding | null;
}> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env: bindings } = await getCloudflareContext({ async: true });
    const env = bindings as { AI?: WorkersAIBinding; CHAT_LIMIT?: RateLimitBinding };
    return { ai: env.AI ?? null, limiter: env.CHAT_LIMIT ?? null };
  } catch {
    return { ai: null, limiter: null };
  }
}

/**
 * The visitor's budget. One key per client IP, so a shared office still shares
 * one allowance; without the binding (a plain `next dev`) the check is skipped
 * rather than blocking the demo.
 */
async function withinBudget(limiter: RateLimitBinding | null, req: Request) {
  if (!limiter) return true;
  const key = req.headers.get("cf-connecting-ip") ?? "local";
  try {
    const { success } = await limiter.limit({ key });
    if (!success) console.log(`[chat] rate limited ${key}`);
    return success;
  } catch (error) {
    // Fail open: a limiter outage should not take the chat down with it.
    console.error("[chat] rate limit failed", error);
    return true;
  }
}

/** Keeps one request from being a whole conversation pasted in. */
function tooLarge(messages: { parts: { text?: string }[] }[]): boolean {
  const total = messages.reduce(
    (sum, message) => sum + message.parts.reduce((chars, part) => chars + (part.text?.length ?? 0), 0),
    0,
  );
  return (
    messages.length > MAX_MESSAGES ||
    total > MAX_TOTAL_CHARS ||
    messages.some((message) =>
      message.parts.some((part) => (part.text?.length ?? 0) > MAX_MESSAGE_CHARS),
    )
  );
}

function modelId(): string {
  return env("CHAT_MODEL") ?? MODEL;
}

/** UI messages flattened to the plain text Workers AI expects. */
function plainMessages(
  messages: { role: string; parts: { type: string; text?: string }[] }[],
): { role: "user" | "assistant"; content: string }[] {
  return messages
    .map((message) => ({
      role: message.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: message.parts
        .filter((part) => part.type === "text" && typeof part.text === "string")
        .map((part) => part.text as string)
        .join("\n")
        .trim(),
    }))
    .filter((message) => message.content.length > 0);
}

/**
 * Workers AI's own frame shape mapped onto the UI message stream: a native
 * `response` string, and for newer models OpenAI-style
 * `choices[].delta.content`. Deltas are preferred; `response` is used when
 * there is none, and a frame that repeats the whole answer so far (some models
 * do) contributes just its tail.
 */
function answerStream(
  ai: WorkersAIBinding,
  system: string,
  messages: { role: "user" | "assistant"; content: string }[],
  signal: AbortSignal,
): Response {
  const textId = crypto.randomUUID();
  const encoder = new TextEncoder();
  const frame = (payload: unknown) => encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      const send = (payload: unknown) => {
        try {
          controller.enqueue(frame(payload));
        } catch {
          /* the reader already closed the stream */
        }
      };

      controller.enqueue(frame({ type: "start" }));
      controller.enqueue(frame({ type: "start-step" }));
      controller.enqueue(frame({ type: "text-start", id: textId }));

      try {
        const result = (await ai.run(modelId(), {
          messages: [{ role: "system", content: system }, ...messages],
          stream: true,
          max_tokens: 1024,
          temperature: 0.6,
        })) as ReadableStream<Uint8Array>;

        const reader = result.getReader();
        const stop = () => void reader.cancel().catch(() => undefined);
        signal.addEventListener("abort", stop, { once: true });

        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          if (signal.aborted) break;
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            let token = "";
            try {
              const parsed = JSON.parse(payload) as {
                response?: unknown;
                choices?: { delta?: { content?: unknown } }[];
              };
              const choice = parsed.choices?.[0]?.delta?.content;
              token =
                typeof choice === "string" && choice
                  ? choice
                  : typeof parsed.response === "string"
                    ? parsed.response
                    : "";
            } catch {
              continue;
            }
            if (!token) continue;

            const delta = answer && token.startsWith(answer) ? token.slice(answer.length) : token;
            answer = answer && token.startsWith(answer) ? token : answer + token;
            if (delta) send({ type: "text-delta", id: textId, delta });
          }
        }

        signal.removeEventListener("abort", stop);
        send({ type: "text-end", id: textId });
        send({ type: "finish-step" });
        send({ type: "finish", finishReason: "stop" });
        try {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch {
          /* already closed */
        }
      } catch (error) {
        send({
          type: "error",
          errorText: error instanceof Error ? error.message : "Workers AI could not answer.",
        });
      } finally {
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      /* the request signal stops the binding's reader */
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache",
      "x-vercel-ai-ui-message-stream": "v1",
    },
  });
}

/**
 * Config probe. The UI calls this on mount so a deployment without the binding
 * can explain itself instead of letting someone type a message and hit an error.
 */
export async function GET() {
  const { ai, limiter } = await binding();
  return Response.json({
    configured: ai !== null,
    provider: ai ? "workers-ai" : null,
    providerLabel: ai ? "Workers AI" : null,
    model: ai ? modelId() : null,
    rateLimited: limiter !== null,
    reason: ai
      ? null
      : "Workers AI is not available here. Run the app as a Worker (`npm run preview`, or a deploy) to get the AI binding.",
    contract: RUNTIME_CONTRACT,
  });
}

export async function POST(req: Request) {
  const { ai, limiter } = await binding();
  if (!ai) {
    return Response.json(
      {
        error: "missing_binding",
        message:
          "Workers AI is not available here. Run the app as a Worker (`npm run preview`, or a deploy) to get the AI binding.",
      },
      { status: 503 },
    );
  }

  if (!(await withinBudget(limiter, req))) {
    return Response.json(
      {
        error: "rate_limited",
        message: "Too many messages in a minute. Wait a moment and try again.",
      },
      { status: 429, headers: { "retry-after": "60" } },
    );
  }

  const badBody = Response.json(
    { error: "invalid_body", message: "Expected JSON with a messages array." },
    { status: 400 },
  );

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badBody;
  }

  const submitted = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(submitted)) return badBody;

  // Validate before flattening: `safeValidateUIMessages` rejects a message
  // missing `parts`, a null entry and an unknown role, so a malformed body
  // gets an explained 400 instead of a bare 500 mid-stream.
  if (tooLarge(submitted as { parts: { text?: string }[] }[])) {
    return Response.json(
      {
        error: "too_large",
        message: `Keep it to ${MAX_MESSAGES} messages and ${MAX_MESSAGE_CHARS} characters each.`,
      },
      { status: 413 },
    );
  }

  const validated = await safeValidateUIMessages({ messages: submitted });
  if (!validated.success) {
    return Response.json(
      { error: "invalid_messages", message: validated.error.message },
      { status: 400 },
    );
  }

  return answerStream(ai, SYSTEM_PROMPT, plainMessages(validated.data), req.signal);
}

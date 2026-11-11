/**
 * What the chat says when there is no model behind it.
 *
 * Demo mode exists so the screen can be tried before the app runs as a Worker:
 * the transcript, the streaming and the history all behave as they do with a
 * model, and only the words are canned. Each answer says so, quietly, so nobody
 * mistakes it for a model's.
 */

type DemoAnswer = { match: RegExp; reply: string };

const ANSWERS: DemoAnswer[] = [
  {
    match: /starter|what (is|does) this|about this app|faang/i,
    reply:
      "This is Faang: a React design system with a working chat, a dashboard, the component catalogue and the auth screens, all built from its own components and installed as source. Right now I'm in demo mode, so this answer is canned. Run the app as a Worker and the same chat talks to Cloudflare's Workers AI.",
  },
  {
    match: /product update|announcement|release notes|changelog/i,
    reply:
      "Here's a product update in three sentences. This release adds a dashboard with revenue and orders charts, an inbox, the component catalogue and sign-in screens, all built from the same components as the chat. Every page installs as source, so nothing is locked behind a package. It runs as a Cloudflare Worker, and the chat answers through Workers AI with no key to configure. (Demo mode: canned answer.)",
  },
  {
    match: /names?\b.*\b(app|product|scheduling|startup|company)|name ideas|suggest.*names/i,
    reply:
      "Five names for a scheduling app: Slotwise, Tidemark, Cadence, Dayline and Meridian. Slotwise says what it does, Cadence and Meridian carry a rhythm, Tidemark and Dayline feel like calendars without saying so. (Demo mode: canned answer. With the model running, I'd tailor these to your product.)",
  },
  {
    match: /key|api|openrouter|openai|anthropic|provider|model|worker|cloudflare/i,
    reply:
      "There is no key in this version. The chat calls Cloudflare's Workers AI through the Worker's own AI binding, declared in wrangler.jsonc — the binding is the credential. Locally, `npm run preview` builds the Worker and serves it with the binding; a plain `npm run dev` runs Next without that runtime, so the chat stays in demo mode there.",
  },
  {
    match: /hello|hi\b|hey|good (morning|afternoon|evening)/i,
    reply:
      "Hello. I'm the demo assistant, answering from a short script until the app runs with its model. Try asking what this project does, or how the model is connected.",
  },
];

const FALLBACK =
  "I'm in demo mode, so I can only answer from a short script, and that question isn't in it. Run the app as a Worker (`npm run preview`) and this same chat answers through Workers AI. Meanwhile, try: what does this project do, or how is the model connected.";

export function pickDemoAnswer(prompt: string): string {
  return ANSWERS.find((answer) => answer.match.test(prompt))?.reply ?? FALLBACK;
}

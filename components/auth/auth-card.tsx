"use client";

import { Button } from "@ui/components/Button";
import { CheckboxPill } from "@ui/components/Checkbox";
import { Chip } from "@ui/components/Chip";
import { Field, Input } from "@ui/components/Field";
import { useState, type FormEvent } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";

/**
 * The two auth screens share one card: a pixel-sky panel on the left, the form
 * on the right. It is a demonstration — submitting says so instead of faking a
 * session, and every control is the kit's own.
 */
export function AuthCard({ mode }: { mode: "login" | "signup" }) {
  const login = mode === "login";
  const [submitted, setSubmitted] = useState(false);
  const [remember, setRemember] = useState(true);
  const [terms, setTerms] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="tp-auth">
      <aside className="tp-auth__aside tp-auth__aside--brand">
        <a href="/" className="tp-brand" aria-label="Faang, início">
          <BrandLogo height={24} />
        </a>

        <div className="tp-auth__aside-copy">
          <h2>A interface que o seu agente merece.</h2>
          <p>
            Conversa, ferramentas e aprovações no mesmo lugar. Entre para ver o workspace de demonstração com a
            biblioteca inteira.
          </p>
        </div>
      </aside>

      <form className="tp-auth__form" onSubmit={submit}>
        <h1>{login ? "Entrar" : "Criar conta"}</h1>
        <p className="tp-auth__sub">
          {login ? "Bom te ver de novo." : "Uma conta, um workspace, todos os agentes."}
        </p>

        {submitted && (
          <Chip icon="check" tone="done">
            Demonstração: nada foi enviado.
          </Chip>
        )}

        {!login && (
          <Field label="Nome">
            <Input name="name" placeholder="Fernando" autoComplete="name" required />
          </Field>
        )}

        <Field label="E-mail">
          <Input name="email" type="email" placeholder="voce@exemplo.com" autoComplete="email" required />
        </Field>

        <Field label="Senha" example="pelo menos 8 caracteres">
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete={login ? "current-password" : "new-password"}
            minLength={8}
            required
          />
        </Field>

        {login ? (
          <div className="tp-auth__row">
            <CheckboxPill id="auth-remember" checked={remember} onCheckedChange={setRemember}>
              Lembrar de mim
            </CheckboxPill>
            <a href="#">Esqueci a senha</a>
          </div>
        ) : (
          <CheckboxPill id="auth-terms" checked={terms} onCheckedChange={setTerms}>
            Aceito os termos e a privacidade
          </CheckboxPill>
        )}

        <Button variant="primary" block type="submit">
          {login ? "Entrar" : "Criar conta"}
        </Button>

        <div className="tp-auth__divider">ou</div>

        <Button block icon="repo" type="button">
          Continuar com GitHub
        </Button>

        <p className="tp-auth__swap">
          {login ? "Ainda não tem conta? " : "Já tem conta? "}
          <a href={login ? "/signup" : "/login"}>{login ? "Criar uma" : "Entrar"}</a>
        </p>
      </form>
    </div>
  );
}

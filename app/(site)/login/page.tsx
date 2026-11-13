import { AuthCard } from "@/components/auth/auth-card";

export const metadata = {
  title: "Entrar — Faang",
  description: "Entre no workspace de demonstração do Faang.",
};

export default function LoginPage() {
  return (
    <div className="tp-shell">
      <AuthCard mode="login" />
    </div>
  );
}

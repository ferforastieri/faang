import { AuthCard } from "@/components/auth/auth-card";

export const metadata = {
  title: "Criar conta — Faang",
  description: "Crie uma conta no workspace de demonstração do Faang.",
};

export default function SignupPage() {
  return (
    <div className="tp-shell">
      <AuthCard mode="signup" />
    </div>
  );
}

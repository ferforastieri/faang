"use client";

import { useStarterBase } from "@/components/application/app-shell/app-shell";
import { AuthCard } from "@/components/application/auth/auth-card";
import { LogoLockup } from "@/components/foundations/brand/logo";

/** The starter's sign-in screen, reached from the sidebar and from Log out. */
export default function LoginPage() {
  const base = useStarterBase();
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background-full p-6">
      <AuthCard switchHref={`${base}/signup`} logo={<LogoLockup height={30} />} />
    </main>
  );
}

"use client";

import { useStarterBase } from "@/components/application/app-shell/app-shell";
import { AuthCard } from "@/components/application/auth/auth-card";
import { LogoLockup } from "@/components/foundations/brand/logo";

/** The starter's sign-in screen, reached from the sidebar and from Log out. */
export default function LoginPage() {
  const base = useStarterBase();
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-1 items-start justify-center px-4 pt-8 pb-16 sm:px-6">
      <AuthCard switchHref={`${base}/signup`} logo={<LogoLockup height={30} />} />
    </div>
  );
}

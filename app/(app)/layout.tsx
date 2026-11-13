import type { ReactNode } from "react";

/** The two app screens own the whole viewport: no site header, no footer. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

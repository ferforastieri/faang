import type { ReactNode } from "react";

import { DocsNav } from "@/components/docs/docs-nav";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tp-shell tp-doc">
      <DocsNav />
      <div className="tp-doc__body">{children}</div>
    </div>
  );
}

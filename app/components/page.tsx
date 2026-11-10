"use client";

import { RiLayoutGridLine } from "@remixicon/react";

import { AppShell, ComponentsCatalog } from "@/components/application/app-shell/app-shell";

/** The starter's catalogue page: faang.com/components, linking out. */
export default function ComponentsPage() {
  return (
    <AppShell
      title="Components and Blocks"
      icon={RiLayoutGridLine}
      columnClassName="max-w-[964px]"
    >
      <ComponentsCatalog />
    </AppShell>
  );
}

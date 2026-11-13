import { AppShell } from "@/components/app/app-shell";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { Button } from "@ui/components/Button";

export const metadata = {
  title: "Dashboard — Faang",
  description: "O dashboard de demonstração do Faang UI.",
};

export default function DashboardPage() {
  return (
    <AppShell
      active="dashboard"
      title="Dashboard"
      subtitle="Acme · novembro de 2026"
      actions={
        <Button size="sm" icon="download">
          Exportar
        </Button>
      }
    >
      <DashboardView />
    </AppShell>
  );
}

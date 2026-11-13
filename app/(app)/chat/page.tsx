import { AppShell } from "@/components/app/app-shell";
import { ChatView } from "@/components/chat/chat-view";
import { Button } from "@ui/components/Button";

export const metadata = {
  title: "#eng — Faang",
  description: "O chat de demonstração do Faang UI.",
};

export default function ChatPage() {
  return (
    <AppShell
      active="chat"
      title="#eng"
      subtitle="12 membros · 3 agentes"
      actions={
        <>
          <Button variant="ghost" size="sm" icon="search" iconOnly aria-label="Buscar" />
          <Button variant="primary" size="sm" icon="plus">
            Convidar
          </Button>
        </>
      }
    >
      <ChatView />
    </AppShell>
  );
}

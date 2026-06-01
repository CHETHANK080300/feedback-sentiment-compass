import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant · CXIP" },
      { name: "description", content: "Conversational analytics — ask questions, get charts, tables and drill-down links." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="AI Assistant"
      subtitle="Conversational analytics — ask questions, get charts, tables and drill-down links."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

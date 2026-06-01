import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration · CXIP" },
      { name: "description", content: "Manage applications, users, roles, survey templates, alert rules and AI models." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Administration"
      subtitle="Manage applications, users, roles, survey templates, alert rules and AI models."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

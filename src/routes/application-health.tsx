import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/application-health")({
  head: () => ({
    meta: [
      { title: "Application Health · CXIP" },
      { name: "description", content: "Per-app health scores, module heat maps and drill-down to feature-level feedback." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Application Health"
      subtitle="Per-app health scores, module heat maps and drill-down to feature-level feedback."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

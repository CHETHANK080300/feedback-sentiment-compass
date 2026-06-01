import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "AI Recommendations · CXIP" },
      { name: "description", content: "Prioritized, actionable recommendations generated from real customer signals." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="AI Recommendations"
      subtitle="Prioritized, actionable recommendations generated from real customer signals."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

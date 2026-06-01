import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/surveys")({
  head: () => ({
    meta: [
      { title: "Survey Analytics · CXIP" },
      { name: "description", content: "Completion funnels, question-level responses and NPS / CSAT breakdowns." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Survey Analytics"
      subtitle="Completion funnels, question-level responses and NPS / CSAT breakdowns."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

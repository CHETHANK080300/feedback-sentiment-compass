import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/sentiment")({
  head: () => ({
    meta: [
      { title: "Sentiment Analysis · CXIP" },
      { name: "description", content: "Trend by app, module, country and version with drill-down to comments." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Sentiment Analysis"
      subtitle="Trend by app, module, country and version with drill-down to comments."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

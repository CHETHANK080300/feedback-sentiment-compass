import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "Release Impact Analysis · CXIP" },
      { name: "description", content: "Before / after release deltas on rating, sentiment and complaints with risk score." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Release Impact Analysis"
      subtitle="Before / after release deltas on rating, sentiment and complaints with risk score."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

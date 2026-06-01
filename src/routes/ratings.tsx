import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/ratings")({
  head: () => ({
    meta: [
      { title: "Ratings & Reviews · CXIP" },
      { name: "description", content: "Play Store, App Store, web and in-app ratings with keyword word cloud." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Ratings & Reviews"
      subtitle="Play Store, App Store, web and in-app ratings with keyword word cloud."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

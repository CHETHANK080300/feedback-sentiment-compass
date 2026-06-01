import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social Media Monitoring · CXIP" },
      { name: "description", content: "Buzz score, mentions and AI classification across Facebook, X, Instagram, LinkedIn." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Social Media Monitoring"
      subtitle="Buzz score, mentions and AI classification across Facebook, X, Instagram, LinkedIn."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

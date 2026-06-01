import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/geographic")({
  head: () => ({
    meta: [
      { title: "Geographic Analytics · CXIP" },
      { name: "description", content: "Interactive world map of users, feedback, issues and sentiment by region." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Geographic Analytics"
      subtitle="Interactive world map of users, feedback, issues and sentiment by region."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

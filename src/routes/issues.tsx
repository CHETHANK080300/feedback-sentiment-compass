import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/issues")({
  head: () => ({
    meta: [
      { title: "Issue Intelligence · CXIP" },
      { name: "description", content: "AI-clustered issues with root cause analysis, affected users, versions and tickets." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Issue Intelligence"
      subtitle="AI-clustered issues with root cause analysis, affected users, versions and tickets."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

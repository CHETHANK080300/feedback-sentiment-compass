import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/customer-feedback")({
  head: () => ({
    meta: [
      { title: "Customer Feedback · CXIP" },
      { name: "description", content: "Unified inbox of feedback across channels with AI tagging and clustering." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Customer Feedback"
      subtitle="Unified inbox of feedback across channels with AI tagging and clustering."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

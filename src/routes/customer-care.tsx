import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/customer-care")({
  head: () => ({
    meta: [
      { title: "Customer Care Analytics · CXIP" },
      { name: "description", content: "Ticket volume, SLA, escalations and resolution intelligence." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Customer Care Analytics"
      subtitle="Ticket volume, SLA, escalations and resolution intelligence."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

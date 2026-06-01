import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports · CXIP" },
      { name: "description", content: "Executive, sentiment, release and SLA reports — export to PDF, Excel, PPT, CSV." },
    ],
  }),
  component: () => (
    <ComingSoon
      title="Reports"
      subtitle="Executive, sentiment, release and SLA reports — export to PDF, Excel, PPT, CSV."
      description="This module is wired into the navigation and design system. Ask Lovable to expand it with the specific widgets, charts and drill-downs you need."
    />
  ),
});

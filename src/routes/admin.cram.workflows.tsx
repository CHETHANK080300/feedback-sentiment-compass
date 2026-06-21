import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Workflow,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { mockWorkflows } from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/workflows")({
  component: WorkflowConfig,
});

function WorkflowConfig() {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <UserCheck className="h-5 w-5" />;
      case 1:
        return <ShieldCheck className="h-5 w-5" />;
      case 2:
        return <FileCheck className="h-5 w-5" />;
      default:
        return <Workflow className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout
      title="Workflow Configuration"
      subtitle="Define review and approval stages for risk assessments"
    >
      <div className="space-y-6">
        {mockWorkflows.map((wf) => (
          <Panel
            key={wf.id}
            title={wf.type}
            subtitle="Configured approval stages"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 py-8">
              {wf.stages.map((stage, idx) => (
                <div key={stage.id} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="h-16 w-48 rounded-xl border-2 border-primary bg-primary/5 p-4 flex items-center gap-3 relative transition-all group-hover:bg-primary/10">
                      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                        {getIcon(idx)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">
                          {stage.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold truncate">
                          {stage.role}
                        </p>
                      </div>
                      <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[10px] flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      SLA: {stage.slaDays} Days
                    </div>
                  </div>

                  {idx < wf.stages.length - 1 && (
                    <div className="hidden md:flex">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                className="h-16 w-48 border-dashed border-2 flex flex-col gap-1 rounded-xl"
              >
                <span className="text-xs font-bold text-primary">
                  + Add Stage
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Drag to insert
                </span>
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex justify-between">
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Last Modified
                  </p>
                  <p className="text-xs">Yesterday, 14:30</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Status
                  </p>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit Workflow
              </Button>
            </div>
          </Panel>
        ))}

        <Panel title="Workflow Types" subtitle="Manage other review triggers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
              <div>
                <p className="font-bold">Periodic Review</p>
                <p className="text-xs text-muted-foreground">
                  Annual customer KYC update
                </p>
              </div>
              <Badge
                variant="outline"
                className="group-hover:bg-primary group-hover:text-white transition-colors"
              >
                Configure
              </Badge>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
              <div>
                <p className="font-bold">Trigger Event Review</p>
                <p className="text-xs text-muted-foreground">
                  Rule based alert review
                </p>
              </div>
              <Badge
                variant="outline"
                className="group-hover:bg-primary group-hover:text-white transition-colors"
              >
                Configure
              </Badge>
            </div>
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}

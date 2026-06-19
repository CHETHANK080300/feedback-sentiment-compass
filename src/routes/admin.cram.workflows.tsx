import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Workflow,
  Plus,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Clock,
  AlertTriangle,
  History,
  Send,
  Settings2,
  Trash2,
  Edit
} from "lucide-react";
import { mockWorkflows } from "@/lib/cram-mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/cram/workflows")({
  component: WorkflowConfiguration,
});

function WorkflowConfiguration() {
  return (
    <DashboardLayout
      title="Workflow Configuration"
      subtitle="Manage maker-checker approval processes for policy and parameter changes"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Workflow className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Active Workflows</h3>
              <p className="text-xs text-muted-foreground">Governance active for 5 modules</p>
            </div>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Create Workflow
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {mockWorkflows.map((wf) => (
              <div key={wf.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono bg-background">{wf.id}</Badge>
                    <h4 className="font-bold text-sm">{wf.name}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-critical"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-6 overflow-x-auto pb-4">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted-foreground/30">
                        Maker
                      </div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Submitter</span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />

                    {wf.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-6 shrink-0">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${idx === 0 ? 'bg-warning/10 border-warning text-warning' : 'bg-primary/10 border-primary text-primary'}`}>
                            {idx === 0 ? <ShieldCheck className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
                          </div>
                          <span className="text-[10px] font-bold uppercase text-foreground">{step.role}</span>
                          <span className="text-[8px] text-muted-foreground">Step {step.level}</span>
                        </div>
                        {idx < wf.steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground/30" />}
                      </div>
                    ))}

                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />

                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="h-10 w-10 rounded-full bg-success/10 border-2 border-success text-success flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase text-success">Live</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-muted/10 border-t border-border flex flex-wrap gap-x-8 gap-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Escalation: </span>
                    <span className="text-xs font-bold">{wf.escalationTime}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Module: </span>
                    <Badge variant="secondary" className="text-[10px]">{wf.module}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${wf.status === 'Active' ? 'bg-success' : 'bg-muted'}`} />
                    <span className="text-xs font-bold">{wf.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" /> Governance Rules
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                  <h5 className="text-[10px] font-bold uppercase mb-1">Maker-Checker</h5>
                  <p className="text-xs text-muted-foreground">The person who initiates a change cannot be the one who approves it.</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                  <h5 className="text-[10px] font-bold uppercase mb-1">Escalation</h5>
                  <p className="text-xs text-muted-foreground">Pending requests older than specified time are escalated to supervisors.</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                  <h5 className="text-[10px] font-bold uppercase mb-1">Audit Trail</h5>
                  <p className="text-xs text-muted-foreground">Every step in the workflow is logged with user, IP, and timestamp.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 p-5 rounded-2xl border border-primary/20">
              <h3 className="font-bold text-sm mb-2 text-primary flex items-center gap-2">
                <History className="h-4 w-4" /> Global Policy
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All CRAM configuration changes must follow at least a 2-level approval workflow for Production environments.
              </p>
              <Button className="w-full mt-4" size="sm" variant="outline">View Global Policy</Button>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

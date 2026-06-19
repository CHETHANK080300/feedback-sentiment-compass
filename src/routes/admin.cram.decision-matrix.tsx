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
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Settings2,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  History,
  Send,
  Save,
  Info,
} from "lucide-react";
import { mockDecisionMatrix } from "@/lib/cram-mock-data";
import { useState } from "react";
import { DecisionType, RiskLevel } from "@/lib/cram-types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/admin/cram/decision-matrix")({
  component: DecisionMatrix,
});

const getDecisionIcon = (decision: DecisionType) => {
  switch (decision) {
    case "Approve":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "Review":
      return <ShieldAlert className="h-4 w-4 text-warning" />;
    case "Reject":
      return <XCircle className="h-4 w-4 text-critical" />;
    case "Escalate":
      return <ArrowUpRight className="h-4 w-4 text-primary" />;
  }
};

const getRiskLevelBadge = (level: RiskLevel) => {
  switch (level) {
    case "Low":
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          Low
        </Badge>
      );
    case "Medium":
      return (
        <Badge className="bg-warning/10 text-warning border-warning/20">
          Medium
        </Badge>
      );
    case "High":
      return (
        <Badge className="bg-critical/10 text-critical border-critical/20">
          High
        </Badge>
      );
    case "Very High":
      return (
        <Badge className="bg-critical/20 text-critical border-critical/30">
          Very High
        </Badge>
      );
    default:
      return <Badge>{level}</Badge>;
  }
};

function DecisionMatrix() {
  const [matrix, setMatrix] = useState(mockDecisionMatrix);

  const handleDecisionChange = (id: string, value: DecisionType) => {
    setMatrix(matrix.map((m) => (m.id === id ? { ...m, decision: value } : m)));
  };

  return (
    <DashboardLayout
      title="Decision Matrix"
      subtitle="Define automated onboarding outcomes based on customer risk ratings"
    >
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Risk Rating</TableHead>
                    <TableHead className="font-bold">
                      Primary Decision
                    </TableHead>
                    <TableHead className="font-bold">Advanced Rules</TableHead>
                    <TableHead className="text-right font-bold">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrix.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      <TableCell>{getRiskLevelBadge(row.rating)}</TableCell>
                      <TableCell>
                        <Select
                          value={row.decision}
                          onValueChange={(val) =>
                            handleDecisionChange(row.id, val as DecisionType)
                          }
                        >
                          <SelectTrigger className="w-40 bg-muted/30 border-none h-9">
                            <div className="flex items-center gap-2">
                              {getDecisionIcon(row.decision)}
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Approve">Approve</SelectItem>
                            <SelectItem value="Review">
                              Manual Review
                            </SelectItem>
                            <SelectItem value="Reject">Reject</SelectItem>
                            <SelectItem value="Escalate">Escalate</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Add conditional logic..."
                            className="h-8 text-xs bg-muted/20 border-none"
                            defaultValue={row.advancedRules}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                >
                                  <Info className="h-3 w-3 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  Define extra conditions (e.g. "If Customer =
                                  PEP, then Escalate")
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-xs"
                        >
                          <Settings2 className="h-3.5 w-3.5" /> Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 border-t border-border bg-muted/10 flex justify-between items-center">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Add Rule
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <History className="h-4 w-4" /> History
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => toast.success("Decision matrix updated")}
                  >
                    <Send className="h-4 w-4" /> Submit for Approval
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-2 text-primary">
                <Info className="h-4 w-4" /> Decision Logic Policy
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Decisions are automatically applied to new applications based on
                the final risk rating. Manual reviews must be completed by the
                Compliance Operations team within 48 hours. Rejections trigger
                an automated notice to the customer as per regulatory
                requirements.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4">Rule Priority</h3>
              <div className="space-y-3">
                {[
                  { label: "Specific Overrides", status: "Enabled" },
                  { label: "Advanced Conditions", status: "Enabled" },
                  { label: "Matrix Defaults", status: "Primary" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded bg-muted/30 border border-border/50"
                  >
                    <span className="text-xs font-medium">{item.label}</span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {item.status}
                    </Badge>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground italic mt-4">
                  Rules are processed in top-down order. First matching rule
                  determines the outcome.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Save className="h-4 w-4 text-primary" /> Effective Policy
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded bg-muted/20 border border-border/30">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                    Active Version
                  </div>
                  <div className="text-sm font-mono font-bold">v1.4.2</div>
                </div>
                <div className="p-3 rounded bg-muted/20 border border-border/30">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                    Last Update
                  </div>
                  <div className="text-xs">March 14, 2024</div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  Download Policy PDF
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

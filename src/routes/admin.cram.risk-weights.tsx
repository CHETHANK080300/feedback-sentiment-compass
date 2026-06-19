import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  AlertCircle,
  Save,
  History,
  Plus,
  Trash2,
  Send,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockRiskWeights } from "@/lib/cram-mock-data";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/cram/risk-weights")({
  component: RiskWeights,
});

function RiskWeights() {
  const [weights, setWeights] = useState(mockRiskWeights);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = weights.reduce((acc, curr) => acc + curr.weightPercentage, 0);
    setTotal(sum);
  }, [weights]);

  const handleWeightChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setWeights(weights.map(w => w.id === id ? { ...w, weightPercentage: numValue } : w));
  };

  const handleSave = () => {
    if (total !== 100) {
      toast.error("Invalid Total Weight", {
        description: "Total weight must equal exactly 100% before submitting.",
      });
      return;
    }
    toast.success("Weights submitted for approval", {
      description: "Changes have been logged and sent to the compliance head.",
    });
  };

  return (
    <DashboardLayout
      title="Risk Weights"
      subtitle="Define contribution percentage of each risk factor in final scoring"
    >
      <div className="space-y-6">
        {/* Validation Alert */}
        <Alert variant={total === 100 ? "default" : "destructive"} className={total === 100 ? "bg-success/10 border-success/20 text-success" : ""}>
          {total === 100 ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <AlertTitle className="font-bold">
            Current Total: {total}%
          </AlertTitle>
          <AlertDescription>
            {total === 100
              ? "Weight configuration is balanced and valid."
              : "The sum of all weights must equal exactly 100%."}
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Risk Factor</TableHead>
                    <TableHead className="font-bold w-40">Weight %</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold w-20">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weights.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell className="font-medium text-foreground">{w.factorName}</TableCell>
                      <TableCell>
                        <div className="relative">
                          <Input
                            type="number"
                            value={w.weightPercentage}
                            onChange={(e) => handleWeightChange(w.id, e.target.value)}
                            className="pr-8 font-mono font-bold"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs">%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-success text-white">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-critical">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold">Total Contribution</TableCell>
                    <TableCell>
                      <div className={`text-xl font-mono font-bold ${total === 100 ? "text-success" : "text-critical"}`}>
                        {total}%
                      </div>
                    </TableCell>
                    <TableCell colSpan={2}>
                      {total !== 100 && (
                        <div className="flex items-center gap-2 text-xs text-critical font-medium animate-pulse">
                          <AlertCircle className="h-3 w-3" /> Needs Adjustment
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="p-4 border-t border-border bg-muted/10 flex justify-between items-center">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Add Factor
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <History className="h-4 w-4" /> View History
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2"
                    disabled={total !== 100}
                    onClick={handleSave}
                  >
                    <Send className="h-4 w-4" /> Submit for Approval
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-dashed border-border">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="h-3 w-3" /> Validation Rules
              </h4>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2 italic">
                  • Total weight across all active risk factors must equal 100%.
                </li>
                <li className="flex items-start gap-2 italic">
                  • Individual weights cannot be negative or exceed 100%.
                </li>
                <li className="flex items-start gap-2 italic">
                  • Any change to weights triggers a new version and requires Compliance Head approval.
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-primary" /> Active Version
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-border pb-3">
                  <span className="text-muted-foreground">Version</span>
                  <Badge variant="outline" className="font-mono font-bold">v2.1</Badge>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border pb-3">
                  <span className="text-muted-foreground">Effective Date</span>
                  <span className="font-medium text-foreground">Jan 1, 2024</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border pb-3">
                  <span className="text-muted-foreground">Approved By</span>
                  <span className="font-medium text-foreground">Compliance Head</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Changed</span>
                  <span className="font-medium text-foreground">3 months ago</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Save className="h-5 w-5 text-primary" /> Save & Schedule
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">Effective From</label>
                  <Input type="date" className="bg-muted/50 border-none" />
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Scheduled changes will only take effect after final approval and on the specified effective date.
                </p>
                <Button className="w-full" variant="secondary" onClick={() => toast.info("Draft saved successfully")}>
                  Save Draft
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

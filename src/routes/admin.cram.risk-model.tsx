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
import { Plus, Edit2, Trash2 } from "lucide-react";
import { mockRiskFactors, mockCustomerParameters } from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/risk-model")({
  component: RiskModelConfig,
});

function RiskModelConfig() {
  return (
    <DashboardLayout
      title="Risk Model Configuration"
      subtitle="Configure AML risk factors and customer type parameters"
    >
      <div className="space-y-6">
        <Panel
          title="Risk Factors"
          subtitle="Define weightage for each primary risk category"
          action={
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Factor
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Factor</TableHead>
                <TableHead>Weightage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRiskFactors.map((factor) => (
                <TableRow key={factor.id}>
                  <TableCell className="font-medium">{factor.name}</TableCell>
                  <TableCell className="font-bold">
                    {factor.weightage}%
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        factor.status === "Active" ? "success" : "outline"
                      }
                    >
                      {factor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-critical"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <Panel
          title="Customer Type Parameters"
          subtitle="Manage risk scores for specific customer attributes"
          action={
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Parameter
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Override</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomerParameters.map((param) => (
                <TableRow key={param.id}>
                  <TableCell className="text-xs font-bold uppercase text-muted-foreground">
                    {param.parameterName}
                  </TableCell>
                  <TableCell className="font-medium">{param.value}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${param.riskScore > 3 ? "bg-critical" : param.riskScore > 1 ? "bg-warning" : "bg-success"}`}
                      />
                      <span className="font-bold">{param.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {param.override !== "No" ? (
                      <Badge variant="critical">{param.override}</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        None
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-critical"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
      </div>
    </DashboardLayout>
  );
}

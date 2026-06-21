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
import { Plus, ShieldAlert, Scale } from "lucide-react";
import { mockOverrideRules } from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/override-rules")({
  component: OverrideRulesConfig,
});

function OverrideRulesConfig() {
  return (
    <DashboardLayout
      title="Override Rules"
      subtitle="Manage business rules and mandatory risk overrides"
    >
      <Panel
        title="Business Rules"
        subtitle="Define conditional logic for automatic risk rating overrides"
        action={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Create Rule
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Risk Outcome</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOverrideRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-warning" />
                    {rule.name}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-2 py-1 rounded text-xs text-primary font-bold">
                    {rule.condition}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      rule.outcome === "Prohibited"
                        ? "bg-black text-white"
                        : "bg-critical text-white"
                    }
                  >
                    {rule.outcome}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {rule.reason}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={rule.status === "Active" ? "success" : "outline"}
                  >
                    {rule.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-critical">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </DashboardLayout>
  );
}

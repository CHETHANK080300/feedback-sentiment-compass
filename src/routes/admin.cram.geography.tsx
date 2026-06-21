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
import { Plus, Edit2, Globe } from "lucide-react";
import { mockGeographyRisk } from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/geography")({
  component: GeographyRiskConfig,
});

function GeographyRiskConfig() {
  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "Low":
        return <Badge className="bg-success text-white">Low</Badge>;
      case "Medium":
        return <Badge className="bg-warning text-white">Medium</Badge>;
      case "High":
        return <Badge className="bg-critical text-white">High</Badge>;
      default:
        return <Badge variant="outline">{rating}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Geography Risk Configuration"
      subtitle="Country Risk Master and Rating Management"
    >
      <Panel
        title="Country Risk Master"
        subtitle="Manage FATF, Basel Index, and Sanction status by country"
        action={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Country
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>FATF</TableHead>
              <TableHead>Basel Index</TableHead>
              <TableHead>Sanctions</TableHead>
              <TableHead>CPI</TableHead>
              <TableHead>Calculated</TableHead>
              <TableHead>Final Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockGeographyRisk.map((geo) => (
              <TableRow key={geo.id}>
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    {geo.country}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      geo.fatf === "Low"
                        ? "success"
                        : geo.fatf === "High"
                          ? "critical"
                          : "warning"
                    }
                  >
                    {geo.fatf}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">
                  {geo.baselIndex.toFixed(1)}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      geo.sanctions === "Yes"
                        ? "text-critical font-bold"
                        : "text-success"
                    }
                  >
                    {geo.sanctions}
                  </span>
                </TableCell>
                <TableCell className="font-mono">{geo.cpi}</TableCell>
                <TableCell>{getRatingBadge(geo.calculatedRating)}</TableCell>
                <TableCell>{getRatingBadge(geo.finalRating)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-primary"
                  >
                    <Edit2 className="h-3 w-3" /> Override
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </DashboardLayout>
  );
}

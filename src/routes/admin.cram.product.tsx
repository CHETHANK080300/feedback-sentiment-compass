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
import { Plus, Package } from "lucide-react";
import { mockProductRisk } from "@/lib/cram-mock-data";

export const Route = createFileRoute("/admin/cram/product")({
  component: ProductRiskConfig,
});

function ProductRiskConfig() {
  const getScoreBadge = (score: number) => {
    if (score >= 3)
      return <Badge className="bg-critical text-white">3 (High)</Badge>;
    if (score >= 2)
      return <Badge className="bg-warning text-white">2 (Medium)</Badge>;
    return <Badge className="bg-success text-white">1 (Low)</Badge>;
  };

  return (
    <DashboardLayout
      title="Product Risk Configuration"
      subtitle="Manage risk scoring for banking products and services"
    >
      <Panel
        title="Product Risk Master"
        subtitle="Define risk dimensions for each product category"
        action={
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Liquidity</TableHead>
              <TableHead>Cross Border</TableHead>
              <TableHead>Anonymity</TableHead>
              <TableHead>FATF Risk</TableHead>
              <TableHead>Final Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProductRisk.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    {prod.product}
                  </div>
                </TableCell>
                <TableCell>{getScoreBadge(prod.liquidity)}</TableCell>
                <TableCell>{getScoreBadge(prod.crossBorder)}</TableCell>
                <TableCell>{getScoreBadge(prod.anonymity)}</TableCell>
                <TableCell>{getScoreBadge(prod.fatfRisk)}</TableCell>
                <TableCell className="font-bold text-lg">
                  {prod.finalRisk.toFixed(1)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary font-bold"
                  >
                    Edit
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

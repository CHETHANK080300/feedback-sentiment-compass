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
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  History,
  Send,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockRiskRatings } from "@/lib/cram-mock-data";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { RiskRating } from "@/lib/cram-types";

export const Route = createFileRoute("/admin/cram/risk-ratings")({
  component: RiskRatings,
});

function RiskRatings() {
  const [ratings, setRatings] = useState<RiskRating[]>(mockRiskRatings);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    validateRanges();
  }, [ratings]);

  const validateRanges = () => {
    const newErrors: string[] = [];
    const sorted = [...ratings].sort((a, b) => a.minScore - b.minScore);

    // Check for gaps and overlaps
    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];

      // Check individual range validity
      if (current.minScore > current.maxScore) {
        newErrors.push(`${current.rating}: Min score (${current.minScore}) cannot be greater than max score (${current.maxScore}).`);
      }

      if (i > 0) {
        const prev = sorted[i - 1];
        if (current.minScore <= prev.maxScore) {
          newErrors.push(`Overlap detected between ${prev.rating} and ${current.rating}.`);
        } else if (current.minScore > prev.maxScore + 1) {
          newErrors.push(`Gap detected between ${prev.rating} and ${current.rating}.`);
        }
      }
    }

    // Check coverage
    if (sorted.length > 0) {
      if (sorted[0].minScore !== 0) {
        newErrors.push("Score range must start from 0.");
      }
      if (sorted[sorted.length - 1].maxScore !== 100) {
        newErrors.push("Score range must end at 100.");
      }
    }

    setErrors(newErrors);
  };

  const updateRange = (id: string, field: 'minScore' | 'maxScore', value: string) => {
    const numValue = parseInt(value) || 0;
    setRatings(ratings.map(r => r.id === id ? { ...r, [field]: numValue } : r));
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case "Low": return <Badge className="bg-success text-white">Low</Badge>;
      case "Medium": return <Badge className="bg-warning text-white">Medium</Badge>;
      case "High": return <Badge className="bg-critical/80 text-white">High</Badge>;
      case "Very High": return <Badge className="bg-critical text-white">Very High</Badge>;
      default: return <Badge>{level}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Risk Ratings"
      subtitle="Define score ranges that determine the overall customer risk rating"
    >
      <div className="space-y-6">
        {/* Validation Status */}
        {errors.length > 0 ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="font-bold">Invalid Rating Configuration</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                {errors.map((error, i) => (
                  <li key={i} className="text-xs">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-success/10 border-success/20 text-success">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertTitle className="font-bold">Configuration Valid</AlertTitle>
            <AlertDescription className="text-xs">
              Rating ranges are continuous, non-overlapping, and cover the full 0-100 spectrum.
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Min Score</TableHead>
                <TableHead className="font-bold">Max Score</TableHead>
                <TableHead className="font-bold">Rating Label</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratings.map((rating) => (
                <TableRow key={rating.id} className="hover:bg-muted/10 transition-colors">
                  <TableCell>
                    <Input
                      type="number"
                      value={rating.minScore}
                      onChange={(e) => updateRange(rating.id, 'minScore', e.target.value)}
                      className="w-24 font-mono font-bold"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={rating.maxScore}
                      onChange={(e) => updateRange(rating.id, 'maxScore', e.target.value)}
                      className="w-24 font-mono font-bold"
                    />
                  </TableCell>
                  <TableCell>{getRiskLevelBadge(rating.rating)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-critical">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-border bg-muted/10 flex justify-between items-center">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Rating Level
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <History className="h-4 w-4" /> Version History
              </Button>
              <Button
                size="sm"
                className="gap-2"
                disabled={errors.length > 0}
                onClick={() => toast.success("Ratings submitted for approval")}
              >
                <Send className="h-4 w-4" /> Submit Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted/30 p-5 rounded-xl border border-border border-dashed">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-3 w-3" /> Technical Validation
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs">No Overlapping Ranges</span>
                {errors.some(e => e.includes("Overlap")) ? <AlertTriangle className="h-3 w-3 text-critical" /> : <CheckCircle2 className="h-3 w-3 text-success" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Continuous (No Gaps)</span>
                {errors.some(e => e.includes("Gap")) ? <AlertTriangle className="h-3 w-3 text-critical" /> : <CheckCircle2 className="h-3 w-3 text-success" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Full 0-100 Coverage</span>
                {errors.some(e => e.includes("0") || e.includes("100")) ? <AlertTriangle className="h-3 w-3 text-critical" /> : <CheckCircle2 className="h-3 w-3 text-success" />}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Implementation Note</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Score ranges are inclusive. The system ensures that a score of 30.5 would be handled based on the integer range mapping. Continuous validation prevents misconfiguration that could lead to "Unrated" risk assessments.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

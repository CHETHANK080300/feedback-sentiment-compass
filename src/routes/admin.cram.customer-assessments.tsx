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
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  ChevronRight,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  ArrowLeft,
  Calendar,
  Globe,
  Briefcase,
  User,
  ExternalLink,
} from "lucide-react";
import { mockAssessments } from "@/lib/cram-mock-data";
import { useState } from "react";
import {
  CustomerRiskAssessment,
  RiskLevel,
  DecisionType,
} from "@/lib/cram-types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/cram/customer-assessments")({
  component: CustomerAssessments,
});

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

const getDecisionBadge = (decision: DecisionType) => {
  switch (decision) {
    case "Approve":
      return <Badge className="bg-success text-white">Approve</Badge>;
    case "Review":
      return <Badge className="bg-warning text-white">Review</Badge>;
    case "Reject":
      return <Badge className="bg-critical text-white">Reject</Badge>;
    case "Escalate":
      return <Badge className="bg-primary text-white">Escalate</Badge>;
  }
};

function CustomerAssessments() {
  const [selectedAssessment, setSelectedAssessment] =
    useState<CustomerRiskAssessment | null>(null);

  if (selectedAssessment) {
    return (
      <AssessmentDetail
        assessment={selectedAssessment}
        onBack={() => setSelectedAssessment(null)}
      />
    );
  }

  return (
    <DashboardLayout
      title="Customer Risk Assessments"
      subtitle="View and analyze automated risk assessment results"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, Name or CIF..."
              className="pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none gap-2"
            >
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none gap-2"
            >
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold">Rating</TableHead>
                <TableHead className="font-bold">Score</TableHead>
                <TableHead className="font-bold">Decision</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssessments.map((as) => (
                <TableRow
                  key={as.id}
                  className="hover:bg-muted/10 transition-colors group"
                >
                  <TableCell>
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2">
                        {as.customerName}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {as.customerId} • {as.customerType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskLevelBadge(as.rating)}</TableCell>
                  <TableCell>
                    <div className="font-mono font-bold text-lg">
                      {as.finalScore}
                    </div>
                  </TableCell>
                  <TableCell>{getDecisionBadge(as.decision)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(as.assessmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => setSelectedAssessment(as)}
                    >
                      <Eye className="h-4 w-4" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AssessmentDetail({
  assessment,
  onBack,
}: {
  assessment: CustomerRiskAssessment;
  onBack: () => void;
}) {
  const chartData = assessment.breakdown.map((b) => ({
    name: b.parameterName,
    value: b.weightedScore,
    score: b.score,
    weight: b.weight,
  }));

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <DashboardLayout
      title="Assessment Details"
      subtitle={`Comprehensive risk breakdown for ${assessment.customerName}`}
    >
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 -ml-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to List
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Summary Card */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm relative overflow-hidden">
            <div
              className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 ${
                assessment.rating === "Very High"
                  ? "bg-critical"
                  : assessment.rating === "High"
                    ? "bg-critical"
                    : assessment.rating === "Medium"
                      ? "bg-warning"
                      : "bg-success"
              }`}
            />

            <div className="relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold">
                    {assessment.finalScore}
                  </h3>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
                    Final Risk Score
                  </div>
                </div>
                <div className="text-right">
                  {getRiskLevelBadge(assessment.rating)}
                  <div className="mt-2">
                    {getDecisionBadge(assessment.decision)}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">
                      Assessment Date
                    </div>
                    <div className="text-sm font-medium">
                      {new Date(assessment.assessmentDate).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">
                      Status
                    </div>
                    <div className="text-sm font-medium">
                      {assessment.status}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-6 gap-2"
                variant="outline"
                onClick={() => toast.success("PDF Report Generated")}
              >
                <FileText className="h-4 w-4" /> Download PDF Report
              </Button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Customer Profile
            </h3>
            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">
                  Customer Name
                </div>
                <div className="font-medium text-foreground">
                  {assessment.customerName}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">
                  Customer ID / CIF
                </div>
                <div className="font-mono text-sm">{assessment.customerId}</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="h-3 w-3" /> Industry & Segment
                </div>
                <div className="text-sm font-medium">
                  {assessment.industry} · {assessment.segment}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
                  <Globe className="h-3 w-3" /> Geography
                </div>
                <div className="text-sm font-medium">
                  {assessment.geography}
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <div className="text-[10px] uppercase font-bold text-muted-foreground">
                  Customer Type
                </div>
                <Badge variant="outline">{assessment.customerType}</Badge>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border bg-muted/30">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" /> Score
                  Breakdown
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-bold">
                      Risk Parameter
                    </TableHead>
                    <TableHead className="text-xs font-bold text-center">
                      Base Score
                    </TableHead>
                    <TableHead className="text-xs font-bold text-center">
                      Weight
                    </TableHead>
                    <TableHead className="text-xs font-bold text-right">
                      Weighted Score
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessment.breakdown.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm">
                        {item.parameterName}
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {item.score}
                      </TableCell>
                      <TableCell className="text-center font-mono text-muted-foreground">
                        {item.weight}%
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-primary">
                        {item.weightedScore.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold" colSpan={3}>
                      Final Weighted Score
                    </TableCell>
                    <TableCell className="text-right font-bold text-lg">
                      {assessment.finalScore}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Visualizations */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-primary" /> Risk
                Contribution
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {chartData.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="text-muted-foreground truncate max-w-[120px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono font-bold">
                      {item.value.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

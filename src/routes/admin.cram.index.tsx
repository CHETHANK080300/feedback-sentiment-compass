import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Zap,
  Scale,
  Star,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  History,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/cram/")({
  component: CramDashboard,
});

const riskDistData = [
  { name: "Low", value: 1450, color: "#10B981" },
  { name: "Medium", value: 840, color: "#F59E0B" },
  { name: "High", value: 320, color: "#EF4444" },
  { name: "Very High", value: 95, color: "#991B1B" },
];

const activityData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 24 },
  { day: "Fri", count: 21 },
  { day: "Sat", count: 8 },
  { day: "Sun", count: 5 },
];

function CramDashboard() {
  return (
    <DashboardLayout
      title="CRAM Administration"
      subtitle="Operational dashboard for customer risk assessment engine"
    >
      <div className="grid gap-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Active Parameters",
              value: "24",
              icon: Zap,
              color: "text-primary",
              bg: "bg-primary/10",
              to: "/admin/cram/risk-parameters",
            },
            {
              label: "Pending Approvals",
              value: "03",
              icon: AlertTriangle,
              color: "text-warning",
              bg: "bg-warning/10",
              to: "/admin/cram/audit-logs",
            },
            {
              label: "Active Workflows",
              value: "05",
              icon: ShieldCheck,
              color: "text-success",
              bg: "bg-success/10",
              to: "/admin/cram/workflows",
            },
            {
              label: "Risk Assessments",
              value: "2,410",
              icon: History,
              color: "text-muted-foreground",
              bg: "bg-muted",
              to: "/admin/cram/customer-assessments",
            },
          ].map((stat, i) => (
            <Link
              key={i}
              to={stat.to}
              className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 ${stat.bg} rounded-xl ${stat.color} group-hover:bg-primary group-hover:text-white transition-colors`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[10px] font-bold">
                  LIVE
                </Badge>
              </div>
              <div className="text-2xl font-bold group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Panel title="Customer Risk Distribution">
              <div className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskDistData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "var(--color-muted-foreground)",
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "var(--color-muted-foreground)",
                      }}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.05)" }}
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {riskDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {riskDistData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {d.name}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="System Activity (Assessments/Day)">
              <div className="h-[250px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient
                        id="colorCount"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "var(--color-muted-foreground)",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorCount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <Panel title="Pending Actions">
              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Risk Weight Update",
                    desc: "v2.2 requires approval",
                    type: "Checker",
                    time: "2h ago",
                  },
                  {
                    title: "New Industry Parameter",
                    desc: "Added by Compliance Admin",
                    type: "Approver",
                    time: "5h ago",
                  },
                  {
                    title: "Decision Matrix Change",
                    desc: "v1.5 draft needs review",
                    type: "Maker",
                    time: "1d ago",
                  },
                ].map((action, i) => (
                  <div
                    key={i}
                    className="p-3 bg-muted/20 border border-border/50 rounded-xl hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xs font-bold">{action.title}</h4>
                      <Badge variant="secondary" className="text-[8px]">
                        {action.type}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {action.desc}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> {action.time}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[9px] font-bold uppercase tracking-widest text-primary"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Configuration Overview">
              <div className="space-y-3">
                <Link
                  to="/admin/cram/risk-parameters"
                  className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted/30 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Risk Parameters</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
                <Link
                  to="/admin/cram/risk-weights"
                  className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted/30 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Scale className="h-4 w-4 text-primary" />
                    <span>Risk Weights</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
                <Link
                  to="/admin/cram/risk-ratings"
                  className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted/30 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Risk Ratings</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
                <Link
                  to="/admin/cram/decision-matrix"
                  className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted/30 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="h-4 w-4 text-primary" />
                    <span>Decision Matrix</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
                <Link
                  to="/admin/cram/roles"
                  className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted/30 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Role Management</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </div>
            </Panel>

            <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-2xl border border-primary/20">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-primary">
                <ShieldCheck className="h-4 w-4" /> Compliance Guard
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                All changes are currently following the 2-level approval policy.
                Audit logs are being streamed to the Central Security Vault.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return <ArrowRight className={className} />;
}

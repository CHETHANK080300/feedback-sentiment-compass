import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Panel } from "@/components/dashboard/Panel";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  AlertTriangle,
  Globe,
  Filter,
  Download,
  Search,
  Bell,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/transaction-analyzer")({
  component: TransactionAnalyzer,
});

const trendData = [
  { name: "Mon", deposits: 450000, withdrawals: 380000 },
  { name: "Tue", deposits: 520000, withdrawals: 410000 },
  { name: "Wed", deposits: 480000, withdrawals: 450000 },
  { name: "Thu", deposits: 610000, withdrawals: 390000 },
  { name: "Fri", deposits: 580000, withdrawals: 520000 },
  { name: "Sat", deposits: 320000, withdrawals: 280000 },
  { name: "Sun", deposits: 290000, withdrawals: 210000 },
];

const channelData = [
  { name: "Mobile", value: 45, color: "var(--chart-1)" },
  { name: "Internet", value: 25, color: "var(--chart-2)" },
  { name: "ATM", value: 15, color: "var(--chart-3)" },
  { name: "POS", value: 10, color: "var(--chart-4)" },
  { name: "Branch", value: 5, color: "var(--chart-5)" },
];

const segmentData = [
  { name: "Retail", value: 60 },
  { name: "HNI", value: 20 },
  { name: "Corporate", value: 15 },
  { name: "Students", value: 5 },
];

const transactionHistory = [
  {
    id: "TXN10294",
    customer: "Alice Johnson",
    type: "International Transfer",
    amount: "$12,400.00",
    channel: "Internet Banking",
    status: "Flagged",
    date: "2024-05-15 10:24 AM",
  },
  {
    id: "TXN10295",
    customer: "Bob Smith",
    type: "ATM Withdrawal",
    amount: "$500.00",
    channel: "ATM",
    status: "Completed",
    date: "2024-05-15 11:05 AM",
  },
  {
    id: "TXN10296",
    customer: "Charlie Brown",
    type: "Bill Payment",
    amount: "$120.50",
    channel: "Mobile App",
    status: "Completed",
    date: "2024-05-15 11:45 AM",
  },
  {
    id: "TXN10297",
    customer: "David Wilson",
    type: "Deposit",
    amount: "$5,000.00",
    channel: "Branch",
    status: "Pending",
    date: "2024-05-15 12:15 PM",
  },
  {
    id: "TXN10298",
    customer: "Eve Davis",
    type: "Domestic Transfer",
    amount: "$2,100.00",
    channel: "UPI",
    status: "Completed",
    date: "2024-05-15 12:45 PM",
  },
];

function TransactionAnalyzer() {
  const [timeframe, setTimeframe] = useState("daily");

  return (
    <DashboardLayout
      title="Transaction Analyzer"
      subtitle="Interactive analysis of banking transaction patterns and behavioral trends"
    >
      {/* Filter Panel */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="md:col-span-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">
            Time Range
          </label>
          <Select defaultValue="daily" onValueChange={setTimeframe}>
            <SelectTrigger className="bg-muted/50 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">
            Txn Type
          </label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-muted/50 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposits">Deposits</SelectItem>
              <SelectItem value="withdrawals">Withdrawals</SelectItem>
              <SelectItem value="transfers">Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">
            Segment
          </label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-muted/50 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="hni">HNI</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">
            Channel
          </label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-muted/50 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="atm">ATM</SelectItem>
              <SelectItem value="internet">Internet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 flex items-end gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Txn ID, Customer..."
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Total Volume"
          value="1.24M"
          icon={RefreshCcw}
          tone="primary"
          delta={8}
        />
        <KpiCard
          label="Total Value"
          value="$4.82B"
          icon={CreditCard}
          tone="accent"
          delta={12}
        />
        <KpiCard
          label="Avg. Txn Value"
          value="$3,880"
          icon={ArrowUpRight}
          tone="success"
          delta={4}
        />
        <KpiCard
          label="Suspicious Flags"
          value="142"
          icon={AlertTriangle}
          tone="critical"
          delta={-2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Trend Chart */}
        <Panel
          title="Transaction Trends"
          subtitle="Volume of Deposits vs Withdrawals"
          className="lg:col-span-2"
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorDep" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorWit" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--critical)"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--critical)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="deposits"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorDep)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="withdrawals"
                  stroke="var(--critical)"
                  fillOpacity={1}
                  fill="url(#colorWit)"
                  strokeWidth={2}
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Channel Distribution */}
        <Panel title="Channel Classification" subtitle="Transactions by source">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {channelData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Segment */}
        <Panel
          title="Customer Segmentation"
          subtitle="Value distribution by profile"
        >
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="var(--accent)"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Alerts & Insights */}
        <Panel title="Alerts & Insights" subtitle="Automated pattern detection">
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-critical/30 bg-critical/5 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-critical shrink-0" />
              <div>
                <p className="text-sm font-bold">
                  International Spike detected
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  42% surge in international fund transfers to high-risk
                  corridors in the last 6 hours.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-warning/30 bg-warning/5 flex gap-3">
              <Zap className="h-5 w-5 text-warning shrink-0" />
              <div>
                <p className="text-sm font-bold">UPI Performance Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Average UPI processing time increased by 800ms due to bank
                  switch latency.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex gap-3">
              <Globe className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-bold">New Geographic Pattern</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Increased branch transactions in Rural regions following the
                  new harvest subsidy release.
                </p>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Raw Data Table */}
      <Panel
        title="Transaction Log"
        subtitle="Detailed breakdown of recent activities"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((txn) => (
              <TableRow
                key={txn.id}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                <TableCell className="font-bold">{txn.customer}</TableCell>
                <TableCell className="text-xs">{txn.type}</TableCell>
                <TableCell className="font-bold text-primary">
                  {txn.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold"
                  >
                    {txn.channel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      txn.status === "Flagged"
                        ? "critical"
                        : txn.status === "Pending"
                          ? "warning"
                          : "success"
                    }
                  >
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-[10px] text-muted-foreground">
                  {txn.date}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button variant="link" className="text-xs">
            View Full Transaction History →
          </Button>
        </div>
      </Panel>
    </DashboardLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Smile, Meh, Frown, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/sentiment")({
  head: () => ({
    meta: [
      { title: "Sentiment Analysis · CXIP" },
      {
        name: "description",
        content:
          "AI-driven sentiment tracking, trend analysis and regional mood mapping.",
      },
    ],
  }),
  component: SentimentAnalysis,
});

const sentimentTrend = [
  { d: "May 01", pos: 65, neu: 20, neg: 15 },
  { d: "May 05", pos: 68, neu: 18, neg: 14 },
  { d: "May 10", pos: 62, neu: 22, neg: 16 },
  { d: "May 15", pos: 45, neu: 25, neg: 30 }, // Dip due to release 5.2
  { d: "May 20", pos: 55, neu: 25, neg: 20 },
  { d: "May 25", pos: 60, neu: 22, neg: 18 },
];

const appSentiment = [
  { name: "Retail", pos: 58, neu: 22, neg: 20 },
  { name: "Corporate", pos: 85, neu: 10, neg: 5 },
  { name: "Wealth", pos: 75, neu: 15, neg: 10 },
];

const sentimentByCountry = [
  { country: "India", score: 72 },
  { country: "Malaysia", score: 45 },
  { country: "Singapore", score: 52 },
  { country: "UAE", score: 80 },
];

const chartTooltipStyle = {
  contentStyle: {
    background: "oklch(0.22 0.028 250)",
    border: "1px solid oklch(0.3 0.03 255)",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "oklch(0.97 0.005 250)" },
};

function SentimentAnalysis() {
  return (
    <DashboardLayout
      title="Sentiment Analysis"
      subtitle="AI-powered mood tracking across applications, channels and regions"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <SentimentCard
          label="Positive"
          value="62%"
          icon={Smile}
          color="text-success"
          delta="+4%"
          trend="up"
        />
        <SentimentCard
          label="Neutral"
          value="22%"
          icon={Meh}
          color="text-info"
          delta="-1%"
          trend="down"
        />
        <SentimentCard
          label="Negative"
          value="16%"
          icon={Frown}
          color="text-critical"
          delta="-3%"
          trend="down"
        />
      </div>

      <Panel
        title="Sentiment Trend"
        subtitle="Daily distribution of customer sentiment (7-day rolling)"
        className="mb-6"
      >
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={sentimentTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.3 0.03 255 / 0.4)"
            />
            <XAxis dataKey="d" stroke="oklch(0.68 0.025 250)" fontSize={11} />
            <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
            <Tooltip {...chartTooltipStyle} />
            <Area
              type="monotone"
              dataKey="pos"
              stackId="1"
              stroke="oklch(0.72 0.18 155)"
              fill="oklch(0.72 0.18 155)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="neu"
              stackId="1"
              stroke="oklch(0.7 0.17 230)"
              fill="oklch(0.7 0.17 230)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="neg"
              stackId="1"
              stroke="oklch(0.65 0.25 18)"
              fill="oklch(0.65 0.25 18)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Sentiment by Application"
          subtitle="Comparison of user satisfaction across products"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appSentiment}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.3 0.03 255 / 0.4)"
              />
              <XAxis
                dataKey="name"
                stroke="oklch(0.68 0.025 250)"
                fontSize={11}
              />
              <YAxis stroke="oklch(0.68 0.025 250)" fontSize={11} />
              <Tooltip {...chartTooltipStyle} />
              <Bar
                dataKey="pos"
                fill="oklch(0.72 0.18 155)"
                radius={[4, 4, 0, 0]}
                name="Positive"
              />
              <Bar
                dataKey="neu"
                fill="oklch(0.7 0.17 230)"
                radius={[4, 4, 0, 0]}
                name="Neutral"
              />
              <Bar
                dataKey="neg"
                fill="oklch(0.65 0.25 18)"
                radius={[4, 4, 0, 0]}
                name="Negative"
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Regional Sentiment Score"
          subtitle="Weighted sentiment score by geography"
        >
          <div className="space-y-6">
            {sentimentByCountry.map((c) => (
              <div key={c.country}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{c.country}</span>
                  <span
                    className={`text-sm font-bold ${c.score < 50 ? "text-critical" : c.score < 75 ? "text-warning" : "text-success"}`}
                  >
                    {c.score} / 100
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      c.score < 50
                        ? "bg-critical"
                        : c.score < 75
                          ? "bg-warning"
                          : "bg-success"
                    }`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}

interface SentimentCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  delta: string;
  trend: "up" | "down";
}

function SentimentCard({
  label,
  value,
  icon: Icon,
  color,
  delta,
  trend,
}: SentimentCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-muted/50 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold text-muted-foreground">
          {label}
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          <div
            className={`text-xs flex items-center gap-0.5 ${trend === "up" ? "text-success" : "text-critical"}`}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {delta}
          </div>
        </div>
      </div>
    </div>
  );
}

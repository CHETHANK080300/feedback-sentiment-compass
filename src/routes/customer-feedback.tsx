import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  MessageSquare,
  Filter,
  Search,
  Tag,
  MoreHorizontal,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

export const Route = createFileRoute("/customer-feedback")({
  head: () => ({
    meta: [
      { title: "Customer Feedback · CXIP" },
      {
        name: "description",
        content:
          "Unified inbox of feedback across channels with AI tagging and clustering.",
      },
    ],
  }),
  component: CustomerFeedback,
});

const feedbackItems = [
  {
    id: 1,
    user: "Ahmad Z.",
    content: "The new biometric login is super fast! Loving the update.",
    sentiment: "positive",
    channel: "Mobile App",
    tags: ["Authentication", "UI/UX"],
    time: "10m ago",
  },
  {
    id: 2,
    user: "Chen W.",
    content:
      "Unable to add beneficiary for international transfer. Getting a generic error code.",
    sentiment: "negative",
    channel: "Web App",
    tags: ["Transfers", "Bug"],
    time: "25m ago",
  },
  {
    id: 3,
    user: "Sarah L.",
    content:
      "When will the dark mode be available on the corporate banking portal?",
    sentiment: "neutral",
    channel: "Email",
    tags: ["Feature Request", "UI/UX"],
    time: "1h ago",
  },
  {
    id: 4,
    user: "Rajesh K.",
    content:
      "UPI payment timed out but money was debited from my account. This is urgent!",
    sentiment: "negative",
    channel: "Play Store",
    tags: ["Payments", "Urgent"],
    time: "2h ago",
  },
];

const sentimentIcons = {
  positive: <Smile className="h-4 w-4 text-success" />,
  neutral: <Meh className="h-4 w-4 text-info" />,
  negative: <Frown className="h-4 w-4 text-critical" />,
};

function CustomerFeedback() {
  return (
    <DashboardLayout
      title="Customer Feedback"
      subtitle="Unified feedback stream with AI-powered sentiment analysis and tagging"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <Panel title="Quick Filters">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Sentiment
                </label>
                <div className="mt-2 space-y-2">
                  {["Positive", "Neutral", "Negative"].map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Channel
                </label>
                <div className="mt-2 space-y-2">
                  {[
                    "Mobile App",
                    "Web App",
                    "Play Store",
                    "Email",
                    "Social",
                  ].map((c) => (
                    <label
                      key={c}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-border"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Popular Tags">
            <div className="flex flex-wrap gap-2">
              {[
                "Login",
                "Payment",
                "UI/UX",
                "Bug",
                "OTP",
                "Slow",
                "Feature Request",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted/50 rounded-md text-[10px] font-medium hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Panel>
        </aside>

        {/* Feedback List */}
        <div className="flex-1 space-y-4">
          <header className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border p-3 rounded-xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search feedback content..."
                className="w-full bg-transparent border-none outline-none pl-9 text-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-muted/70 transition-colors">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
          </header>

          <div className="space-y-3">
            {feedbackItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-xs">
                      {item.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.user}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {item.channel} · {item.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {
                      sentimentIcons[
                        item.sentiment as keyof typeof sentimentIcons
                      ]
                    }
                    <button className="p-1 hover:bg-muted rounded text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4">"{item.content}"</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                  <div className="flex-1" />
                  <button className="text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Thread
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

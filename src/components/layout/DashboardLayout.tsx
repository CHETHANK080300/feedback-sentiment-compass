import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Activity, MessageSquare, ClipboardList, Star,
  Share2, Headphones, Rocket, AlertTriangle, SmilePlus, Sparkles,
  Globe2, FileBarChart, Bot, Settings, Search, Bell, ChevronDown,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Executive Overview", icon: LayoutDashboard },
  { to: "/application-health", label: "Application Health", icon: Activity },
  { to: "/customer-feedback", label: "Customer Feedback", icon: MessageSquare },
  { to: "/surveys", label: "Survey Analytics", icon: ClipboardList },
  { to: "/ratings", label: "Ratings & Reviews", icon: Star },
  { to: "/social", label: "Social Monitoring", icon: Share2 },
  { to: "/customer-care", label: "Customer Care", icon: Headphones },
  { to: "/releases", label: "Release Impact", icon: Rocket },
  { to: "/issues", label: "Issue Intelligence", icon: AlertTriangle },
  { to: "/sentiment", label: "Sentiment Analysis", icon: SmilePlus },
  { to: "/recommendations", label: "AI Recommendations", icon: Sparkles },
  { to: "/geographic", label: "Geographic", icon: Globe2 },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/admin", label: "Administration", icon: Settings },
] as const;

export function DashboardLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold tracking-tight">CXIP</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Intelligence</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</div>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm before:absolute before:left-0 before:h-5 before:w-0.5 before:bg-primary relative"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-accent text-xs font-semibold">AS</div>
            <div className="flex-1 leading-tight">
              <div className="text-xs font-medium">Aarav Singh</div>
              <div className="text-[10px] text-muted-foreground">Product Director</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-xl">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search feedback, issues, applications…"
                className="w-full rounded-lg border border-input bg-muted/40 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlobalFilters />
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical animate-pulse" />
            </button>
          </div>
        </header>

        <main className="px-6 py-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Live · refreshed 12s ago
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function GlobalFilters() {
  const chips = [
    { label: "Last 7 Days" },
    { label: "All Apps" },
    { label: "Global" },
  ];
  return (
    <div className="hidden md:flex items-center gap-1.5">
      {chips.map((c) => (
        <button key={c.label} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/50">
          {c.label}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Bot,
  Send,
  Sparkles,
  User,
  BarChart2,
  Table,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant · CXIP" },
      {
        name: "description",
        content:
          "Conversational analytics assistant to query, visualize and explore customer intelligence data.",
      },
    ],
  }),
  component: AIAssistant,
});

const exampleQueries = [
  "Show top complaints this week",
  "Which application has lowest rating?",
  "Show all login issues from Malaysia",
  "Compare sentiment between versions 5.1 and 5.2",
];

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your CXIP Intelligence Assistant. How can I help you explore customer data today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Mock response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Based on the latest data from the last 7 days, the 'Login Failure' cluster has seen a 72% increase in Malaysia and Singapore. This correlates with the release of version 5.2. Would you like to see a detailed version comparison?",
          hasChart: true,
        },
      ]);
    }, 1000);
  };

  return (
    <DashboardLayout
      title="AI Intelligence Assistant"
      subtitle="Conversational interface to query and visualize customer experience data"
    >
      <div className="flex flex-col h-[calc(100vh-280px)] max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center ${
                  msg.role === "assistant"
                    ? "bg-gradient-primary shadow-glow"
                    : "bg-muted border border-border"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className={`max-w-[80%] space-y-4`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-muted/40 border border-border/50"
                      : "bg-primary text-primary-foreground font-medium"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.hasChart && (
                  <div className="p-4 bg-muted/20 border border-dashed border-border rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <BarChart2 className="h-4 w-4" /> Version Comparison
                      </div>
                      <button className="text-[10px] font-bold text-primary flex items-center gap-1">
                        Full Dashboard <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="h-32 flex items-end gap-2 px-4">
                      <div className="flex-1 bg-primary/20 h-[40%] rounded-t-md relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">
                          v5.1
                        </div>
                      </div>
                      <div className="flex-1 bg-primary h-[90%] rounded-t-md relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">
                          v5.2
                        </div>
                      </div>
                      <div className="flex-1 bg-primary/40 h-[65%] rounded-t-md relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">
                          v5.2.1
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-4">
            {exampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-3 py-1.5 bg-card border border-border rounded-full text-xs hover:border-primary/50 hover:bg-muted/50 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question about your customer experience data..."
              className="w-full bg-card border border-border rounded-xl py-4 pl-6 pr-14 text-sm focus:border-primary outline-none shadow-sm"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-glow hover:opacity-90"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" /> GPT-4o Powered
            </span>
            <span className="flex items-center gap-1.5">
              <Table className="h-3 w-3 text-primary" /> Real-time Data Access
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

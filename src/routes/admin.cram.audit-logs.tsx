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
  Calendar,
  User,
  Activity,
  Code,
  ArrowRight,
  Database,
  Shield,
  Clock,
} from "lucide-react";
import { mockAuditLogs } from "@/lib/cram-mock-data";
import { AuditLog } from "@/lib/cram-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const Route = createFileRoute("/admin/cram/audit-logs")({
  component: AuditLogs,
});

function AuditLogs() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const getActionBadge = (action: string) => {
    if (action.includes("UPDATE"))
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Update
        </Badge>
      );
    if (action.includes("CREATE"))
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          Create
        </Badge>
      );
    if (action.includes("DELETE"))
      return (
        <Badge className="bg-critical/10 text-critical border-critical/20">
          Delete
        </Badge>
      );
    return <Badge variant="outline">{action}</Badge>;
  };

  return (
    <DashboardLayout
      title="Compliance Audit Logs"
      subtitle="Track every administrative change and system activity for regulatory compliance"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="md:col-span-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <Input type="date" className="bg-muted/50 border-none" />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Audit Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Timestamp</TableHead>
                <TableHead className="font-bold">User</TableHead>
                <TableHead className="font-bold">Action</TableHead>
                <TableHead className="font-bold">Module</TableHead>
                <TableHead className="font-bold">IP Address</TableHead>
                <TableHead className="text-right font-bold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <TableCell className="text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {log.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium">
                        {log.userName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {log.module}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      onOpenChange={(open) => open && setSelectedLog(log)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 gap-2">
                          <Code className="h-3.5 w-3.5" /> View JSON
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Audit Log Details</DialogTitle>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div className="p-3 bg-muted/30 rounded-lg">
                                <div className="font-bold text-muted-foreground mb-1 uppercase tracking-widest text-[9px]">
                                  Event ID
                                </div>
                                <div className="font-mono">
                                  {selectedLog.id}
                                </div>
                              </div>
                              <div className="p-3 bg-muted/30 rounded-lg">
                                <div className="font-bold text-muted-foreground mb-1 uppercase tracking-widest text-[9px]">
                                  Session ID
                                </div>
                                <div className="font-mono">
                                  {selectedLog.sessionId}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                                <Database className="h-3 w-3" /> Change
                                Comparison
                              </div>
                              <div className="grid grid-cols-2 gap-4 h-64">
                                <div className="bg-muted/50 p-4 rounded-lg overflow-auto">
                                  <div className="text-[9px] font-bold text-critical/70 mb-2 uppercase tracking-widest">
                                    Old Value
                                  </div>
                                  <pre className="text-[10px] font-mono leading-relaxed">
                                    {JSON.stringify(
                                      selectedLog.oldValue,
                                      null,
                                      2,
                                    )}
                                  </pre>
                                </div>
                                <div className="bg-success/5 p-4 rounded-lg overflow-auto">
                                  <div className="text-[9px] font-bold text-success/70 mb-2 uppercase tracking-widest">
                                    New Value
                                  </div>
                                  <pre className="text-[10px] font-mono leading-relaxed">
                                    {JSON.stringify(
                                      selectedLog.newValue,
                                      null,
                                      2,
                                    )}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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

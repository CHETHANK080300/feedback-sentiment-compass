import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Shield,
  Check,
  X,
  ShieldAlert,
  UserPlus,
  Copy,
  Edit,
  Trash2,
  Lock,
  Eye,
  Settings,
} from "lucide-react";
import { mockRoles } from "@/lib/cram-mock-data";
import { PermissionLevel } from "@/lib/cram-types";

export const Route = createFileRoute("/admin/cram/roles")({
  component: RoleManagement,
});

const getPermissionIcon = (level: PermissionLevel) => {
  switch (level) {
    case "Admin":
      return <Badge className="bg-primary text-white text-[10px]">ADMIN</Badge>;
    case "Write":
      return (
        <Badge className="bg-success/10 text-success border-success/20 text-[10px]">
          WRITE
        </Badge>
      );
    case "Read":
      return (
        <Badge variant="outline" className="text-[10px]">
          READ
        </Badge>
      );
    case "None":
      return <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />;
  }
};

const modules = [
  "Risk Parameters",
  "Risk Weights",
  "Risk Ratings",
  "Decision Matrix",
  "Assessments",
  "Audit Logs",
  "Workflows",
];

function RoleManagement() {
  return (
    <DashboardLayout
      title="User & Role Management"
      subtitle="Define granular RBAC permissions for compliance teams and auditors"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Enterprise RBAC Policy</h3>
              <p className="text-xs text-muted-foreground">
                Active configuration with 3 system roles
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" /> Add User
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Create Role
            </Button>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> Permission Matrix
            </h3>
            <Button variant="ghost" size="sm" className="text-xs gap-2">
              <Settings className="h-3.5 w-3.5" /> Configure Modules
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] font-bold text-xs">
                  Module / Feature
                </TableHead>
                {mockRoles.map((role) => (
                  <TableHead key={role.id} className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-foreground">
                        {role.name}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-primary/10 hover:text-primary"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-muted"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((mod) => (
                <TableRow
                  key={mod}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <TableCell className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {mod}
                  </TableCell>
                  {mockRoles.map((role) => (
                    <TableCell key={role.id} className="text-center">
                      {getPermissionIcon(role.permissions[mod] || "None")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mockRoles.map((role) => (
            <div
              key={role.id}
              className="bg-card p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {role.name}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {role.description}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  12 Users assigned
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

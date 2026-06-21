import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { mockRoles, mockUsers } from "@/lib/cram-mock-data";
import { PermissionLevel } from "@/lib/cram-types";

export const Route = createFileRoute("/admin/cram/roles")({
  component: UserRolesConfig,
});

function UserRolesConfig() {
  const allPermissions: PermissionLevel[] = [
    "View",
    "Create",
    "Edit",
    "Approve",
    "Delete",
  ];

  return (
    <DashboardLayout
      title="User & Role Management"
      subtitle="Configure access control and user assignments"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Role Permissions" subtitle="Define what each role can do">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                {allPermissions.map((p) => (
                  <TableHead
                    key={p}
                    className="text-center text-[10px] uppercase font-bold px-1"
                  >
                    {p}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-bold text-sm">
                    {role.name}
                  </TableCell>
                  {allPermissions.map((p) => (
                    <TableCell key={p} className="text-center">
                      {role.permissions.includes(p) ? (
                        <div className="flex justify-center">
                          <ShieldCheck className="h-4 w-4 text-success" />
                        </div>
                      ) : (
                        <div className="flex justify-center opacity-20">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <Panel title="Active Users" subtitle="Enterprise team members">
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px]">
                  ACTIVE
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Manage All Users
            </Button>
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}

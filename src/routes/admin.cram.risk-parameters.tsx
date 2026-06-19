import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Ban,
  Send,
  X,
  Save,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRiskParameters } from "@/lib/cram-mock-data";
import { RiskLevel, Status, RiskParameter } from "@/lib/cram-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const parameterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  riskLevel: z.enum(["Low", "Medium", "High", "Very High"]),
  score: z.coerce.number().min(0).max(100),
  status: z.enum(["Active", "Inactive", "Draft"]),
  effectiveDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

export const Route = createFileRoute("/admin/cram/risk-parameters")({
  component: RiskParameters,
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

const getStatusBadge = (status: Status) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-success text-white">Active</Badge>;
    case "Inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "Pending Approval":
      return <Badge className="bg-warning text-white">Pending Approval</Badge>;
    case "Draft":
      return <Badge variant="outline">Draft</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

function RiskParameters() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedParam, setSelectedParam] = useState<RiskParameter | null>(
    null,
  );
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const form = useForm<z.infer<typeof parameterSchema>>({
    resolver: zodResolver(parameterSchema),
    defaultValues: {
      name: "",
      description: "",
      riskLevel: "Low",
      score: 0,
      status: "Active",
    },
  });

  function onSubmit(values: z.infer<typeof parameterSchema>) {
    toast.success("Risk Parameter submitted successfully", {
      description: "It has been sent for approval as per Maker-Checker policy.",
    });
    setIsAddOpen(false);
    form.reset();
  }

  return (
    <DashboardLayout
      title="Risk Parameters"
      subtitle="Configure all risk parameters used in customer risk scoring"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search parameters..."
              className="pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none gap-2"
            >
              <Filter className="h-4 w-4" /> Filter
            </Button>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex-1 sm:flex-none gap-2">
                  <Plus className="h-4 w-4" /> Add Parameter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Risk Parameter</DialogTitle>
                  <DialogDescription>
                    Configure a new risk factor for customer assessment. All
                    changes require approval.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 py-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parameter Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Geographic Risk - Middle East"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed explanation of this risk parameter..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="riskLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Very High">
                                  Very High
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="score"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Score (0-100) *</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Higher score means higher risk.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="effectiveDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Effective Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="Draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter className="pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => toast.info("Draft saved")}
                      >
                        <Save className="mr-2 h-4 w-4" /> Save Draft
                      </Button>
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" /> Submit for Approval
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Parameter Name</TableHead>
                <TableHead className="font-bold">Risk Level</TableHead>
                <TableHead className="font-bold">Score</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Version</TableHead>
                <TableHead className="font-bold">Last Modified</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRiskParameters.map((param) => (
                <TableRow
                  key={param.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div>
                      <div className="text-foreground">{param.name}</div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">
                        {param.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskLevelBadge(param.riskLevel)}</TableCell>
                  <TableCell>
                    <span className="font-mono font-bold text-primary">
                      {param.score}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(param.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      v{param.version}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(param.lastModified).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => {
                            setSelectedParam(param);
                            setViewDetailsOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" /> Edit Parameter
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-warning">
                          <Send className="h-4 w-4" /> Submit for Approval
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Ban className="h-4 w-4" /> Disable
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-critical">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Details Dialog */}
        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-xl">
                    {selectedParam?.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    Parameter ID: {selectedParam?.id}
                  </DialogDescription>
                </div>
                <div className="flex gap-2">
                  {selectedParam && getStatusBadge(selectedParam.status)}
                  <Badge variant="outline" className="font-mono">
                    v{selectedParam?.version}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Version History</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-6 bg-muted/30 p-4 rounded-lg">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Risk Level
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedParam &&
                        getRiskLevelBadge(selectedParam.riskLevel)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Risk Score
                    </div>
                    <div className="text-2xl font-mono font-bold text-primary">
                      {selectedParam?.score}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Description
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedParam?.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-3">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Metadata
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Created By:
                        </span>
                        <span className="font-medium">
                          {selectedParam?.createdBy}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Created Date:
                        </span>
                        <span className="font-medium">
                          {selectedParam &&
                            new Date(
                              selectedParam.createdDate,
                            ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-3">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                      Last Update
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Updated By:
                        </span>
                        <span className="font-medium">
                          {selectedParam?.updatedBy}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Updated Date:
                        </span>
                        <span className="font-medium">
                          {selectedParam &&
                            new Date(
                              selectedParam.updatedDate,
                            ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <div className="space-y-4">
                  {[
                    {
                      v: 3,
                      user: "ComplianceHead",
                      date: "2024-02-01",
                      action: "Increased score from 85 to 95",
                    },
                    {
                      v: 2,
                      user: "RiskManager",
                      date: "2023-08-15",
                      action: "Updated description for clarity",
                    },
                    {
                      v: 1,
                      user: "ComplianceAdmin",
                      date: "2023-01-15",
                      action: "Initial Creation",
                    },
                  ].map((hist, i) => (
                    <div
                      key={i}
                      className="flex gap-4 border-l-2 border-muted pl-4 py-2 relative"
                    >
                      <div className="absolute -left-[9px] top-3 h-4 w-4 rounded-full bg-muted border-4 border-background" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold">
                            Version {hist.v}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {hist.date}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">
                          by{" "}
                          <span className="text-foreground font-medium">
                            {hist.user}
                          </span>
                        </div>
                        <p className="text-xs text-foreground">{hist.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="approvals" className="mt-4">
                <div className="rounded-lg border border-border p-4 text-center">
                  <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2 opacity-50" />
                  <h4 className="font-bold text-sm">Approved</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    This version was approved by Compliance Head on Feb 1, 2024.
                  </p>

                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-success" />{" "}
                        Maker
                      </div>
                      <span className="font-medium">Compliance Admin</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-success" />{" "}
                        Checker
                      </div>
                      <span className="font-medium">Compliance Manager</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-success" />{" "}
                        Approver
                      </div>
                      <span className="font-medium">Compliance Head</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6 border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={() => setViewDetailsOpen(false)}
              >
                Close
              </Button>
              <Button>Edit Version</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between px-2">
          <div className="text-xs text-muted-foreground">
            Showing <b>1</b> to <b>{mockRiskParameters.length}</b> of{" "}
            <b>{mockRiskParameters.length}</b> parameters
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary/10 border-primary/20 text-primary"
            >
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

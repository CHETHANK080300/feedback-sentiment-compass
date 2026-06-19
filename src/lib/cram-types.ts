export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Very High';
export type Status = 'Active' | 'Inactive' | 'Pending Approval' | 'Draft';

export interface RiskParameter {
  id: string;
  name: string;
  description: string;
  riskLevel: RiskLevel;
  score: number;
  status: Status;
  version: number;
  lastModified: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  effectiveDate?: string;
  expiryDate?: string;
}

export interface RiskWeight {
  id: string;
  factorName: string;
  weightPercentage: number;
  status: Status;
  version: number;
  lastModified: string;
}

export interface RiskRating {
  id: string;
  minScore: number;
  maxScore: number;
  rating: RiskLevel;
}

export type DecisionType = 'Approve' | 'Review' | 'Reject' | 'Escalate';

export interface DecisionMatrixEntry {
  id: string;
  rating: RiskLevel;
  decision: DecisionType;
  advancedRules?: string;
}

export interface RiskBreakdownItem {
  parameterName: string;
  score: number;
  weight: number;
  weightedScore: number;
}

export interface CustomerRiskAssessment {
  id: string;
  customerId: string;
  customerName: string;
  customerType: 'Individual' | 'Corporate';
  segment: string;
  industry: string;
  geography: string;
  finalScore: number;
  rating: RiskLevel;
  decision: DecisionType;
  assessmentDate: string;
  status: 'Completed' | 'Pending';
  breakdown: RiskBreakdownItem[];
  history: {
    date: string;
    score: number;
    rating: RiskLevel;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  oldValue: any;
  newValue: any;
  ipAddress: string;
  sessionId: string;
}

export type PermissionLevel = 'None' | 'Read' | 'Write' | 'Admin';

export interface Role {
  id: string;
  name: string;
  description: string;
  status: Status;
  permissions: Record<string, PermissionLevel>;
}

export interface WorkflowStep {
  level: number;
  role: string;
  approverName?: string;
}

export interface Workflow {
  id: string;
  name: string;
  module: string;
  approvalLevels: number;
  escalationTime: number; // in hours
  status: Status;
  steps: WorkflowStep[];
}

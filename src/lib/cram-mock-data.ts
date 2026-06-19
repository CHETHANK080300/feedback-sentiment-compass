import {
  RiskParameter,
  RiskWeight,
  RiskRating,
  DecisionMatrixEntry,
  CustomerRiskAssessment,
  AuditLog,
  Role,
  Workflow
} from './cram-types';

export const mockRiskParameters: RiskParameter[] = [
  {
    id: 'rp-1',
    name: 'Geographic Risk - High Risk Jurisdictions',
    description: 'Risk associated with countries known for high financial crime.',
    riskLevel: 'High',
    score: 85,
    status: 'Active',
    version: 1,
    lastModified: '2023-10-25T10:00:00Z',
    createdBy: 'ComplianceAdmin',
    createdDate: '2023-01-15T08:30:00Z',
    updatedBy: 'ComplianceAdmin',
    updatedDate: '2023-10-25T10:00:00Z',
    effectiveDate: '2023-01-01T00:00:00Z'
  },
  {
    id: 'rp-2',
    name: 'Product Risk - Crypto Assets',
    description: 'Risk level for customers dealing with cryptocurrencies.',
    riskLevel: 'High',
    score: 90,
    status: 'Active',
    version: 2,
    lastModified: '2023-11-12T14:20:00Z',
    createdBy: 'ComplianceAdmin',
    createdDate: '2023-01-15T08:30:00Z',
    updatedBy: 'RiskManager',
    updatedDate: '2023-11-12T14:20:00Z',
    effectiveDate: '2023-11-15T00:00:00Z'
  },
  {
    id: 'rp-3',
    name: 'Industry Risk - Gambling',
    description: 'Risk associated with the gambling and betting industry.',
    riskLevel: 'Medium',
    score: 60,
    status: 'Active',
    version: 1,
    lastModified: '2023-01-15T08:30:00Z',
    createdBy: 'ComplianceAdmin',
    createdDate: '2023-01-15T08:30:00Z',
    updatedBy: 'ComplianceAdmin',
    updatedDate: '2023-01-15T08:30:00Z'
  },
  {
    id: 'rp-4',
    name: 'Customer Type - PEP',
    description: 'Politically Exposed Persons risk scoring.',
    riskLevel: 'High',
    score: 95,
    status: 'Active',
    version: 3,
    lastModified: '2024-02-01T09:00:00Z',
    createdBy: 'ComplianceAdmin',
    createdDate: '2023-01-15T08:30:00Z',
    updatedBy: 'ComplianceHead',
    updatedDate: '2024-02-01T09:00:00Z'
  }
];

export const mockRiskWeights: RiskWeight[] = [
  {
    id: 'rw-1',
    factorName: 'Geographic Risk',
    weightPercentage: 40,
    status: 'Active',
    version: 1,
    lastModified: '2023-01-15T08:30:00Z'
  },
  {
    id: 'rw-2',
    factorName: 'Product Risk',
    weightPercentage: 30,
    status: 'Active',
    version: 1,
    lastModified: '2023-01-15T08:30:00Z'
  },
  {
    id: 'rw-3',
    factorName: 'Customer Segment Risk',
    weightPercentage: 30,
    status: 'Active',
    version: 1,
    lastModified: '2023-01-15T08:30:00Z'
  }
];

export const mockRiskRatings: RiskRating[] = [
  { id: 'rr-1', minScore: 0, maxScore: 30, rating: 'Low' },
  { id: 'rr-2', minScore: 31, maxScore: 60, rating: 'Medium' },
  { id: 'rr-3', minScore: 61, maxScore: 80, rating: 'High' },
  { id: 'rr-4', minScore: 81, maxScore: 100, rating: 'Very High' }
];

export const mockDecisionMatrix: DecisionMatrixEntry[] = [
  { id: 'dm-1', rating: 'Low', decision: 'Approve' },
  { id: 'dm-2', rating: 'Medium', decision: 'Approve' },
  { id: 'dm-3', rating: 'High', decision: 'Review' },
  { id: 'dm-4', rating: 'Very High', decision: 'Reject' }
];

export const mockAssessments: CustomerRiskAssessment[] = [
  {
    id: 'as-1001',
    customerId: 'C-98234',
    customerName: 'Global Tech Solutions Inc.',
    customerType: 'Corporate',
    segment: 'Enterprise',
    industry: 'Technology',
    geography: 'Singapore',
    finalScore: 45,
    rating: 'Medium',
    decision: 'Approve',
    assessmentDate: '2024-03-10T14:30:00Z',
    status: 'Completed',
    breakdown: [
      { parameterName: 'Geographic Risk', score: 20, weight: 40, weightedScore: 8 },
      { parameterName: 'Product Risk', score: 50, weight: 30, weightedScore: 15 },
      { parameterName: 'Segment Risk', score: 73, weight: 30, weightedScore: 22 }
    ],
    history: [
      { date: '2023-03-10T14:30:00Z', score: 42, rating: 'Medium' }
    ]
  },
  {
    id: 'as-1002',
    customerId: 'C-77421',
    customerName: 'John Doe',
    customerType: 'Individual',
    segment: 'Retail',
    industry: 'Education',
    geography: 'United Kingdom',
    finalScore: 15,
    rating: 'Low',
    decision: 'Approve',
    assessmentDate: '2024-03-12T09:15:00Z',
    status: 'Completed',
    breakdown: [
      { parameterName: 'Geographic Risk', score: 10, weight: 40, weightedScore: 4 },
      { parameterName: 'Product Risk', score: 20, weight: 30, weightedScore: 6 },
      { parameterName: 'Segment Risk', score: 17, weight: 30, weightedScore: 5 }
    ],
    history: []
  },
  {
    id: 'as-1003',
    customerId: 'C-11209',
    customerName: 'Luxury Imports Ltd',
    customerType: 'Corporate',
    segment: 'Commercial',
    industry: 'Retail',
    geography: 'Cayman Islands',
    finalScore: 88,
    rating: 'Very High',
    decision: 'Reject',
    assessmentDate: '2024-03-14T11:45:00Z',
    status: 'Completed',
    breakdown: [
      { parameterName: 'Geographic Risk', score: 95, weight: 40, weightedScore: 38 },
      { parameterName: 'Product Risk', score: 85, weight: 30, weightedScore: 25.5 },
      { parameterName: 'Segment Risk', score: 82, weight: 30, weightedScore: 24.6 }
    ],
    history: [
      { date: '2023-09-14T11:45:00Z', score: 85, rating: 'Very High' }
    ]
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'al-1',
    timestamp: '2024-03-15T10:00:00Z',
    userId: 'U-001',
    userName: 'Aarav S.',
    action: 'UPDATE_WEIGHT',
    module: 'Risk Weights',
    oldValue: { geographic: 35, product: 35 },
    newValue: { geographic: 40, product: 30 },
    ipAddress: '192.168.1.45',
    sessionId: 'sess-9923'
  },
  {
    id: 'al-2',
    timestamp: '2024-03-15T11:30:00Z',
    userId: 'U-002',
    userName: 'Sarah L.',
    action: 'CREATE_PARAMETER',
    module: 'Risk Parameters',
    oldValue: null,
    newValue: { name: 'New Industry Risk', score: 75 },
    ipAddress: '192.168.1.52',
    sessionId: 'sess-4412'
  }
];

export const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Compliance Admin',
    description: 'Full access to all CRAM modules and configurations.',
    status: 'Active',
    permissions: {
      'Risk Parameters': 'Admin',
      'Risk Weights': 'Admin',
      'Risk Ratings': 'Admin',
      'Decision Matrix': 'Admin',
      'Assessments': 'Admin',
      'Audit Logs': 'Admin',
      'Workflows': 'Admin'
    }
  },
  {
    id: 'role-2',
    name: 'Compliance User',
    description: 'Can view and suggest changes (Maker).',
    status: 'Active',
    permissions: {
      'Risk Parameters': 'Write',
      'Risk Weights': 'Write',
      'Risk Ratings': 'Write',
      'Decision Matrix': 'Write',
      'Assessments': 'Read',
      'Audit Logs': 'Read',
      'Workflows': 'Read'
    }
  },
  {
    id: 'role-3',
    name: 'Auditor',
    description: 'Read-only access for compliance audit.',
    status: 'Active',
    permissions: {
      'Risk Parameters': 'Read',
      'Risk Weights': 'Read',
      'Risk Ratings': 'Read',
      'Decision Matrix': 'Read',
      'Assessments': 'Read',
      'Audit Logs': 'Read',
      'Workflows': 'Read'
    }
  }
];

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Risk Weight Change Approval',
    module: 'Risk Weights',
    approvalLevels: 2,
    escalationTime: 48,
    status: 'Active',
    steps: [
      { level: 1, role: 'Compliance Manager' },
      { level: 2, role: 'Compliance Head' }
    ]
  },
  {
    id: 'wf-2',
    name: 'Parameter Update Workflow',
    module: 'Risk Parameters',
    approvalLevels: 1,
    escalationTime: 24,
    status: 'Active',
    steps: [
      { level: 1, role: 'Risk Manager' }
    ]
  }
];

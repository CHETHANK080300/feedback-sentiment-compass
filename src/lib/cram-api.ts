import {
  mockRiskParameters,
  mockRiskWeights,
  mockRiskRatings,
  mockDecisionMatrix,
  mockAssessments,
  mockAuditLogs,
  mockRoles,
  mockWorkflows
} from './cram-mock-data';

/**
 * CRAM API Layer (Simulation)
 * In a production environment, these would be server-side routes fetching from a database.
 * Following REST conventions as requested.
 */

export const cramApi = {
  // Risk Parameters
  getRiskParameters: async () => {
    return mockRiskParameters;
  },

  createRiskParameter: async (data: any) => {
    console.log('POST /risk-parameters', data);
    return { ...data, id: `rp-${Math.random()}`, status: 'Pending Approval' };
  },

  updateRiskParameter: async (id: string, data: any) => {
    console.log(`PUT /risk-parameters/${id}`, data);
    return { ...data, id, status: 'Pending Approval' };
  },

  // Risk Weights
  getRiskWeights: async () => {
    return mockRiskWeights;
  },

  updateRiskWeights: async (weights: any[]) => {
    console.log('POST /risk-weights', weights);
    return weights;
  },

  // Risk Ratings
  getRiskRatings: async () => {
    return mockRiskRatings;
  },

  updateRiskRatings: async (ratings: any[]) => {
    console.log('POST /risk-ratings', ratings);
    return ratings;
  },

  // Decision Matrix
  getDecisionMatrix: async () => {
    return mockDecisionMatrix;
  },

  updateDecisionMatrix: async (matrix: any[]) => {
    console.log('POST /decision-matrix', matrix);
    return matrix;
  },

  // Risk Assessments
  getAssessments: async (filters?: any) => {
    return mockAssessments;
  },

  getAssessmentById: async (id: string) => {
    return mockAssessments.find(a => a.id === id);
  },

  // Workflows
  getWorkflows: async () => {
    return mockWorkflows;
  },

  // Audit Logs
  getAuditLogs: async () => {
    return mockAuditLogs;
  },

  // Role Management
  getRoles: async () => {
    return mockRoles;
  }
};

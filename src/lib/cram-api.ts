import {
  mockRiskParameters,
  mockRiskWeights,
  mockRiskRatings,
  mockDecisionMatrix,
  mockAssessments,
  mockAuditLogs,
  mockRoles,
  mockWorkflows,
} from "./cram-mock-data";
import {
  DecisionMatrixEntry,
  RiskParameter,
  RiskRating,
  RiskWeight,
} from "./cram-types";

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

  createRiskParameter: async (data: Partial<RiskParameter>) => {
    console.log("POST /risk-parameters", data);
    return { ...data, id: `rp-${Math.random()}`, status: "Pending Approval" };
  },

  updateRiskParameter: async (id: string, data: Partial<RiskParameter>) => {
    console.log(`PUT /risk-parameters/${id}`, data);
    return { ...data, id, status: "Pending Approval" };
  },

  // Risk Weights
  getRiskWeights: async () => {
    return mockRiskWeights;
  },

  updateRiskWeights: async (weights: RiskWeight[]) => {
    console.log("POST /risk-weights", weights);
    return weights;
  },

  // Risk Ratings
  getRiskRatings: async () => {
    return mockRiskRatings;
  },

  updateRiskRatings: async (ratings: RiskRating[]) => {
    console.log("POST /risk-ratings", ratings);
    return ratings;
  },

  // Decision Matrix
  getDecisionMatrix: async () => {
    return mockDecisionMatrix;
  },

  updateDecisionMatrix: async (matrix: DecisionMatrixEntry[]) => {
    console.log("POST /decision-matrix", matrix);
    return matrix;
  },

  // Risk Assessments
  getAssessments: async (
    filters?: Record<string, string | number | boolean>,
  ) => {
    return mockAssessments;
  },

  getAssessmentById: async (id: string) => {
    return mockAssessments.find((a) => a.id === id);
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
  },
};

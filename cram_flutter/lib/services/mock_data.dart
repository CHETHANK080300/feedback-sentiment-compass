import '../models/cram_models.dart';

class MockData {
  static List<RiskFactor> riskFactors = [
    RiskFactor(id: "1", name: "Customer Type Risk", weightage: 35, status: Status.active),
    RiskFactor(id: "2", name: "Geography Risk", weightage: 25, status: Status.active),
    RiskFactor(id: "3", name: "Product Risk", weightage: 30, status: Status.active),
    RiskFactor(id: "4", name: "Channel Risk", weightage: 10, status: Status.active),
    RiskFactor(id: "5", name: "Transaction Risk", weightage: 0, status: Status.active),
  ];

  static List<GeographyRisk> geographyRisks = [
    GeographyRisk(
      id: "1",
      country: "UAE",
      fatf: "Low",
      baselIndex: 4.2,
      sanctions: "No",
      cpi: 67,
      calculatedRating: RiskLevel.low,
      finalRating: RiskLevel.low,
    ),
    GeographyRisk(
      id: "2",
      country: "Afghanistan",
      fatf: "High",
      baselIndex: 8.1,
      sanctions: "Yes",
      cpi: 16,
      calculatedRating: RiskLevel.high,
      finalRating: RiskLevel.high,
    ),
  ];

  static List<ProductRisk> productRisks = [
    ProductRisk(
      id: "1",
      product: "Current Account",
      liquidity: 3,
      crossBorder: 2,
      anonymity: 1,
      fatfRisk: 2,
      finalRisk: 2.2,
    ),
  ];

  static List<RiskRating> riskRatings = [
    RiskRating(id: "1", minScore: 0, maxScore: 30, rating: "Low", color: "success"),
    RiskRating(id: "2", minScore: 31, maxScore: 60, rating: "Medium", color: "warning"),
    RiskRating(id: "3", minScore: 61, maxScore: 80, rating: "High", color: "critical"),
    RiskRating(id: "4", minScore: 81, maxScore: 100, rating: "Very High", color: "black"),
  ];

  static List<DecisionMatrix> decisionMatrix = [
    DecisionMatrix(id: "1", rating: "Low", decision: "Approve", conditions: "Standard Onboarding"),
    DecisionMatrix(id: "2", rating: "Medium", decision: "Approve", conditions: "Standard Onboarding"),
    DecisionMatrix(id: "3", rating: "High", decision: "Review", conditions: "Enhanced Due Diligence Required"),
    DecisionMatrix(id: "4", rating: "Very High", decision: "Reject", conditions: "Outside Risk Appetite"),
  ];

  static List<CustomerAssessment> assessments = [
    CustomerAssessment(
      id: "AST-1001",
      customerId: "CUST-8821",
      cifNumber: "CIF00921",
      name: "Ahmad Abdullah",
      customerType: "Individual",
      segment: "Retail",
      industry: "Salaried",
      geography: "UAE",
      finalScore: 24,
      riskRating: "Low",
      decision: "Approve",
      assessmentDate: "2024-05-10",
      status: "Completed",
    ),
  ];

  static List<AuditLog> auditLogs = [
    AuditLog(
      id: "1",
      timestamp: DateTime.now().toIso8601String(),
      user: "Chethan K",
      module: "Risk Weights",
      action: "Weightage Updated",
      details: "Customer Type Risk changed from 30% to 35%",
    ),
  ];

  static List<Dispute> disputes = [
    Dispute(
      id: "DIS-7721",
      customerName: "Ahmad Abdullah",
      issueType: "Transaction Error",
      channel: "Mobile",
      date: "2024-05-18",
      status: "Pending",
    ),
  ];
}

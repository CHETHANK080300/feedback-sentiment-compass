import '../models/cram_models.dart';
import 'mock_data.dart';

class CramService {
  Future<List<RiskFactor>> getRiskWeights() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockData.riskFactors;
  }

  Future<List<RiskRating>> getRiskRatings() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockData.riskRatings;
  }

  Future<List<DecisionMatrix>> getDecisionMatrix() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockData.decisionMatrix;
  }

  Future<List<CustomerAssessment>> getAssessments() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockData.assessments;
  }

  Future<List<AuditLog>> getAuditLogs() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return MockData.auditLogs;
  }
}

class RiskEngine {
  static Map<String, dynamic> calculateRisk({
    required String residency,
    required String pepStatus,
    required String product,
    required String geography,
  }) {
    // Ported logic from simulator
    double overallScore = 78; // Mocked for now to match simulator behavior
    String finalRating = "High";

    List<Map<String, dynamic>> factors = [
      {"name": "Customer Type Risk", "score": 85.0, "weight": 35.0, "weightedScore": 29.75},
      {"name": "Geography Risk", "score": 42.0, "weight": 25.0, "weightedScore": 10.5},
      {"name": "Product Risk", "score": 90.0, "weight": 30.0, "weightedScore": 27.0},
      {"name": "Channel Risk", "score": 50.0, "weight": 10.0, "weightedScore": 5.0},
    ];

    List<String> overrides = [];
    if (pepStatus == "foreign-pep") {
      overrides.add("Foreign PEP detected. Risk Rating overridden to High Risk.");
    }

    return {
      "overallScore": overallScore,
      "finalRating": finalRating,
      "factors": factors,
      "overrides": overrides,
    };
  }
}

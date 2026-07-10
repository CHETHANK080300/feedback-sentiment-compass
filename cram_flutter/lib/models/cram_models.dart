enum RiskLevel { low, medium, high, prohibited }

enum Status { active, inactive, pendingApproval }

class RiskFactor {
  final String id;
  final String name;
  final double weightage;
  final Status status;

  RiskFactor({
    required this.id,
    required this.name,
    required this.weightage,
    required this.status,
  });
}

class GeographyRisk {
  final String id;
  final String country;
  final String fatf;
  final double baselIndex;
  final String sanctions;
  final int cpi;
  final RiskLevel calculatedRating;
  final RiskLevel finalRating;
  final String? overrideReason;

  GeographyRisk({
    required this.id,
    required this.country,
    required this.fatf,
    required this.baselIndex,
    required this.sanctions,
    required this.cpi,
    required this.calculatedRating,
    required this.finalRating,
    this.overrideReason,
  });
}

class ProductRisk {
  final String id;
  final String product;
  final int liquidity;
  final int crossBorder;
  final int anonymity;
  final int fatfRisk;
  final double finalRisk;

  ProductRisk({
    required this.id,
    required this.product,
    required this.liquidity,
    required this.crossBorder,
    required this.anonymity,
    required this.fatfRisk,
    required this.finalRisk,
  });
}

class RiskRating {
  final String id;
  final double minScore;
  final double maxScore;
  final String rating;
  final String color;

  RiskRating({
    required this.id,
    required this.minScore,
    required this.maxScore,
    required this.rating,
    required this.color,
  });
}

class DecisionMatrix {
  final String id;
  final String rating;
  final String decision;
  final String conditions;

  DecisionMatrix({
    required this.id,
    required this.rating,
    required this.decision,
    required this.conditions,
  });
}

class CustomerAssessment {
  final String id;
  final String customerId;
  final String cifNumber;
  final String name;
  final String customerType;
  final String segment;
  final String industry;
  final String geography;
  final double finalScore;
  final String riskRating;
  final String decision;
  final String assessmentDate;
  final String status;

  CustomerAssessment({
    required this.id,
    required this.customerId,
    required this.cifNumber,
    required this.name,
    required this.customerType,
    required this.segment,
    required this.industry,
    required this.geography,
    required this.finalScore,
    required this.riskRating,
    required this.decision,
    required this.assessmentDate,
    required this.status,
  });
}

class AuditLog {
  final String id;
  final String timestamp;
  final String user;
  final String module;
  final String action;
  final String? details;

  AuditLog({
    required this.id,
    required this.timestamp,
    required this.user,
    required this.module,
    required this.action,
    this.details,
  });
}

class Dispute {
  final String id;
  final String customerName;
  final String issueType;
  final String channel;
  final String date;
  final String status;

  Dispute({
    required this.id,
    required this.customerName,
    required this.issueType,
    required this.channel,
    required this.date,
    required this.status,
  });
}

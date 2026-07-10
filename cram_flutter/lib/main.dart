import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'utils/app_theme.dart';
import 'screens/login_screen.dart';
import 'screens/transaction_analyzer_screen.dart';
import 'screens/risk_model_screen.dart';
import 'screens/risk_ratings_screen.dart';
import 'screens/risk_simulator_screen.dart';
import 'screens/audit_logs_screen.dart';
import 'screens/assessments_screen.dart';
import 'screens/geography_screen.dart';
import 'screens/products_screen.dart';
import 'screens/surveys_screen.dart';
import 'screens/override_rules_screen.dart';
import 'screens/workflows_screen.dart';
import 'screens/roles_screen.dart';

void main() {
  runApp(const CramApp());
}

class CramApp extends StatelessWidget {
  const CramApp({super.key});

  @override
  Widget build(BuildContext context) {
    final GoRouter router = GoRouter(
      initialLocation: '/login',
      routes: [
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/transaction-analyzer',
          builder: (context, state) => const TransactionAnalyzerScreen(),
        ),
        GoRoute(
          path: '/admin/cram',
          builder: (context, state) => const RiskModelScreen(),
        ),
        GoRoute(
          path: '/admin/cram/ratings',
          builder: (context, state) => const RiskRatingsScreen(),
        ),
        GoRoute(
          path: '/admin/cram/simulator',
          builder: (context, state) => const RiskSimulatorScreen(),
        ),
        GoRoute(
          path: '/admin/cram/audit-logs',
          builder: (context, state) => const AuditLogsScreen(),
        ),
        GoRoute(
          path: '/admin/cram/assessments',
          builder: (context, state) => const AssessmentsScreen(),
        ),
        GoRoute(
          path: '/admin/cram/geography',
          builder: (context, state) => const GeographyScreen(),
        ),
        GoRoute(
          path: '/admin/cram/products',
          builder: (context, state) => const ProductsScreen(),
        ),
        GoRoute(
          path: '/admin/cram/overrides',
          builder: (context, state) => const OverrideRulesScreen(),
        ),
        GoRoute(
          path: '/admin/cram/workflows',
          builder: (context, state) => const WorkflowsScreen(),
        ),
        GoRoute(
          path: '/admin/cram/roles',
          builder: (context, state) => const RolesScreen(),
        ),
        GoRoute(
          path: '/surveys',
          builder: (context, state) => const SurveysScreen(),
        ),
      ],
    );

    return MaterialApp.router(
      title: 'CRAM Administration',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: router,
    );
  }
}

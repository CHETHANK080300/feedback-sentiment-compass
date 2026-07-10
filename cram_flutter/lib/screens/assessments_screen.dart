import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';
import '../models/cram_models.dart';
import '../services/mock_data.dart';

class AssessmentsScreen extends StatelessWidget {
  const AssessmentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Customer Risk Assessments',
      subtitle: 'View and manage individual customer risk profiles and historical evaluations',
      body: Panel(
        title: 'Assessment History',
        subtitle: 'Showing recent risk evaluations',
        trailing: OutlinedButton.icon(
          onPressed: () {},
          icon: const Icon(LucideIcons.search, size: 16),
          label: const Text('Search Customers'),
        ),
        child: DataTable(
          columnSpacing: 60,
          columns: const [
            DataColumn(label: Text('Assessment ID')),
            DataColumn(label: Text('Customer Name')),
            DataColumn(label: Text('Risk Rating')),
            DataColumn(label: Text('Decision')),
            DataColumn(label: Text('Date')),
          ],
          rows: MockData.assessments.map((ast) {
            return DataRow(cells: [
              DataCell(Text(ast.id, style: const TextStyle(fontFamily: 'monospace', fontSize: 12, fontWeight: FontWeight.bold))),
              DataCell(Text(ast.name, style: const TextStyle(fontWeight: FontWeight.bold))),
              DataCell(_buildRatingBadge(ast.riskRating)),
              DataCell(_buildDecisionBadge(ast.decision)),
              DataCell(Text(ast.assessmentDate)),
            ]);
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildRatingBadge(String rating) {
    Color color;
    switch (rating) {
      case 'Low': color = AppTheme.successColor; break;
      case 'Medium': color = AppTheme.warningColor; break;
      case 'High': color = AppTheme.criticalColor; break;
      case 'Very High': color = Colors.black; break;
      default: color = AppTheme.primaryColor;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
      child: Text(rating, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
    );
  }

  Widget _buildDecisionBadge(String decision) {
    Color color;
    switch (decision) {
      case 'Approve': color = AppTheme.successColor; break;
      case 'Review': color = AppTheme.warningColor; break;
      case 'Reject': color = AppTheme.criticalColor; break;
      default: color = AppTheme.primaryColor;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
      child: Text(decision.toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
    );
  }
}

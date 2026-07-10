import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';
import '../models/cram_models.dart';
import '../services/mock_data.dart';

class RiskRatingsScreen extends StatelessWidget {
  const RiskRatingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Risk Ratings & Decisions',
      subtitle: 'Define score thresholds and corresponding onboarding outcomes',
      body: Column(
        children: [
          _buildRatingsPanel(),
          const SizedBox(height: 24),
          _buildDecisionMatrixPanel(),
        ],
      ),
    );
  }

  Widget _buildRatingsPanel() {
    return Panel(
      title: 'Score Thresholds',
      subtitle: 'Map final score ranges to risk levels',
      trailing: ElevatedButton.icon(
        onPressed: () {},
        icon: const Icon(LucideIcons.save, size: 16),
        label: const Text('Save Changes'),
      ),
      child: DataTable(
        columnSpacing: 100,
        columns: const [
          DataColumn(label: Text('Min Score')),
          DataColumn(label: Text('Max Score')),
          DataColumn(label: Text('Rating')),
          DataColumn(label: Text('Visual')),
        ],
        rows: MockData.riskRatings.map((rating) {
          return DataRow(cells: [
            DataCell(Text(rating.minScore.toStringAsFixed(0))),
            DataCell(Text(rating.maxScore.toStringAsFixed(0))),
            DataCell(Text(rating.rating, style: const TextStyle(fontWeight: FontWeight.bold))),
            DataCell(Container(
              width: 100,
              height: 8,
              decoration: BoxDecoration(
                color: _getColor(rating.color),
                borderRadius: BorderRadius.circular(4),
              ),
            )),
          ]);
        }).toList(),
      ),
    );
  }

  Widget _buildDecisionMatrixPanel() {
    return Panel(
      title: 'Decision Matrix',
      subtitle: 'Automated policy outcomes',
      child: DataTable(
        columnSpacing: 100,
        columns: const [
          DataColumn(label: Text('Risk Rating')),
          DataColumn(label: Text('Decision')),
          DataColumn(label: Text('Policy Condition')),
        ],
        rows: MockData.decisionMatrix.map((item) {
          return DataRow(cells: [
            DataCell(Text(item.rating, style: const TextStyle(fontWeight: FontWeight.bold))),
            DataCell(_buildDecisionBadge(item.decision)),
            DataCell(Text(item.conditions, style: const TextStyle(color: AppTheme.mutedTextColor))),
          ]);
        }).toList(),
      ),
    );
  }

  Color _getColor(String color) {
    switch (color) {
      case 'success': return AppTheme.successColor;
      case 'warning': return AppTheme.warningColor;
      case 'critical': return AppTheme.criticalColor;
      default: return Colors.black;
    }
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
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        decision.toUpperCase(),
        style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color),
      ),
    );
  }
}

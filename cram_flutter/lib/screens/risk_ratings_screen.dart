import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class RiskRatingsScreen extends StatelessWidget {
  const RiskRatingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Risk Ratings & Decisions',
      subtitle: 'Define score thresholds and corresponding onboarding outcomes',
      body: Column(
        children: [
          Panel(
            title: 'Score Thresholds',
            subtitle: 'Map final score ranges to risk levels',
            action: ElevatedButton.icon(onPressed: () {}, icon: const Icon(LucideIcons.save, size: 14), label: const Text('Save Changes', style: TextStyle(fontSize: 12)), style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primaryColor, foregroundColor: Colors.white)),
            child: _buildRatingsTable(),
          ),
          const SizedBox(height: 24),
          Panel(
            title: 'Decision Matrix',
            subtitle: 'Automated policy outcomes based on risk rating',
            child: _buildDecisionTable(),
          ),
        ],
      ),
    );
  }

  Widget _buildRatingsTable() {
    final ratings = [
      {'min': 0, 'max': 30, 'label': 'Low', 'color': AppTheme.successColor},
      {'min': 31, 'max': 60, 'label': 'Medium', 'color': AppTheme.warningColor},
      {'min': 61, 'max': 80, 'label': 'High', 'color': AppTheme.criticalColor},
      {'min': 81, 'max': 100, 'label': 'Very High', 'color': Colors.black},
    ];

    return SizedBox(
      width: double.infinity,
      child: DataTable(
        headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
        columns: const [
          DataColumn(label: Text('MIN SCORE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
          DataColumn(label: Text('MAX SCORE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
          DataColumn(label: Text('RATING', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
          DataColumn(label: Text('VISUAL INDICATOR', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
        ],
        rows: ratings.map((r) => DataRow(cells: [
          DataCell(Text('${r['min']}')),
          DataCell(Text('${r['max']}')),
          DataCell(Text(r['label'] as String, style: const TextStyle(fontWeight: FontWeight.bold))),
          DataCell(Container(width: 120, height: 8, decoration: BoxDecoration(color: (r['color'] as Color).withValues(alpha: 0.2), borderRadius: BorderRadius.circular(4)), child: FractionallySizedBox(alignment: Alignment.centerLeft, widthFactor: 0.6, child: Container(decoration: BoxDecoration(color: r['color'] as Color, borderRadius: BorderRadius.circular(4)))))),
        ])).toList(),
      ),
    );
  }

  Widget _buildDecisionTable() {
    final matrix = [
      {'rating': 'Low', 'decision': 'Approve', 'condition': 'Standard Onboarding'},
      {'rating': 'Medium', 'decision': 'Approve', 'condition': 'Standard Onboarding'},
      {'rating': 'High', 'decision': 'Review', 'condition': 'Enhanced Due Diligence'},
      {'rating': 'Very High', 'decision': 'Reject', 'condition': 'Outside Risk Appetite'},
    ];

    return SizedBox(
      width: double.infinity,
      child: DataTable(
        headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
        columns: const [
          DataColumn(label: Text('RISK RATING', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
          DataColumn(label: Text('DECISION', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
          DataColumn(label: Text('POLICY CONDITION', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
        ],
        rows: matrix.map((m) => DataRow(cells: [
          DataCell(Text(m['rating']!, style: const TextStyle(fontWeight: FontWeight.bold))),
          DataCell(_buildDecisionBadge(m['decision']!)),
          DataCell(Text(m['condition']!, style: const TextStyle(color: AppTheme.mutedTextColor))),
        ])).toList(),
      ),
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
      decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(12)),
      child: Text(decision.toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
    );
  }
}

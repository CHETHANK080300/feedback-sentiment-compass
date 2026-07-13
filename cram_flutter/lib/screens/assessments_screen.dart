import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

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
        action: Row(
          children: [
            OutlinedButton.icon(onPressed: () {}, icon: const Icon(LucideIcons.search, size: 14), label: const Text('Search', style: TextStyle(fontSize: 12))),
            const SizedBox(width: 8),
            OutlinedButton.icon(onPressed: () {}, icon: const Icon(LucideIcons.download, size: 14), label: const Text('Export', style: TextStyle(fontSize: 12))),
          ],
        ),
        child: SizedBox(
          width: double.infinity,
          child: DataTable(
            headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
            columns: const [
              DataColumn(label: Text('ASSESSMENT ID', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('CUSTOMER NAME', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('RISK RATING', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('DECISION', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('DATE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
            ],
            rows: [
              _buildRow('AST-1001', 'Ahmad Abdullah', 'Low', 'APPROVE', '2024-05-10', AppTheme.successColor),
              _buildRow('AST-1002', 'Global Trading LLC', 'Medium', 'APPROVE', '2024-05-12', AppTheme.warningColor),
              _buildRow('AST-1003', 'Mikhail Volkov', 'Very High', 'REJECT', '2024-05-14', Colors.black),
            ],
          ),
        ),
      ),
    );
  }

  DataRow _buildRow(String id, String name, String rating, String dec, String date, Color color) {
    return DataRow(cells: [
      DataCell(Text(id, style: const TextStyle(fontFamily: 'monospace', fontSize: 12, fontWeight: FontWeight.bold))),
      DataCell(Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13))),
      DataCell(Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2), decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(4)), child: Text(rating, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)))),
      DataCell(_buildDecisionBadge(dec)),
      DataCell(Text(date, style: const TextStyle(fontSize: 12))),
    ]);
  }

  Widget _buildDecisionBadge(String decision) {
    Color color = decision == 'REJECT' ? AppTheme.criticalColor : AppTheme.successColor;
    return Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2), decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(12)), child: Text(decision, style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: color)));
  }
}

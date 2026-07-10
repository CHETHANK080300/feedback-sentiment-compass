import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class OverrideRulesScreen extends StatelessWidget {
  const OverrideRulesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Override Rules Engine',
      subtitle: 'Configure automated risk level overrides based on specific regulatory or compliance conditions',
      body: Panel(
        title: 'Active Rules',
        subtitle: 'Priority-based rule execution',
        trailing: ElevatedButton.icon(
          onPressed: () {},
          icon: const Icon(LucideIcons.plus, size: 16),
          label: const Text('Add Rule'),
        ),
        child: DataTable(
          columns: const [
            DataColumn(label: Text('Rule Name')),
            DataColumn(label: Text('Condition')),
            DataColumn(label: Text('Outcome')),
            DataColumn(label: Text('Status')),
          ],
          rows: [
            _buildRow('Foreign PEP', 'PEP Status = Foreign', 'High Risk', AppTheme.criticalColor),
            _buildRow('Virtual Currency', 'Industry = Crypto', 'Prohibited', Colors.black),
            _buildRow('STR Filed', 'STR = Yes', 'High Risk', AppTheme.criticalColor),
          ],
        ),
      ),
    );
  }

  DataRow _buildRow(String name, String cond, String outcome, Color color) {
    return DataRow(cells: [
      DataCell(Text(name, style: const TextStyle(fontWeight: FontWeight.bold))),
      DataCell(Text(cond, style: const TextStyle(fontFamily: 'monospace', fontSize: 12))),
      DataCell(Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
        child: Text(outcome, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
      )),
      const DataCell(Icon(LucideIcons.toggleRight, color: AppTheme.accentColor)),
    ]);
  }
}

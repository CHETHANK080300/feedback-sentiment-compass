import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class RiskModelScreen extends StatefulWidget {
  const RiskModelScreen({super.key});

  @override
  State<RiskModelScreen> createState() => _RiskModelScreenState();
}

class _RiskModelScreenState extends State<RiskModelScreen> {
  final List<Map<String, dynamic>> _factors = [
    {'name': 'Customer Type Risk', 'weight': 35, 'status': 'Active'},
    {'name': 'Geography Risk', 'weight': 25, 'status': 'Active'},
    {'name': 'Product Risk', 'weight': 30, 'status': 'Active'},
    {'name': 'Channel Risk', 'weight': 10, 'status': 'Active'},
  ];

  @override
  Widget build(BuildContext context) {
    int total = _factors.fold(0, (sum, f) => sum + (f['weight'] as int));
    bool isValid = total == 100;

    return DashboardLayout(
      title: 'Risk Model Configuration',
      subtitle: 'Manage risk factors and their relative weights in the scoring engine',
      body: Column(
        children: [
          _buildSummary(total, isValid),
          const SizedBox(height: 24),
          Panel(
            title: 'Risk Factors & Weights',
            subtitle: 'Define contribution percentage of each factor',
            action: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.plus, size: 14),
              label: const Text('Add Factor', style: TextStyle(fontSize: 12)),
              style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primaryColor, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
            ),
            child: _buildTable(),
          ),
        ],
      ),
    );
  }

  Widget _buildSummary(int total, bool isValid) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: (isValid ? AppTheme.successColor : AppTheme.criticalColor).withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: (isValid ? AppTheme.successColor : AppTheme.criticalColor).withValues(alpha: 0.2)),
      ),
      child: Row(
        children: [
          Icon(isValid ? LucideIcons.checkCircle : LucideIcons.alertCircle, color: isValid ? AppTheme.successColor : AppTheme.criticalColor, size: 32),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Current Total Weight: $total%', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: isValid ? AppTheme.successColor : AppTheme.criticalColor)),
                Text(isValid ? 'Configuration is valid and balanced' : 'Total weight must equal 100%. Please adjust factors.', style: const TextStyle(color: AppTheme.mutedTextColor)),
              ],
            ),
          ),
          if (isValid) OutlinedButton(onPressed: () {}, child: const Text('Submit for Approval')),
        ],
      ),
    );
  }

  Widget _buildTable() {
    return SizedBox(
      width: double.infinity,
      child: DataTable(
        headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
        columns: const [
          DataColumn(label: Text('PARAMETER NAME', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor))),
          DataColumn(label: Text('WEIGHT %', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor))),
          DataColumn(label: Text('STATUS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor))),
          DataColumn(label: Text('ACTIONS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor))),
        ],
        rows: _factors.map((f) => DataRow(cells: [
          DataCell(Text(f['name'], style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryColor))),
          DataCell(Container(
            width: 80,
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: AppTheme.backgroundColor, borderRadius: BorderRadius.circular(4)),
            child: Text('${f['weight']}%', style: const TextStyle(fontWeight: FontWeight.bold)),
          )),
          DataCell(Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(color: AppTheme.successColor.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(4)),
            child: const Text('ACTIVE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.successColor)),
          )),
          DataCell(Row(children: [
            IconButton(icon: const Icon(LucideIcons.edit2, size: 14), onPressed: () {}),
            IconButton(icon: const Icon(LucideIcons.trash2, size: 14, color: AppTheme.criticalColor), onPressed: () {}),
          ])),
        ])).toList(),
      ),
    );
  }
}

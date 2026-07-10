import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';
import '../models/cram_models.dart';
import '../services/mock_data.dart';

class RiskModelScreen extends StatefulWidget {
  const RiskModelScreen({super.key});

  @override
  State<RiskModelScreen> createState() => _RiskModelScreenState();
}

class _RiskModelScreenState extends State<RiskModelScreen> {
  final List<RiskFactor> _factors = List.from(MockData.riskFactors);

  double get _totalWeight => _factors.fold(0, (sum, item) => sum + item.weightage);

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Risk Model Configuration',
      subtitle: 'Manage risk factors and their relative weights in the scoring engine',
      body: Column(
        children: [
          _buildSummaryCard(),
          const SizedBox(height: 24),
          Panel(
            title: 'Risk Factors & Weights',
            subtitle: 'Define contribution percentage of each factor',
            trailing: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.plus, size: 16),
              label: const Text('Add Factor'),
            ),
            child: _buildWeightsTable(),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryCard() {
    final isValid = _totalWeight == 100;
    return Card(
      color: isValid ? AppTheme.accentColor.withOpacity(0.05) : AppTheme.criticalColor.withOpacity(0.05),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Icon(
              isValid ? LucideIcons.checkCircle2 : LucideIcons.alertCircle,
              color: isValid ? AppTheme.accentColor : AppTheme.criticalColor,
              size: 32,
            ),
            const SizedBox(width: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Current Total Weight: ${_totalWeight.toStringAsFixed(0)}%',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: isValid ? AppTheme.accentColor : AppTheme.criticalColor,
                  ),
                ),
                Text(
                  isValid ? 'Configuration is valid and balanced' : 'Total weight must equal 100%. Please adjust factors.',
                  style: const TextStyle(color: AppTheme.mutedTextColor),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWeightsTable() {
    return DataTable(
      columnSpacing: 100,
      columns: const [
        DataColumn(label: Text('Risk Factor')),
        DataColumn(label: Text('Weight %')),
        DataColumn(label: Text('Status')),
        DataColumn(label: Text('Actions')),
      ],
      rows: _factors.map((factor) {
        return DataRow(cells: [
          DataCell(Text(factor.name, style: const TextStyle(fontWeight: FontWeight.bold))),
          DataCell(
            SizedBox(
              width: 80,
              child: TextFormField(
                initialValue: factor.weightage.toStringAsFixed(0),
                decoration: const InputDecoration(suffixText: '%'),
                keyboardType: TextInputType.number,
                onChanged: (val) {
                  // Logic to update state
                },
              ),
            ),
          ),
          DataCell(_buildStatusBadge(factor.status)),
          DataCell(Row(
            children: [
              IconButton(icon: const Icon(LucideIcons.edit2, size: 16), onPressed: () {}),
              IconButton(icon: const Icon(LucideIcons.trash2, size: 16, color: AppTheme.criticalColor), onPressed: () {}),
            ],
          )),
        ]);
      }).toList(),
    );
  }

  Widget _buildStatusBadge(Status status) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: status == Status.active ? AppTheme.successColor.withOpacity(0.1) : Colors.grey.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        status == Status.active ? 'ACTIVE' : 'INACTIVE',
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.bold,
          color: status == Status.active ? AppTheme.successColor : Colors.grey,
        ),
      ),
    );
  }
}

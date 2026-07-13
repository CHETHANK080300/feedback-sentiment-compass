import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class RiskSimulatorScreen extends StatefulWidget {
  const RiskSimulatorScreen({super.key});

  @override
  State<RiskSimulatorScreen> createState() => _RiskSimulatorScreenState();
}

class _RiskSimulatorScreenState extends State<RiskSimulatorScreen> {
  bool _calculating = false;
  Map<String, dynamic>? _result;

  void _handleCalculate() {
    setState(() => _calculating = true);
    Future.delayed(const Duration(milliseconds: 1200), () {
      setState(() {
        _result = {
          'score': 78,
          'rating': 'High',
          'factors': [
            {'name': 'Customer Type Risk', 'score': 85, 'weight': 35, 'weighted': 29.75},
            {'name': 'Geography Risk', 'score': 42, 'weight': 25, 'weighted': 10.5},
            {'name': 'Product Risk', 'score': 90, 'weight': 30, 'weighted': 27.0},
            {'name': 'Channel Risk', 'score': 50, 'weight': 10, 'weighted': 5.0},
          ]
        };
        _calculating = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Risk Simulator',
      subtitle: 'Simulate and test customer risk scores before production deployment',
      body: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: _buildInputs()),
          const SizedBox(width: 24),
          Expanded(child: _buildResults()),
        ],
      ),
    );
  }

  Widget _buildInputs() {
    return Panel(
      title: 'Simulation Inputs',
      subtitle: 'Select customer profile details',
      child: Column(
        children: [
          _buildField('Residency Status', 'Resident'),
          const SizedBox(height: 16),
          _buildField('PEP Status', 'Foreign PEP'),
          const SizedBox(height: 16),
          _buildField('Nature of Business', 'Retail Trade'),
          const SizedBox(height: 16),
          _buildField('Banking Product', 'International Transfer'),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: _calculating ? null : _handleCalculate,
              icon: _calculating ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)) : const Icon(LucideIcons.playCircle),
              label: Text(_calculating ? 'Calculating...' : 'Calculate Risk', style: const TextStyle(fontWeight: FontWeight.bold)),
              style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primaryColor, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildField(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          decoration: BoxDecoration(border: Border.all(color: AppTheme.borderColor), borderRadius: BorderRadius.circular(8)),
          child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(value), const Icon(LucideIcons.chevronDown, size: 14)]),
        ),
      ],
    );
  }

  Widget _buildResults() {
    if (_calculating) return const Center(child: CircularProgressIndicator());
    if (_result == null) {
      return Container(
        height: 400,
        decoration: BoxDecoration(color: AppTheme.backgroundColor, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppTheme.borderColor, style: BorderStyle.none)),
        child: const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [Icon(LucideIcons.calculator, size: 48, color: Colors.black12), Text('Ready to simulate risk assessment', style: TextStyle(color: AppTheme.mutedTextColor))])),
      );
    }

    return Column(
      children: [
        Panel(
          title: 'Risk Result',
          subtitle: 'Overall score and rating',
          child: Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(color: AppTheme.primaryColor.withValues(alpha: 0.05), borderRadius: BorderRadius.circular(12), border: Border.all(color: AppTheme.primaryColor.withValues(alpha: 0.1))),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [const Text('FINAL SCORE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor)), Text('${_result!['score']}', style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold, color: AppTheme.primaryColor))]),
                Column(crossAxisAlignment: CrossAxisAlignment.end, children: [const Text('FINAL RATING', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor)), Container(padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6), decoration: BoxDecoration(color: AppTheme.criticalColor, borderRadius: BorderRadius.circular(8)), child: Text(_result!['rating'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)))])
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),
        Panel(
          title: 'Risk Breakdown',
          subtitle: 'Weighted contribution by factor',
          child: DataTable(
            headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
            columns: const [
              DataColumn(label: Text('FACTOR', style: TextStyle(fontSize: 11))),
              DataColumn(label: Text('SCORE', style: TextStyle(fontSize: 11))),
              DataColumn(label: Text('WEIGHT', style: TextStyle(fontSize: 11))),
              DataColumn(label: Text('WEIGHTED', style: TextStyle(fontSize: 11))),
            ],
            rows: (_result!['factors'] as List).map((f) => DataRow(cells: [
              DataCell(Text(f['name'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
              DataCell(Text('${f['score']}')),
              DataCell(Text('${f['weight']}%')),
              DataCell(Text('${f['weighted']}', style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.accentColor))),
            ])).toList(),
          ),
        ),
      ],
    );
  }
}

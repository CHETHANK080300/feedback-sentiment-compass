import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';
import '../services/cram_service.dart';

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
        _result = RiskEngine.calculateRisk(
          residency: 'resident',
          pepStatus: 'foreign-pep',
          product: 'intl-transfer',
          geography: 'uae',
        );
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
          Expanded(child: _buildInputsPanel()),
          const SizedBox(width: 24),
          Expanded(child: _buildResultsSection()),
        ],
      ),
    );
  }

  Widget _buildInputsPanel() {
    return Panel(
      title: 'Simulation Inputs',
      subtitle: 'Select customer profile details',
      child: Column(
        children: [
          _buildDropdown('Residency Status', 'Resident'),
          const SizedBox(height: 16),
          _buildDropdown('PEP Status', 'Foreign PEP'),
          const SizedBox(height: 16),
          _buildDropdown('Nature of Business', 'Retail Trade'),
          const SizedBox(height: 16),
          _buildDropdown('Banking Product', 'International Transfer'),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: _calculating ? null : _handleCalculate,
              icon: _calculating
                ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                : const Icon(LucideIcons.playCircle),
              label: Text(_calculating ? 'CALCULATING...' : 'CALCULATE RISK'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primaryColor,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            border: Border.all(color: AppTheme.borderColor),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(value),
              const Icon(LucideIcons.chevronDown, size: 16),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildResultsSection() {
    if (_calculating) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_result == null) {
      return Container(
        height: 400,
        decoration: BoxDecoration(
          border: Border.all(color: AppTheme.borderColor, style: BorderStyle.none),
          color: AppTheme.backgroundColor,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(LucideIcons.calculator, size: 48, color: Colors.black12),
              SizedBox(height: 16),
              Text('Ready to simulate risk assessment', style: TextStyle(color: AppTheme.mutedTextColor)),
            ],
          ),
        ),
      );
    }

    return Column(
      children: [
        Panel(
          title: 'Risk Result',
          subtitle: 'Overall score and rating',
          child: Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppTheme.accentColor.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('FINAL SCORE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor)),
                    Text('${_result!['overallScore']}', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text('FINAL RATING', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(color: AppTheme.criticalColor, borderRadius: BorderRadius.circular(4)),
                      child: Text(_result!['finalRating'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),
        Panel(
          title: 'Risk Breakdown',
          subtitle: 'Weighted contribution by factor',
          child: DataTable(
            columns: const [
              DataColumn(label: Text('Factor')),
              DataColumn(label: Text('Score')),
              DataColumn(label: Text('Weight')),
              DataColumn(label: Text('Weighted')),
            ],
            rows: (_result!['factors'] as List).map((f) {
              return DataRow(cells: [
                DataCell(Text(f['name'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold))),
                DataCell(Text('${f['score']}')),
                DataCell(Text('${f['weight']}%')),
                DataCell(Text('${f['weightedScore']}', style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.accentColor))),
              ]);
            }).toList(),
          ),
        ),
      ],
    );
  }
}

import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class TransactionAnalyzerScreen extends StatefulWidget {
  const TransactionAnalyzerScreen({super.key});

  @override
  State<TransactionAnalyzerScreen> createState() => _TransactionAnalyzerScreenState();
}

class _TransactionAnalyzerScreenState extends State<TransactionAnalyzerScreen> {
  String _chartType = 'area';
  Map<String, String>? _drillDown;

  @override
  Widget build(BuildContext context) {
    if (_drillDown != null) {
      return _buildDrillDownView();
    }

    return DashboardLayout(
      title: 'Transaction Analyzer',
      subtitle: 'Comprehensive view of multi-channel transaction data and behavioral patterns',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildFilterBar(),
          const SizedBox(height: 24),
          _buildKpiGrid(),
          const SizedBox(height: 24),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 2,
                child: _buildVolumeTrendPanel(),
              ),
              const SizedBox(width: 24),
              Expanded(
                child: _buildSystemAlertsPanel(),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(child: _buildDistributionPanel('Channel Distribution', 'Transaction volume by channel', 'channel')),
              const SizedBox(width: 24),
              Expanded(child: _buildDistributionPanel('Transaction Types', 'Classification of activities', 'type')),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDrillDownView() {
    return DashboardLayout(
      title: '${_drillDown!['value']} Analysis',
      subtitle: 'Detailed breakdown and performance metrics for ${_drillDown!['value']}',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextButton.icon(
            onPressed: () => setState(() => _drillDown = null),
            icon: const Icon(LucideIcons.arrowLeft, size: 16),
            label: const Text('Back to Dashboard'),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(child: KpiCard(title: 'Selected Volume', value: _drillDown!['value'] == 'Mobile' ? '14.2K' : '8.5K', trend: '4.2%', isPositive: true, icon: LucideIcons.refreshCcw)),
              const SizedBox(width: 16),
              const Expanded(child: KpiCard(title: 'Success Rate', value: '99.4%', trend: '0.2%', isPositive: true, icon: LucideIcons.zap)),
              const SizedBox(width: 16),
              const Expanded(child: KpiCard(title: 'Avg. Latency', value: '1.2s', trend: '5%', isPositive: false, icon: LucideIcons.clock)),
            ],
          ),
          const SizedBox(height: 24),
          Panel(
            title: 'User Demographics',
            subtitle: 'Segment distribution for ${_drillDown!['value']}',
            child: Column(
              children: [
                _buildDemographicRow('Retail', _drillDown!['value'] == 'Mobile' ? 75 : 45),
                _buildDemographicRow('Corporate', 15),
                _buildDemographicRow('HNI', 8),
                _buildDemographicRow('Others', 2),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDemographicRow(String label, int value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
              Text('$value%', style: const TextStyle(color: AppTheme.mutedTextColor)),
            ],
          ),
          const SizedBox(height: 8),
          LinearProgressIndicator(
            value: value / 100,
            backgroundColor: AppTheme.borderColor,
            color: AppTheme.accentColor,
            minHeight: 8,
            borderRadius: BorderRadius.circular(4),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterBar() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: AppTheme.borderColor),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Row(
                children: [
                  Text('This Month'),
                  SizedBox(width: 8),
                  Icon(LucideIcons.chevronDown, size: 16),
                ],
              ),
            ),
            const SizedBox(width: 12),
            Container(
              width: 250,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: AppTheme.borderColor),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Row(
                children: [
                  Icon(LucideIcons.search, size: 16, color: AppTheme.mutedTextColor),
                  SizedBox(width: 8),
                  Text('Filter transactions...', style: TextStyle(color: AppTheme.mutedTextColor)),
                ],
              ),
            ),
          ],
        ),
        Row(
          children: [
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.filter, size: 16),
              label: const Text('Filters'),
            ),
            const SizedBox(width: 12),
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.download, size: 16),
              label: const Text('Export'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildKpiGrid() {
    return const Row(
      children: [
        Expanded(child: KpiCard(title: 'Total Transactions', value: '45,239', trend: '12.5%', isPositive: true, icon: LucideIcons.refreshCcw)),
        SizedBox(width: 16),
        Expanded(child: KpiCard(title: 'Transaction Value', value: '\$2.14M', trend: '8.1%', isPositive: true, icon: LucideIcons.creditCard)),
        SizedBox(width: 16),
        Expanded(child: KpiCard(title: 'Active Customers', value: '12,847', trend: '5.3%', isPositive: true, icon: LucideIcons.users)),
        SizedBox(width: 16),
        Expanded(child: KpiCard(title: 'Avg Processing Time', value: '1.8s', trend: '3.2%', isPositive: true, icon: LucideIcons.clock)),
      ],
    );
  }

  Widget _buildVolumeTrendPanel() {
    return Panel(
      title: 'Transaction Volume Trend',
      subtitle: 'Volume of transactions by category',
      trailing: Container(
        padding: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          color: AppTheme.backgroundColor,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            _buildChartToggleButton('Area', _chartType == 'area', () => setState(() => _chartType = 'area')),
            _buildChartToggleButton('Bar', _chartType == 'bar', () => setState(() => _chartType = 'bar')),
          ],
        ),
      ),
      child: SizedBox(
        height: 300,
        child: _chartType == 'area' ? _buildAreaChart() : _buildBarChart(),
      ),
    );
  }

  Widget _buildChartToggleButton(String label, bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        decoration: BoxDecoration(
          color: active ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(4),
          boxShadow: active ? [const BoxShadow(color: Colors.black12, blurRadius: 2)] : null,
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: active ? FontWeight.bold : FontWeight.normal,
            color: active ? AppTheme.primaryColor : AppTheme.mutedTextColor,
          ),
        ),
      ),
    );
  }

  Widget _buildAreaChart() {
    return LineChart(
      LineChartData(
        gridData: const FlGridData(show: true, drawVerticalLine: false),
        titlesData: const FlTitlesData(
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        ),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            isCurved: true,
            color: AppTheme.accentColor,
            barWidth: 3,
            isStrokeCapRound: true,
            dotData: const FlDotData(show: false),
            belowBarData: BarAreaData(show: true, color: AppTheme.accentColor.withOpacity(0.1)),
            spots: const [
              FlSpot(0, 3),
              FlSpot(1, 4),
              FlSpot(2, 3.5),
              FlSpot(3, 5),
              FlSpot(4, 4.5),
              FlSpot(5, 6),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBarChart() {
    return BarChart(
      BarChartData(
        gridData: const FlGridData(show: false),
        titlesData: const FlTitlesData(
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        ),
        borderData: FlBorderData(show: false),
        barGroups: [
          BarChartGroupData(x: 0, barRods: [BarChartRodData(toY: 8, color: AppTheme.accentColor, width: 16)]),
          BarChartGroupData(x: 1, barRods: [BarChartRodData(toY: 10, color: AppTheme.primaryColor, width: 16)]),
          BarChartGroupData(x: 2, barRods: [BarChartRodData(toY: 14, color: AppTheme.accentColor, width: 16)]),
          BarChartGroupData(x: 3, barRods: [BarChartRodData(toY: 15, color: AppTheme.primaryColor, width: 16)]),
          BarChartGroupData(x: 4, barRods: [BarChartRodData(toY: 13, color: AppTheme.accentColor, width: 16)]),
        ],
      ),
    );
  }

  Widget _buildSystemAlertsPanel() {
    return Panel(
      title: 'System Alerts',
      subtitle: 'Real-time notifications',
      child: Column(
        children: [
          _buildAlertItem('Activity Spike', 'International transfer volume exceeded threshold by 42% in UAE.', AppTheme.criticalColor, LucideIcons.alertTriangle),
          const SizedBox(height: 16),
          _buildAlertItem('Security Concern', 'Multiple failed login attempts detected from unrecognized IP range.', AppTheme.warningColor, LucideIcons.shieldAlert),
          const SizedBox(height: 16),
          _buildAlertItem('System Status', 'Primary database maintenance completed. All services operational.', AppTheme.primaryColor, LucideIcons.zap),
        ],
      ),
    );
  }

  Widget _buildAlertItem(String title, String desc, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        border: Border.all(color: color.withOpacity(0.2)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),
            child: Icon(icon, size: 14, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: color)),
                const SizedBox(height: 4),
                Text(desc, style: const TextStyle(fontSize: 11, color: AppTheme.mutedTextColor)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDistributionPanel(String title, String subtitle, String type) {
    final List<PieChartSectionData> sections = [
      PieChartSectionData(color: AppTheme.accentColor, value: 45, title: '45%', radius: 40, titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
      PieChartSectionData(color: AppTheme.primaryColor, value: 30, title: '30%', radius: 40, titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
      PieChartSectionData(color: const Color(0xFF334155), value: 15, title: '15%', radius: 40, titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
    ];

    return Panel(
      title: title,
      subtitle: subtitle,
      child: Column(
        children: [
          SizedBox(
            height: 200,
            child: PieChart(
              PieChartData(
                sections: sections,
                centerSpaceRadius: 40,
                sectionsSpace: 4,
                pieTouchData: PieTouchData(
                  touchCallback: (event, response) {
                    if (response != null && response.touchedSection != null) {
                      final index = response.touchedSection!.touchedSectionIndex;
                      if (index >= 0 && index < sections.length) {
                         setState(() {
                           final value = index == 0 ? (type == 'channel' ? 'Mobile' : 'Deposits')
                                      : index == 1 ? (type == 'channel' ? 'Internet' : 'Transfers')
                                      : (type == 'channel' ? 'ATM' : 'Withdrawals');
                           _drillDown = {'type': type, 'value': value};
                         });
                      }
                    }
                  },
                ),
              ),
            ),
          ),
          const Text('Tip: Click a segment to drill down', style: TextStyle(fontSize: 10, fontStyle: FontStyle.italic, color: AppTheme.mutedTextColor)),
        ],
      ),
    );
  }
}

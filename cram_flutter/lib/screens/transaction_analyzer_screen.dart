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
          const Row(
            children: [
              Expanded(child: KpiCard(title: 'Total Transactions', value: '45,239', delta: 12.5, icon: LucideIcons.refreshCcw, tone: 'primary')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Transaction Value', value: '\$2.14M', delta: 8.1, icon: LucideIcons.creditCard, tone: 'accent')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Active Customers', value: '12,847', delta: 5.3, icon: LucideIcons.users, tone: 'info')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Avg Processing Time', value: '1.8s', delta: -3.2, icon: LucideIcons.clock, tone: 'success')),
            ],
          ),
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
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(child: _buildRaisedDisputesPanel()),
              const SizedBox(width: 24),
              Expanded(child: _buildRecentTransactionsPanel()),
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
          OutlinedButton.icon(
            onPressed: () => setState(() => _drillDown = null),
            icon: const Icon(LucideIcons.arrowLeft, size: 14),
            label: const Text('Back to Dashboard'),
            style: OutlinedButton.styleFrom(
              visualDensity: VisualDensity.compact,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
          ),
          const SizedBox(height: 24),
          const Row(
            children: [
              Expanded(child: KpiCard(title: 'Selected Volume', value: '14.2K', delta: 4.2, icon: LucideIcons.refreshCcw, tone: 'primary')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Success Rate', value: '99.4%', delta: 0.2, icon: LucideIcons.zap, tone: 'success')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Avg. Latency', value: '1.2s', delta: -5.0, icon: LucideIcons.clock, tone: 'info')),
            ],
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              const Expanded(
                child: Panel(
                  title: 'Trend Analysis',
                  subtitle: 'Performance over the last 30 days',
                  child: SizedBox(
                    height: 300,
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(LucideIcons.trendingUp, size: 32, color: Colors.black12),
                          SizedBox(height: 12),
                          Text('Trend Visualization Loading...', style: TextStyle(color: AppTheme.mutedTextColor)),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 24),
              Expanded(
                child: Panel(
                  title: 'User Demographics',
                  subtitle: 'Segment distribution for this category',
                  child: Column(
                    children: [
                      _buildDemographicRow('Retail', 65),
                      _buildDemographicRow('Corporate', 20),
                      _buildDemographicRow('HNI', 10),
                      _buildDemographicRow('Others', 5),
                    ],
                  ),
                ),
              ),
            ],
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
              Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppTheme.primaryColor)),
              Text('$value%', style: const TextStyle(color: AppTheme.mutedTextColor, fontSize: 12)),
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
                  Text('This Month', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
                  SizedBox(width: 8),
                  Icon(LucideIcons.chevronDown, size: 14),
                ],
              ),
            ),
            const SizedBox(width: 12),
            Container(
              width: 300,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: AppTheme.borderColor),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Row(
                children: [
                  Icon(LucideIcons.search, size: 14, color: AppTheme.mutedTextColor),
                  SizedBox(width: 8),
                  Text('Filter transactions...', style: TextStyle(color: AppTheme.mutedTextColor, fontSize: 13)),
                ],
              ),
            ),
          ],
        ),
        Row(
          children: [
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.filter, size: 14),
              label: const Text('Filters', style: TextStyle(fontSize: 12)),
              style: OutlinedButton.styleFrom(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
            ),
            const SizedBox(width: 12),
            OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.download, size: 14),
              label: const Text('Export', style: TextStyle(fontSize: 12)),
              style: OutlinedButton.styleFrom(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildVolumeTrendPanel() {
    return Panel(
      title: 'Transaction Volume Trend',
      subtitle: 'Volume of transactions by category',
      action: Container(
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
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          color: active ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
          boxShadow: active ? [BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 4, offset: const Offset(0, 1))] : null,
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
        gridData: const FlGridData(show: true, drawVerticalLine: false, horizontalInterval: 1),
        titlesData: const FlTitlesData(
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(sideTitles: SideTitles(showTitles: true, reservedSize: 30)),
        ),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            isCurved: true,
            color: AppTheme.accentColor,
            barWidth: 3,
            dotData: const FlDotData(show: false),
            belowBarData: BarAreaData(show: true, color: AppTheme.accentColor.withValues(alpha: 0.1)),
            spots: const [FlSpot(0, 3), FlSpot(1, 5), FlSpot(2, 4), FlSpot(3, 7), FlSpot(4, 6), FlSpot(5, 8), FlSpot(6, 4)],
          ),
          LineChartBarData(
            isCurved: true,
            color: AppTheme.primaryColor,
            barWidth: 3,
            dotData: const FlDotData(show: false),
            belowBarData: BarAreaData(show: true, color: AppTheme.primaryColor.withValues(alpha: 0.05)),
            spots: const [FlSpot(0, 2), FlSpot(1, 3), FlSpot(2, 2.5), FlSpot(3, 4), FlSpot(4, 3.5), FlSpot(5, 5), FlSpot(6, 2)],
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
        barGroups: List.generate(7, (i) => BarChartGroupData(
          x: i,
          barRods: [
            BarChartRodData(toY: (i + 2) * 2.0, color: AppTheme.accentColor, width: 12, borderRadius: BorderRadius.circular(4)),
            BarChartRodData(toY: (i + 1) * 1.5, color: AppTheme.primaryColor, width: 12, borderRadius: BorderRadius.circular(4)),
          ],
        )),
      ),
    );
  }

  Widget _buildSystemAlertsPanel() {
    return Panel(
      title: 'System Alerts',
      subtitle: 'Real-time notifications',
      child: Column(
        children: [
          _buildAlertItem('Activity Spike', 'International transfer volume exceeded threshold by 42% in UAE.', AppTheme.criticalColor, LucideIcons.alertTriangle, '10:42 AM'),
          const SizedBox(height: 16),
          _buildAlertItem('Security Concern', 'Multiple failed login attempts detected from unrecognized IP range.', AppTheme.warningColor, LucideIcons.shieldAlert, '09:15 AM'),
          const SizedBox(height: 16),
          _buildAlertItem('System Status', 'Primary database maintenance completed. All services operational.', AppTheme.primaryColor, LucideIcons.zap, '08:00 AM'),
          const SizedBox(height: 12),
          TextButton(onPressed: () {}, child: const Text('View All Notifications →', style: TextStyle(fontSize: 11))),
        ],
      ),
    );
  }

  Widget _buildAlertItem(String title, String desc, Color color, IconData icon, String time) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.05),
        border: Border.all(color: color.withValues(alpha: 0.2)),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(color: color.withValues(alpha: 0.1), shape: BoxShape.circle),
            child: Icon(icon, size: 14, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(title, style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: color)),
                    Text(time, style: const TextStyle(fontSize: 9, color: AppTheme.mutedTextColor)),
                  ],
                ),
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
      PieChartSectionData(color: AppTheme.accentColor, value: 45, title: '', radius: 30),
      PieChartSectionData(color: AppTheme.primaryColor, value: 30, title: '', radius: 30),
      PieChartSectionData(color: const Color(0xFF334155), value: 15, title: '', radius: 30),
      PieChartSectionData(color: const Color(0xFF64748B), value: 10, title: '', radius: 30),
    ];

    return Panel(
      title: title,
      subtitle: subtitle,
      child: Column(
        children: [
          SizedBox(
            height: 180,
            child: PieChart(
              PieChartData(
                sections: sections,
                centerSpaceRadius: 40,
                sectionsSpace: 4,
                pieTouchData: PieTouchData(
                  touchCallback: (event, response) {
                    if (event is FlTapUpEvent && response != null && response.touchedSection != null) {
                      final index = response.touchedSection!.touchedSectionIndex;
                      if (index >= 0) {
                         setState(() {
                           final val = index == 0 ? 'Mobile' : index == 1 ? 'Internet' : 'ATM';
                           _drillDown = {'type': type, 'value': type == 'channel' ? val : (index == 0 ? 'Deposits' : 'Transfers')};
                         });
                      }
                    }
                  },
                ),
              ),
            ),
          ),
          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _LegendItem(color: AppTheme.accentColor, label: 'Teal'),
              SizedBox(width: 12),
              _LegendItem(color: AppTheme.primaryColor, label: 'Slate'),
            ],
          ),
          const SizedBox(height: 12),
          const Text('Tip: Click a segment to drill down', style: TextStyle(fontSize: 10, fontStyle: FontStyle.italic, color: AppTheme.mutedTextColor)),
        ],
      ),
    );
  }

  Widget _buildRaisedDisputesPanel() {
    return Panel(
      title: 'Raised Disputes',
      subtitle: 'Recent customer issue tracking',
      child: Column(
        children: [
           _buildTable([
             ['DIS-7721', 'Ahmad Abdullah', 'Transaction Error', 'PENDING'],
             ['DIS-4410', 'Elena Rodriguez', 'Unauthorized', 'REVIEW'],
             ['DIS-2291', 'Samuel Kwok', 'Double Billing', 'RESOLVED'],
           ]),
           const SizedBox(height: 12),
           TextButton(onPressed: () {}, child: const Text('Manage All Disputes →', style: TextStyle(fontSize: 11))),
        ],
      ),
    );
  }

  Widget _buildRecentTransactionsPanel() {
    return Panel(
      title: 'Recent Transactions',
      subtitle: 'Live activity stream',
      child: Column(
        children: [
          _buildTable([
            ['TXN-88291', 'Ahmad Abdullah', '\$1,240.00', 'Mobile'],
            ['TXN-88292', 'Elena Rodriguez', '\$500.00', 'ATM'],
            ['TXN-88293', 'Samuel Kwok', '\$3,120.00', 'Branch'],
          ], isTxn: true),
          const SizedBox(height: 12),
          TextButton(onPressed: () {}, child: const Text('View Full Transaction Log →', style: TextStyle(fontSize: 11))),
        ],
      ),
    );
  }

  Widget _buildTable(List<List<String>> data, {bool isTxn = false}) {
    return Table(
      children: data.map((row) => TableRow(
        children: row.map((cell) => Padding(
          padding: const EdgeInsets.symmetric(vertical: 12.0),
          child: Text(cell, style: TextStyle(fontSize: 12, fontWeight: isTxn && cell.contains('\$') ? FontWeight.bold : FontWeight.normal, color: isTxn && cell.contains('\$') ? AppTheme.accentColor : AppTheme.primaryColor)),
        )).toList(),
      )).toList(),
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;
  const _LegendItem({required this.color, required this.label});
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(width: 8, height: 8, decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(2))),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 10, color: AppTheme.mutedTextColor)),
      ],
    );
  }
}

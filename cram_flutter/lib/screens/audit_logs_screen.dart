import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class AuditLogsScreen extends StatelessWidget {
  const AuditLogsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Audit Logs',
      subtitle: 'Track all configuration changes and system activities',
      body: Panel(
        title: 'System Activity Stream',
        subtitle: 'Showing last 50 events',
        action: OutlinedButton.icon(onPressed: () {}, icon: const Icon(LucideIcons.download, size: 14), label: const Text('Export Log', style: TextStyle(fontSize: 12))),
        child: SizedBox(
          width: double.infinity,
          child: DataTable(
            headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
            columns: const [
              DataColumn(label: Text('TIMESTAMP', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('USER', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('MODULE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('ACTION', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('DETAILS', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
            ],
            rows: [
              _buildRow('10:24:12', 'Chethan K', 'Risk Weights', 'Weightage Updated', 'Customer Type changed from 30% to 35%'),
              _buildRow('09:15:00', 'John Doe', 'Geography Risk', 'Country Risk Changed', 'UAE risk rating updated'),
              _buildRow('Yesterday', 'Jane Smith', 'Override Rules', 'Rule Modified', 'Foreign PEP rule updated'),
            ],
          ),
        ),
      ),
    );
  }

  DataRow _buildRow(String time, String user, String mod, String act, String det) {
    return DataRow(cells: [
      DataCell(Text(time, style: const TextStyle(fontSize: 12))),
      DataCell(Text(user, style: const TextStyle(fontWeight: FontWeight.bold))),
      DataCell(Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2), decoration: BoxDecoration(color: AppTheme.backgroundColor, borderRadius: BorderRadius.circular(4)), child: Text(mod, style: const TextStyle(fontSize: 10)))),
      DataCell(Text(act, style: const TextStyle(fontSize: 12))),
      DataCell(Text(det, style: const TextStyle(fontSize: 12, color: AppTheme.mutedTextColor))),
    ]);
  }
}

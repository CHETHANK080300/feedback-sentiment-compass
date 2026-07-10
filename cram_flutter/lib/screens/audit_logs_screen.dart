import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';
import '../models/cram_models.dart';
import '../services/mock_data.dart';

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
        trailing: OutlinedButton.icon(
          onPressed: () {},
          icon: const Icon(LucideIcons.download, size: 16),
          label: const Text('Export Log'),
        ),
        child: DataTable(
          columnSpacing: 60,
          columns: const [
            DataColumn(label: Text('Timestamp')),
            DataColumn(label: Text('User')),
            DataColumn(label: Text('Module')),
            DataColumn(label: Text('Action')),
            DataColumn(label: Text('Details')),
          ],
          rows: MockData.auditLogs.map((log) {
            return DataRow(cells: [
              DataCell(Text(log.timestamp.substring(11, 19), style: const TextStyle(fontSize: 12))),
              DataCell(Text(log.user, style: const TextStyle(fontWeight: FontWeight.bold))),
              DataCell(Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: AppTheme.backgroundColor, borderRadius: BorderRadius.circular(4)),
                child: Text(log.module, style: const TextStyle(fontSize: 10)),
              )),
              DataCell(Text(log.action)),
              DataCell(Text(log.details ?? '', style: const TextStyle(color: AppTheme.mutedTextColor, fontSize: 12))),
            ]);
          }).toList(),
        ),
      ),
    );
  }
}

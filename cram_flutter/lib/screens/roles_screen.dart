import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class RolesScreen extends StatelessWidget {
  const RolesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Role Management',
      subtitle: 'Manage administrative roles and system permissions',
      body: Panel(
        title: 'Permission Matrix',
        subtitle: 'Configure RBAC for system modules',
        action: ElevatedButton.icon(onPressed: () {}, icon: const Icon(LucideIcons.shieldCheck, size: 14), label: const Text('Update Permissions', style: TextStyle(fontSize: 12)), style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primaryColor, foregroundColor: Colors.white)),
        child: SizedBox(
          width: double.infinity,
          child: DataTable(
            headingRowColor: WidgetStateProperty.all(AppTheme.backgroundColor),
            columns: const [
              DataColumn(label: Text('FEATURE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('ADMIN', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('MANAGER', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
              DataColumn(label: Text('AUDITOR', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
            ],
            rows: [
              _buildRow('Risk Parameters', true, true, false),
              _buildRow('Risk Weights', true, false, false),
              _buildRow('Audit Logs', true, true, true),
              _buildRow('Workflows', true, true, false),
            ],
          ),
        ),
      ),
    );
  }

  DataRow _buildRow(String feat, bool adm, bool mgr, bool aud) {
    return DataRow(cells: [
      DataCell(Text(feat, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13))),
      DataCell(Icon(adm ? LucideIcons.check : LucideIcons.x, color: adm ? AppTheme.successColor : AppTheme.criticalColor, size: 16)),
      DataCell(Icon(mgr ? LucideIcons.check : LucideIcons.x, color: mgr ? AppTheme.successColor : AppTheme.criticalColor, size: 16)),
      DataCell(Icon(aud ? LucideIcons.check : LucideIcons.x, color: aud ? AppTheme.successColor : AppTheme.criticalColor, size: 16)),
    ]);
  }
}

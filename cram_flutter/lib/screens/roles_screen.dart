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
        trailing: ElevatedButton.icon(
          onPressed: () {},
          icon: const Icon(LucideIcons.shieldCheck, size: 16),
          label: const Text('Update Permissions'),
        ),
        child: DataTable(
          columns: const [
            DataColumn(label: Text('Feature')),
            DataColumn(label: Text('Admin')),
            DataColumn(label: Text('Manager')),
            DataColumn(label: Text('Auditor')),
          ],
          rows: [
            _buildRow('Risk Parameters', true, true, false),
            _buildRow('Risk Weights', true, false, false),
            _buildRow('Audit Logs', true, true, true),
            _buildRow('User Management', true, false, false),
          ],
        ),
      ),
    );
  }

  DataRow _buildRow(String feature, bool admin, bool manager, bool auditor) {
    return DataRow(cells: [
      DataCell(Text(feature, style: const TextStyle(fontWeight: FontWeight.bold))),
      DataCell(Icon(admin ? LucideIcons.check : LucideIcons.x, color: admin ? AppTheme.successColor : AppTheme.criticalColor, size: 16)),
      DataCell(Icon(manager ? LucideIcons.check : LucideIcons.x, color: manager ? AppTheme.successColor : AppTheme.criticalColor, size: 16)),
      DataCell(Icon(auditor ? LucideIcons.check : LucideIcons.x, color: auditor ? AppTheme.successColor : AppTheme.criticalColor, size: 16)),
    ]);
  }
}

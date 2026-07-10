import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class GeographyScreen extends StatelessWidget {
  const GeographyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Geography Risk Master',
      subtitle: 'Configure risk ratings for countries and jurisdictions',
      body: Panel(
        title: 'Country Risk Levels',
        subtitle: 'FATF and Basel index based classifications',
        trailing: ElevatedButton.icon(
          onPressed: () {},
          icon: const Icon(LucideIcons.plus, size: 16),
          label: const Text('Add Country'),
        ),
        child: DataTable(
          columns: const [
            DataColumn(label: Text('Country')),
            DataColumn(label: Text('FATF Status')),
            DataColumn(label: Text('Basel Index')),
            DataColumn(label: Text('Risk Rating')),
          ],
          rows: [
            _buildRow('UAE', 'Low', '4.2', 'Low', AppTheme.successColor),
            _buildRow('Afghanistan', 'High', '8.1', 'High', AppTheme.criticalColor),
            _buildRow('Bahrain', 'Medium', '5.1', 'Medium', AppTheme.warningColor),
          ],
        ),
      ),
    );
  }

  DataRow _buildRow(String country, String fatf, String basel, String rating, Color color) {
    return DataRow(cells: [
      DataCell(Text(country, style: const TextStyle(fontWeight: FontWeight.bold))),
      DataCell(Text(fatf)),
      DataCell(Text(basel)),
      DataCell(Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
        child: Text(rating, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
      )),
    ]);
  }
}

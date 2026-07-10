import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class ProductsScreen extends StatelessWidget {
  const ProductsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Product Risk Master',
      subtitle: 'Manage risk scores for banking products and services',
      body: Panel(
        title: 'Product Catalog',
        subtitle: 'Risk scoring based on liquidity and cross-border nature',
        child: DataTable(
          columns: const [
            DataColumn(label: Text('Product')),
            DataColumn(label: Text('Liquidity')),
            DataColumn(label: Text('Cross-Border')),
            DataColumn(label: Text('Risk Score')),
          ],
          rows: [
            _buildRow('Current Account', 'High', 'Medium', '2.2', AppTheme.warningColor),
            _buildRow('Savings Account', 'Medium', 'Low', '1.2', AppTheme.successColor),
            _buildRow('International Transfer', 'High', 'High', '3.0', AppTheme.criticalColor),
          ],
        ),
      ),
    );
  }

  DataRow _buildRow(String product, String liq, String cb, String score, Color color) {
    return DataRow(cells: [
      DataCell(Text(product, style: const TextStyle(fontWeight: FontWeight.bold))),
      DataCell(Text(liq)),
      DataCell(Text(cb)),
      DataCell(Text(score, style: TextStyle(fontWeight: FontWeight.bold, color: color))),
    ]);
  }
}

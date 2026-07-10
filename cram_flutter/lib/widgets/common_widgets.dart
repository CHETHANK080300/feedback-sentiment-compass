import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:go_router/go_router.dart';
import '../utils/app_theme.dart';

class DashboardLayout extends StatelessWidget {
  final Widget body;
  final String title;
  final String? subtitle;

  const DashboardLayout({
    super.key,
    required this.body,
    required this.title,
    this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      drawer: _buildDrawer(context),
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppTheme.primaryColor,
              ),
            ),
            if (subtitle != null)
              Text(
                subtitle!,
                style: const TextStyle(
                  fontSize: 12,
                  color: AppTheme.mutedTextColor,
                ),
              ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.search, size: 20),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(LucideIcons.bell, size: 20),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
          const CircleAvatar(
            radius: 16,
            backgroundColor: AppTheme.accentColor,
            child: Text(
              'CK',
              style: TextStyle(fontSize: 12, color: Colors.white),
            ),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: body,
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;

    return Drawer(
      backgroundColor: AppTheme.primaryColor,
      child: Column(
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(color: AppTheme.primaryColor),
            child: Row(
              children: [
                Icon(LucideIcons.shieldCheck, color: AppTheme.accentColor, size: 32),
                SizedBox(width: 12),
                Text(
                  'Appzillon',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              children: [
                _buildSectionHeader('Risk Management'),
                _buildNavItem(context, 'Risk Model', LucideIcons.shieldAlert, '/admin/cram', location == '/admin/cram'),
                _buildNavItem(context, 'Ratings & Decisions', LucideIcons.gauge, '/admin/cram/ratings', location == '/admin/cram/ratings'),
                _buildNavItem(context, 'Geography Master', LucideIcons.globe, '/admin/cram/geography', location == '/admin/cram/geography'),
                _buildNavItem(context, 'Product Master', LucideIcons.briefcase, '/admin/cram/products', location == '/admin/cram/products'),
                _buildNavItem(context, 'Override Rules', LucideIcons.shieldAlert, '/admin/cram/overrides', location == '/admin/cram/overrides'),
                _buildNavItem(context, 'Workflows', LucideIcons.workflow, '/admin/cram/workflows', location == '/admin/cram/workflows'),
                _buildNavItem(context, 'Role Management', LucideIcons.userPlus, '/admin/cram/roles', location == '/admin/cram/roles'),
                _buildNavItem(context, 'Customer Assessments', LucideIcons.users, '/admin/cram/assessments', location == '/admin/cram/assessments'),
                _buildNavItem(context, 'Risk Simulator', LucideIcons.calculator, '/admin/cram/simulator', location == '/admin/cram/simulator'),
                _buildNavItem(context, 'Audit Logs', LucideIcons.history, '/admin/cram/audit-logs', location == '/admin/cram/audit-logs'),
                const SizedBox(height: 16),
                _buildSectionHeader('Analytics'),
                _buildNavItem(context, 'Transaction Overview', LucideIcons.barChart3, '/transaction-analyzer', location == '/transaction-analyzer'),
                _buildNavItem(context, 'Feedback Survey', LucideIcons.messageSquare, '/surveys', location == '/surveys'),
              ],
            ),
          ),
          const Divider(color: Colors.white24),
          ListTile(
            leading: const Icon(LucideIcons.logOut, color: Colors.white70),
            title: const Text('Logout', style: TextStyle(color: Colors.white70)),
            onTap: () => context.go('/login'),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Text(
        title.toUpperCase(),
        style: const TextStyle(color: Colors.white38, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, String title, IconData icon, String route, bool active) {
    return ListTile(
      selected: active,
      selectedTileColor: Colors.white.withOpacity(0.05),
      leading: Icon(icon, color: active ? AppTheme.accentColor : Colors.white70, size: 20),
      title: Text(
        title,
        style: TextStyle(color: active ? Colors.white : Colors.white70, fontSize: 14, fontWeight: active ? FontWeight.bold : FontWeight.normal),
      ),
      onTap: () {
        context.pop(); // Close drawer
        context.go(route);
      },
    );
  }
}

class Panel extends StatelessWidget {
  final Widget child;
  final String title;
  final String? subtitle;
  final Widget? trailing;

  const Panel({
    super.key,
    required this.child,
    required this.title,
    this.subtitle,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                    if (subtitle != null)
                      Text(
                        subtitle!,
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppTheme.mutedTextColor,
                        ),
                      ),
                  ],
                ),
                if (trailing != null) trailing!,
              ],
            ),
            const SizedBox(height: 24),
            child,
          ],
        ),
      ),
    );
  }
}

class KpiCard extends StatelessWidget {
  final String title;
  final String value;
  final String trend;
  final bool isPositive;
  final IconData icon;

  const KpiCard({
    super.key,
    required this.title,
    required this.value,
    required this.trend,
    required this.isPositive,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppTheme.mutedTextColor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Icon(icon, size: 18, color: AppTheme.mutedTextColor),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              value,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: AppTheme.primaryColor,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(
                  isPositive ? LucideIcons.trendingUp : LucideIcons.trendingDown,
                  size: 14,
                  color: isPositive ? AppTheme.successColor : AppTheme.criticalColor,
                ),
                const SizedBox(width: 4),
                Text(
                  trend,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: isPositive ? AppTheme.successColor : AppTheme.criticalColor,
                  ),
                ),
                const SizedBox(width: 4),
                const Text(
                  'vs last month',
                  style: TextStyle(
                    fontSize: 12,
                    color: AppTheme.mutedTextColor,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

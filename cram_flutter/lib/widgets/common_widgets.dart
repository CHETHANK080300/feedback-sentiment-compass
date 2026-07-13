import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:go_router/go_router.dart';
import '../utils/app_theme.dart';

class DashboardLayout extends StatefulWidget {
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
  State<DashboardLayout> createState() => _DashboardLayoutState();
}

class _DashboardLayoutState extends State<DashboardLayout> {
  bool _riskOpen = true;
  bool _analyticsOpen = true;
  bool _feedbackOpen = true;

  @override
  Widget build(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;

    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      body: Row(
        children: [
          _buildSidebar(context, location),
          Expanded(
            child: Column(
              children: [
                _buildHeader(context),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  widget.title,
                                  style: Theme.of(context).textTheme.titleLarge?.copyWith(fontSize: 28),
                                ),
                                if (widget.subtitle != null)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 4.0),
                                    child: Text(
                                      widget.subtitle!,
                                      style: const TextStyle(color: AppTheme.mutedTextColor, fontSize: 14),
                                    ),
                                  ),
                              ],
                            ),
                            Row(
                              children: [
                                Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppTheme.successColor, shape: BoxShape.circle)),
                                const SizedBox(width: 8),
                                const Text('Live · refreshed 12s ago', style: TextStyle(color: AppTheme.mutedTextColor, fontSize: 12)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 32),
                        widget.body,
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSidebar(BuildContext context, String location) {
    return Container(
      width: 260,
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(right: BorderSide(color: AppTheme.borderColor)),
      ),
      child: Column(
        children: [
          Container(
            height: 64,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: AppTheme.borderColor))),
            alignment: Alignment.centerLeft,
            child: const Row(
              children: [
                Icon(LucideIcons.shieldCheck, color: AppTheme.accentColor, size: 28),
                SizedBox(width: 12),
                Text('Appzillon', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(12),
              children: [
                _buildGroupHeader('Risk Management', _riskOpen, () => setState(() => _riskOpen = !_riskOpen), LucideIcons.shieldCheck),
                if (_riskOpen) ...[
                   _buildNavItem(context, 'Risk Model', LucideIcons.zap, '/admin/cram', location == '/admin/cram'),
                   _buildNavItem(context, 'Ratings & Decisions', LucideIcons.scale, '/admin/cram/ratings', location == '/admin/cram/ratings'),
                   _buildNavItem(context, 'Geography Master', LucideIcons.globe, '/admin/cram/geography', location == '/admin/cram/geography'),
                   _buildNavItem(context, 'Product Master', LucideIcons.package, '/admin/cram/products', location == '/admin/cram/products'),
                   _buildNavItem(context, 'Override Rules', LucideIcons.shieldAlert, '/admin/cram/overrides', location == '/admin/cram/overrides'),
                   _buildNavItem(context, 'Workflows', LucideIcons.workflow, '/admin/cram/workflows', location == '/admin/cram/workflows'),
                   _buildNavItem(context, 'Role Management', LucideIcons.users, '/admin/cram/roles', location == '/admin/cram/roles'),
                   _buildNavItem(context, 'Customer Assessments', LucideIcons.fileSearch, '/admin/cram/assessments', location == '/admin/cram/assessments'),
                   _buildNavItem(context, 'Risk Simulator', LucideIcons.playCircle, '/admin/cram/simulator', location == '/admin/cram/simulator'),
                   _buildNavItem(context, 'Audit Logs', LucideIcons.history, '/admin/cram/audit-logs', location == '/admin/cram/audit-logs'),
                ],
                const SizedBox(height: 16),
                _buildGroupHeader('Transaction Analyzer', _analyticsOpen, () => setState(() => _analyticsOpen = !_analyticsOpen), LucideIcons.barChart3),
                if (_analyticsOpen) ...[
                  _buildNavItem(context, 'Transaction Overview', LucideIcons.layoutDashboard, '/transaction-analyzer', location == '/transaction-analyzer'),
                ],
                const SizedBox(height: 16),
                _buildGroupHeader('Feedback Survey', _feedbackOpen, () => setState(() => _feedbackOpen = !_feedbackOpen), LucideIcons.messageSquare),
                if (_feedbackOpen) ...[
                  _buildNavItem(context, 'Survey Analytics', LucideIcons.clipboardList, '/surveys', location == '/surveys'),
                ],
              ],
            ),
          ),
          _buildUserFooter(context),
        ],
      ),
    );
  }

  Widget _buildGroupHeader(String title, bool open, VoidCallback onTap, IconData icon) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Row(
          children: [
            Icon(icon, size: 18, color: AppTheme.primaryColor),
            const SizedBox(width: 12),
            Expanded(child: Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppTheme.primaryColor))),
            Icon(open ? LucideIcons.chevronDown : LucideIcons.chevronRight, size: 14, color: AppTheme.mutedTextColor),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, String title, IconData icon, String route, bool active) {
    return Container(
      margin: const EdgeInsets.only(top: 2, left: 16),
      child: InkWell(
        onTap: () => context.go(route),
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: active ? AppTheme.primaryColor.withValues(alpha: 0.05) : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
            border: active ? const Border(left: BorderSide(color: AppTheme.primaryColor, width: 3)) : null,
          ),
          child: Row(
            children: [
              Icon(icon, size: 16, color: active ? AppTheme.primaryColor : AppTheme.mutedTextColor),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: active ? FontWeight.bold : FontWeight.normal,
                    color: active ? AppTheme.primaryColor : AppTheme.mutedTextColor,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUserFooter(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(border: Border(top: BorderSide(color: AppTheme.borderColor))),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: const BoxDecoration(
              gradient: LinearGradient(colors: [AppTheme.accentColor, AppTheme.primaryColor]),
              shape: BoxShape.circle,
            ),
            alignment: Alignment.center,
            child: const Text('CK', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Chethan K', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
                Text('Product Director', style: TextStyle(fontSize: 10, color: AppTheme.mutedTextColor)),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(LucideIcons.logOut, size: 16, color: AppTheme.mutedTextColor),
            onPressed: () => context.go('/login'),
            visualDensity: VisualDensity.compact,
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 24),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.7),
        border: const Border(bottom: BorderSide(color: AppTheme.borderColor)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Align(
              alignment: Alignment.centerLeft,
              child: Container(
                constraints: const BoxConstraints(maxWidth: 400),
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.grey.withValues(alpha: 0.05),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppTheme.borderColor),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: const Row(
                  children: [
                    Icon(LucideIcons.search, size: 16, color: AppTheme.mutedTextColor),
                    SizedBox(width: 8),
                    Text('Search feedback, issues, applications...', style: TextStyle(color: AppTheme.mutedTextColor, fontSize: 13)),
                  ],
                ),
              ),
            ),
          ),
          IconButton(icon: const Icon(LucideIcons.sun, size: 20), onPressed: () {}),
          const SizedBox(width: 8),
          Stack(
            children: [
              IconButton(icon: const Icon(LucideIcons.bell, size: 20), onPressed: () {}),
              Positioned(
                right: 12,
                top: 12,
                child: Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppTheme.criticalColor, shape: BoxShape.circle)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class Panel extends StatelessWidget {
  final Widget child;
  final String title;
  final String? subtitle;
  final Widget? action;

  const Panel({
    super.key,
    required this.child,
    required this.title,
    this.subtitle,
    this.action,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.borderColor),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
                  if (subtitle != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 2.0),
                      child: Text(subtitle!, style: const TextStyle(fontSize: 12, color: AppTheme.mutedTextColor)),
                    ),
                ],
              ),
              if (action != null) action!,
            ],
          ),
          const SizedBox(height: 20),
          child,
        ],
      ),
    );
  }
}

class KpiCard extends StatelessWidget {
  final String title;
  final String value;
  final double delta;
  final IconData icon;
  final String tone;

  const KpiCard({
    super.key,
    required this.title,
    required this.value,
    required this.delta,
    required this.icon,
    this.tone = 'primary',
  });

  @override
  Widget build(BuildContext context) {
    final bool positive = delta >= 0;
    Color toneColor;
    switch (tone) {
      case 'success': toneColor = const Color(0xFF10B981); break;
      case 'warning': toneColor = const Color(0xFFF59E0B); break;
      case 'critical': toneColor = const Color(0xFFEF4444); break;
      case 'accent': toneColor = const Color(0xFF0D9488); break;
      case 'info': toneColor = Colors.blue; break;
      default: toneColor = const Color(0xFF0F172A);
    }

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title.toUpperCase(), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFF64748B), letterSpacing: 1.1)),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(color: toneColor.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
                child: Icon(icon, size: 18, color: toneColor),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          const SizedBox(height: 12),
          Row(
            children: [
              Icon(positive ? LucideIcons.arrowUpRight : LucideIcons.arrowDownRight, size: 14, color: positive ? const Color(0xFF10B981) : const Color(0xFFEF4444)),
              const SizedBox(width: 4),
              Text('${delta.abs()}%', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: positive ? const Color(0xFF10B981) : const Color(0xFFEF4444))),
              const SizedBox(width: 4),
              const Text('vs last week', style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
            ],
          ),
        ],
      ),
    );
  }
}

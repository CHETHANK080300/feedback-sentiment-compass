import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';
import '../utils/app_theme.dart';

class WorkflowsScreen extends StatelessWidget {
  const WorkflowsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Workflow Configuration',
      subtitle: 'Define Maker-Checker approval levels for CRAM policy changes',
      body: Panel(
        title: 'Approval Matrix',
        subtitle: 'Configure multi-level governance',
        child: Column(
          children: [
            _buildWorkflowCard('Weightage Changes', 3),
            const SizedBox(height: 16),
            _buildWorkflowCard('Threshold Changes', 2),
            const SizedBox(height: 16),
            _buildWorkflowCard('New Parameter Addition', 3),
          ],
        ),
      ),
    );
  }

  Widget _buildWorkflowCard(String title, int levels) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        border: Border.all(color: AppTheme.borderColor),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
              const Icon(LucideIcons.settings, size: 18, color: AppTheme.mutedTextColor),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: List.generate(levels, (i) {
              return Expanded(
                child: Row(
                  children: [
                    _buildStageCircle(i + 1, i == 0 ? 'MAKER' : i == levels - 1 ? 'APPROVER' : 'CHECKER'),
                    if (i < levels - 1)
                      const Expanded(child: Divider(indent: 8, endIndent: 8, color: AppTheme.borderColor)),
                  ],
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

  Widget _buildStageCircle(int number, String label) {
    return Column(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: const BoxDecoration(color: AppTheme.accentColor, shape: BoxShape.circle),
          child: Center(child: Text('$number', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.mutedTextColor)),
      ],
    );
  }
}

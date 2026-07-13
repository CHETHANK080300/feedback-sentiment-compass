import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../widgets/common_widgets.dart';

class SurveysScreen extends StatelessWidget {
  const SurveysScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DashboardLayout(
      title: 'Feedback Survey Dashboard',
      subtitle: 'Analyze customer sentiment and survey responses across segments',
      body: Column(
        children: [
          const Row(
            children: [
              Expanded(child: KpiCard(title: 'NPS Score', value: '72', delta: 5.0, icon: LucideIcons.smile, tone: 'success')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Response Rate', value: '18.5%', delta: 1.2, icon: LucideIcons.mail, tone: 'primary')),
              SizedBox(width: 16),
              Expanded(child: KpiCard(title: 'Avg Rating', value: '4.8/5', delta: 0.1, icon: LucideIcons.star, tone: 'warning')),
            ],
          ),
          const SizedBox(height: 24),
          Panel(
            title: 'Recent Feedback',
            subtitle: 'Direct customer insights',
            child: ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 3,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, index) {
                final feedback = [
                  {'name': 'Ahmad A.', 'comment': 'The mobile onboarding was seamless.', 'score': 5},
                  {'name': 'Elena R.', 'comment': 'Wait time at branch was longer than expected.', 'score': 3},
                  {'name': 'Samuel K.', 'comment': 'Excellent customer support on the chat app.', 'score': 5},
                ][index];
                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(feedback['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: Text(feedback['comment'] as String, style: const TextStyle(color: Color(0xFF64748B))),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: List.generate(5, (i) => Icon(
                      LucideIcons.star,
                      size: 14,
                      color: i < (feedback['score'] as int) ? Colors.amber : Colors.grey.shade300
                    )),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

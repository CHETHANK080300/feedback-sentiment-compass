import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../utils/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _loading = false;

  void _handleLogin() {
    setState(() => _loading = true);
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) context.go('/admin/cram');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundColor,
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: 400,
            margin: const EdgeInsets.symmetric(horizontal: 20),
            padding: const EdgeInsets.all(40),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.borderColor),
              boxShadow: [
                BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 24, offset: const Offset(0, 8)),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(LucideIcons.shieldCheck, color: AppTheme.primaryColor, size: 40),
                    SizedBox(width: 12),
                    Text('Appzillon', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
                  ],
                ),
                const SizedBox(height: 32),
                const Text('Welcome Back', textAlign: TextAlign.center, style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: AppTheme.primaryColor, letterSpacing: -0.5)),
                const Text('Sign in to your Appzillon CXIP dashboard', textAlign: TextAlign.center, style: TextStyle(color: AppTheme.mutedTextColor, fontSize: 14)),
                const SizedBox(height: 40),
                _buildInput(LucideIcons.mail, 'Email address', 'admin@i-exceed.com'),
                const SizedBox(height: 16),
                _buildInput(LucideIcons.lock, 'Password', '••••••••', obscure: true),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      child: Row(
                        children: [
                          Checkbox(value: true, onChanged: (_) {}, visualDensity: VisualDensity.compact),
                          const Flexible(child: Text('Remember me', style: TextStyle(fontSize: 12, color: AppTheme.mutedTextColor))),
                        ],
                      ),
                    ),
                    const Text('Forgot password?', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primaryColor)),
                  ],
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    onPressed: _loading ? null : _handleLogin,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primaryColor,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      elevation: 0,
                    ),
                    child: _loading
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Sign in', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                            SizedBox(width: 8),
                            Icon(LucideIcons.arrowRight, size: 18),
                          ],
                        ),
                  ),
                ),
                const SizedBox(height: 24),
                const Text('Enterprise Security Enabled · SSO Available', style: TextStyle(fontSize: 11, color: AppTheme.mutedTextColor)),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInput(IconData icon, String hint, String initial, {bool obscure = false}) {
    return TextFormField(
      initialValue: initial,
      obscureText: obscure,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: Icon(icon, size: 18, color: AppTheme.mutedTextColor),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
    );
  }
}

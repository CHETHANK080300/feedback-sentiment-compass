import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const primaryColor = Color(0xFF0F172A); // slate-900
  static const accentColor = Color(0xFF0D9488); // teal-600
  static const backgroundColor = Color(0xFFF8FAFC); // slate-50
  static const surfaceColor = Colors.white;
  static const borderColor = Color(0xFFE2E8F0); // slate-200
  static const textColor = Color(0xFF1E293B); // slate-800
  static const mutedTextColor = Color(0xFF64748B); // slate-500

  static const successColor = Color(0xFF10B981);
  static const warningColor = Color(0xFFF59E0B);
  static const criticalColor = Color(0xFFEF4444);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryColor,
        primary: primaryColor,
        secondary: accentColor,
        surface: surfaceColor,
        background: backgroundColor,
        error: criticalColor,
      ),
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.plusJakartaSans(
          fontWeight: FontWeight.bold,
          color: primaryColor,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontWeight: FontWeight.bold,
          color: primaryColor,
        ),
      ),
      cardTheme: CardThemeData(
        color: surfaceColor,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: borderColor),
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: borderColor,
        thickness: 1,
      ),
    );
  }
}

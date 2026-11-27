import 'package:flutter/material.dart';

/// Design tokens aligned with MangaVerse web CSS variables.
class AppTheme {
  static const Color bgPrimary = Color(0xFF0D0D1A);
  static const Color bgCard = Color(0xFF1A1A2E);
  static const Color bgElevated = Color(0xFF252545);
  static const Color accent = Color(0xFF6C63FF);
  static const Color cyan = Color(0xFF00F2FE);
  static const Color textPrimary = Color(0xFFE2E8F0);
  static const Color textSecondary = Color(0xFF94A3B8);

  static ThemeData darkTheme() {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgPrimary,
      cardColor: bgCard,
      colorScheme: const ColorScheme.dark(
        primary: accent,
        secondary: cyan,
        surface: bgCard,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: bgPrimary,
        foregroundColor: textPrimary,
        elevation: 0,
      ),
      useMaterial3: true,
    );
  }
}

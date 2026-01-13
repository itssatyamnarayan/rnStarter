/**
 * Typography / Fonts Configuration
 * 
 * Defines typography scales and font configurations.
 * Replace font family values with your custom fonts if needed.
 * 
 * To use custom fonts:
 * 1. Add font files to src/assets/fonts/
 * 2. Link fonts (react-native.config.js for CLI or app.json for Expo)
 * 3. Update fontFamily values below
 */

import { Platform, TextStyle } from 'react-native';

// ============================================================================
// Font Families
// ============================================================================

/**
 * Font family configuration
 * Replace with your custom font names after linking
 */
export const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
} as const;

// ============================================================================
// Font Sizes
// ============================================================================

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
} as const;

// ============================================================================
// Line Heights
// ============================================================================

export const lineHeight = {
  xs: 14,
  sm: 16,
  md: 20,
  base: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
  '5xl': 48,
} as const;

// ============================================================================
// Font Weights (for StyleSheet)
// ============================================================================

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

// ============================================================================
// Typography Presets
// ============================================================================

export const typography = {
  // Headings
  h1: {
    fontSize: fontSize['4xl'],
    lineHeight: lineHeight['4xl'],
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontSize: fontSize['2xl'],
    lineHeight: lineHeight['2xl'],
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    fontWeight: fontWeight.semiBold,
  },
  h4: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semiBold,
  },

  // Body
  body: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.regular,
  },
  bodySmall: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontWeight: fontWeight.regular,
  },

  // Other
  caption: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.regular,
  },
  label: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontWeight: fontWeight.medium,
  },
  button: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semiBold,
  },
} as const;

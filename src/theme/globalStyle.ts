/**
 * Global Styles
 * Reusable style patterns and utility styles for consistent UI across the app
 * 
 * Usage:
 * import { globalStyles } from '@/theme';
 * 
 * <View style={globalStyles.container}>
 *   <Text style={globalStyles.title}>Hello</Text>
 * </View>
 */

import { StyleSheet, Platform, StatusBar } from 'react-native';
import { spacing } from './spacing';
import { light } from './colors/light';
import { typography } from './fonts';

// ============================================================================
// Common Values
// ============================================================================

export const SCREEN_HORIZONTAL_PADDING = spacing.md;
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOW = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
  }),
  xl: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
  }),
} as const;

// ============================================================================
// Global Styles
// ============================================================================

export const globalStyles = StyleSheet.create({
  // Layout
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },

  // Containers
  container: {
    flex: 1,
    backgroundColor: light.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: light.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: light.background,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: light.background,
  },

  // Flex Direction
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },

  // Alignment
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },

  // Wrap
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexNoWrap: {
    flexWrap: 'nowrap',
  },

  // Self alignment
  selfCenter: {
    alignSelf: 'center',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },

  // Position
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Common card style
  card: {
    backgroundColor: light.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: spacing.md,
    ...SHADOW.md,
  },

  // Divider
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: light.textSecondary,
    opacity: 0.2,
  },
  dividerVertical: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: light.textSecondary,
    opacity: 0.2,
  },

  // Text alignment
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },

  // Typography shortcuts
  title: {
    ...typography.h2,
    color: light.textPrimary,
  },
  subtitle: {
    ...typography.h4,
    color: light.textPrimary,
  },
  body: {
    ...typography.body,
    color: light.textPrimary,
  },
  caption: {
    ...typography.caption,
    color: light.textSecondary,
  },

  // Full width/height
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },

  // Overflow
  overflowHidden: {
    overflow: 'hidden',
  },
  overflowVisible: {
    overflow: 'visible',
  },

  // Z-index
  zIndex1: { zIndex: 1 },
  zIndex10: { zIndex: 10 },
  zIndex100: { zIndex: 100 },
});

// ============================================================================
// Spacing Utilities Generator
// ============================================================================

type SpacingKey = keyof typeof spacing;

export const createSpacingStyles = () => {
  const styles: Record<string, object> = {};

  (Object.keys(spacing) as SpacingKey[]).forEach((key) => {
    const value = spacing[key];

    // Margin
    styles[`m${key}`] = { margin: value };
    styles[`mt${key}`] = { marginTop: value };
    styles[`mb${key}`] = { marginBottom: value };
    styles[`ml${key}`] = { marginLeft: value };
    styles[`mr${key}`] = { marginRight: value };
    styles[`mx${key}`] = { marginHorizontal: value };
    styles[`my${key}`] = { marginVertical: value };

    // Padding
    styles[`p${key}`] = { padding: value };
    styles[`pt${key}`] = { paddingTop: value };
    styles[`pb${key}`] = { paddingBottom: value };
    styles[`pl${key}`] = { paddingLeft: value };
    styles[`pr${key}`] = { paddingRight: value };
    styles[`px${key}`] = { paddingHorizontal: value };
    styles[`py${key}`] = { paddingVertical: value };

    // Gap
    styles[`gap${key}`] = { gap: value };
    styles[`rowGap${key}`] = { rowGap: value };
    styles[`columnGap${key}`] = { columnGap: value };
  });

  return StyleSheet.create(styles as Record<string, object>);
};

export const spacingStyles = createSpacingStyles();

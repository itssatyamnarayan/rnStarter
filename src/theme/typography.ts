import { FontFamily } from './fonts';

export type FontWeight = '200' | '300' | '400' | '500' | '600' | '700' | '800';

export const FONT_MAP: Record<FontWeight, string> = {
  '200': FontFamily.InterTightExtraLight,
  '300': FontFamily.InterTightLight,
  '400': FontFamily.InterTightRegular,
  '500': FontFamily.InterTightMedium,
  '600': FontFamily.InterTightSemiBold,
  '700': FontFamily.InterTightBold,
  '800': FontFamily.InterTightExtraBold,
};

export type TextVariant = 'body' | 'caption' | 'title' | 'label';

export const TYPOGRAPHY = {
  body: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
  title: { fontSize: 20, lineHeight: 28 },
  label: { fontSize: 16, lineHeight: 22 },
} as const;

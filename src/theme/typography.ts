import { normalize } from '@/utils/normalize';
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

export type TextVariant = 'button' | 'label' | 'body' | 'title' | 'header';

export const TYPOGRAPHY = {
  button: {
    fontSize: normalize(16),
    textAlign: 'center',
  },
  label: {
    fontSize: normalize(14),
    marginBottom: 8,
  },
  body: {
    fontSize: normalize(16),
    marginBottom: 8,
  },
  title: {
    fontSize: normalize(20),
    marginBottom: 8,
  },
  header: {
    fontSize: normalize(24),
    marginBottom: 24,
  },
} as const;

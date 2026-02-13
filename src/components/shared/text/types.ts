import { FontWeight, TextVariant } from '@/theme/typography';
import { ReactNode } from 'react';
import { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';

export type EllipsizeMode = TextProps['ellipsizeMode'];
export type LineBreakMode = TextProps['lineBreakMode'];
export type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';

export interface CustomTextProps {
  weight?: FontWeight;
  variant?: TextVariant;
  textColor?: string;
  textAlign?: TextAlignType;
  style?: StyleProp<TextStyle>;
  ellipsizeMode?: EllipsizeMode;
  numberOfLines?: number;
  lineBreakMode?: LineBreakMode;
  children: ReactNode;
  onPress?: () => void;
  restTextProps?: Omit<
    TextProps,
    | 'style'
    | 'onPress'
    | 'onPressIn'
    | 'onPressOut'
    | 'children'
    | 'ellipsizeMode'
    | 'numberOfLines'
    | 'lineBreakMode'
    | 'allowFontScaling'
  >;
}

export interface ShimmerTextProps extends CustomTextProps {
  isLoading?: boolean;
  shimmerWidth?: number;
  shimmerHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

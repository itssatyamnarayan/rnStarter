import { useAppTheme } from '@/context/ThemeContext';
import {
  FONT_MAP,
  FontWeight,
  TextVariant,
  TYPOGRAPHY,
} from '@/theme/typography';
import React, { memo, ReactNode, useState } from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native';

type EllipsizeMode = TextProps['ellipsizeMode'];
type LineBreakMode = TextProps['lineBreakMode'];

type textAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
interface CustomTextProps {
  weight?: FontWeight;
  variant?: TextVariant;
  textColor?: string;
  textAlign?: textAlign;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  ellipsizeMode?: EllipsizeMode;
  numberOfLines?: number;
  lineBreakMode?: LineBreakMode;
  children: ReactNode;
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

const CustomText = ({
  weight = '400',
  variant = 'body',
  textColor,
  style,
  textAlign,
  onPress,
  ellipsizeMode,
  numberOfLines,
  lineBreakMode,
  children,
  ...restTextProps
}: CustomTextProps) => {
  const { color } = useAppTheme();
  const [pressed, setPressed] = useState<boolean>(false);
  const opacity = pressed ? 0.8 : 1;
  const isPressable = typeof onPress === 'function';

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);
  return (
    <Text
      allowFontScaling={false}
      onPressIn={isPressable ? handlePressIn : undefined}
      onPressOut={isPressable ? handlePressOut : undefined}
      style={[
        styles.base,
        TYPOGRAPHY[variant],
        {
          fontFamily: FONT_MAP[weight],
          opacity: opacity,
          color: textColor || color.text_primary,
          textAlign: textAlign,
        },
        style,
      ]}
      children={children}
      onPress={isPressable ? onPress : undefined}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      lineBreakMode={lineBreakMode}
      {...restTextProps}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default memo(CustomText);

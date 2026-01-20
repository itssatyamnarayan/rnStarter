import { useAppTheme } from '@/context/ThemeContext';
import {
  FONT_MAP,
  FontWeight,
  TextVariant,
  TYPOGRAPHY,
} from '@/theme/typography';
import React, { memo, useState } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

type textAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  variant?: TextVariant;
  textColor?: string;
  textAlign?: textAlign;
}

const CustomText = ({
  weight = '400',
  variant = 'body',
  textColor,
  style,
  textAlign,
  ...rest
}: CustomTextProps) => {
  const { color } = useAppTheme();
  const [pressed, setPressed] = useState<boolean>(false);
  const opacity = pressed ? 0.8 : 1;
  const isPressable = typeof rest.onPress === 'function';

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);
  return (
    <Text
      {...rest}
      allowFontScaling={false}
      onPressIn={isPressable ? handlePressIn : undefined}
      onPressOut={isPressable ? handlePressOut : undefined}
      style={[
        styles.base,
        TYPOGRAPHY[variant],
        {
          fontFamily: FONT_MAP[weight],
          opacity: opacity,
          color: textColor || color.textPrimary,
          textAlign: textAlign,
        },
        style,
      ]}
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

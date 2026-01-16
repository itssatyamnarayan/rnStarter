import { palette } from '@/theme';
import {
  FONT_MAP,
  FontWeight,
  TextVariant,
  TYPOGRAPHY,
} from '@/theme/typography';
import React, { memo } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  variant?: TextVariant;
  color?: string;
}

const CustomText = ({
  weight = '400',
  variant = 'body',
  color = palette.black,
  style,
  ...rest
}: CustomTextProps) => {
  return (
    <Text
      {...rest}
      allowFontScaling={false}
      style={[
        styles.base,
        TYPOGRAPHY[variant],
        { fontFamily: FONT_MAP[weight], color },
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

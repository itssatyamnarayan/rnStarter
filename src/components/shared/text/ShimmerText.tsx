import { useAppTheme } from '@/context/ThemeContext';
import {
  FONT_MAP,
  FontWeight,
  TextVariant,
  TYPOGRAPHY,
} from '@/theme/typography';
import React, { memo, useState, useMemo, ReactNode } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
} from 'react-native';
import BaseSkelton from '../skelton/BaseSkelton';
import { textLayout } from '../skelton/layouts/text.layout';

type EllipsizeMode = TextProps['ellipsizeMode'];
type LineBreakMode = TextProps['lineBreakMode'];
type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';

interface CustomTextProps {
  weight?: FontWeight;
  variant?: TextVariant;
  textColor?: string;
  textAlign?: TextAlignType;
  isLoading?: boolean;
  shimmerWidth?: number;
  shimmerHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
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

const ShimmerText = ({
  weight = '400',
  variant = 'body',
  textColor,
  style,
  textAlign,
  isLoading = false,
  shimmerWidth = 100,
  shimmerHeight = 40,
  containerStyle,
  onPress,
  children,
  ellipsizeMode,
  numberOfLines,
  lineBreakMode,
}: CustomTextProps) => {
  const { color } = useAppTheme();
  const [pressed, setPressed] = useState<boolean>(false);
  const opacity = pressed ? 0.8 : 1;
  const isPressable = typeof onPress === 'function';

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  // Get the line height from typography variant
  const typographyStyle = TYPOGRAPHY[variant];

  // Calculate container alignment based on textAlign
  const containerAlignStyle = useMemo((): ViewStyle => {
    switch (textAlign) {
      case 'center':
        return { alignItems: 'center' };
      case 'right':
        return { alignItems: 'flex-end' };
      default:
        return { alignItems: 'flex-start' };
    }
  }, [textAlign]);

  // Extract margin/padding from style if provided
  const flatStyle = StyleSheet.flatten(style) || {};
  const {
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    alignSelf,
    flex,
    flexGrow,
    flexShrink,
    width,
    ...textOnlyStyle
  } = flatStyle;

  // Styles that affect positioning (should go to container when loading)
  const positioningStyle: ViewStyle = {
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    alignSelf,
    flex,
    flexGrow,
    flexShrink,
    width,
  };

  // Clean undefined values
  Object.keys(positioningStyle).forEach(key => {
    if (positioningStyle[key as keyof ViewStyle] === undefined) {
      delete positioningStyle[key as keyof ViewStyle];
    }
  });

  return (
    <View style={[containerAlignStyle, positioningStyle, containerStyle]}>
      <BaseSkelton
        isLoading={isLoading}
        layout={textLayout({
          width: shimmerWidth,
          height: shimmerHeight,
        })}
      >
        <Text
          allowFontScaling={false}
          onPressIn={isPressable ? handlePressIn : undefined}
          onPressOut={isPressable ? handlePressOut : undefined}
          style={[
            styles.base,
            typographyStyle,
            {
              fontFamily: FONT_MAP[weight],
              opacity: opacity,
              color: textColor || color.text_primary,
              textAlign: textAlign,
            },
            textOnlyStyle,
          ]}
          onPress={isPressable ? onPress : undefined}
          children={children}
          ellipsizeMode={ellipsizeMode}
          numberOfLines={numberOfLines}
          lineBreakMode={lineBreakMode}
        />
      </BaseSkelton>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default memo(ShimmerText);

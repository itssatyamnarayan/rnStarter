import { useAppTheme } from '@/context/ThemeContext';
import { normalize } from '@/utils/normalize';
import React, { memo, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlexAlignType,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ToggleSize = 'sm' | 'md';

type ToggleStyles = {
  wrapper?: ViewStyle;
  track?: ViewStyle;
  thumb?: ViewStyle;
  label?: TextStyle;
};

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;

  disabled?: boolean;
  size?: ToggleSize;

  showLabel?: boolean;
  onLabel?: string;
  offLabel?: string;

  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;

  styles?: ToggleStyles;
  alignItems?: FlexAlignType;
};

const SIZE_MAP = {
  sm: {
    width: 52,
    height: 26,
    thumb: 22,
    padding: 2,
    labelSize: normalize(9),
  },
  md: {
    width: 60,
    height: 32,
    thumb: 28,
    padding: 2,
    labelSize: normalize(11),
  },
} as const;

const Toggle = ({
  value,
  onChange,
  disabled = false,
  size = 'md',

  showLabel = true,
  onLabel = 'ON',
  offLabel = 'OFF',

  activeColor,
  inactiveColor,
  thumbColor,
  alignItems = 'flex-end',

  styles: styleOverrides,
}: ToggleProps) => {
  const { width, height, thumb, padding, labelSize } = SIZE_MAP[size];
  const { color } = useAppTheme();
  const labelJustify = value ? 'flex-start' : 'flex-end';
  const thumbCont = {
    width: thumb,
    height: thumb,
    borderRadius: thumb / 2,
    backgroundColor: thumbColor || color.background_primary,
    right: size === 'sm' ? 28 : 30,
  };
  const pressableOpacity = disabled ? 0.6 : 1.0;
  activeColor = activeColor || color.primary;
  inactiveColor = inactiveColor || color.placeholder;

  const travelDistance = width - thumb - padding * 2;

  const translateX = useSharedValue(value ? travelDistance : 0);

  useEffect(() => {
    translateX.value = withTiming(value ? travelDistance : 0, {
      duration: 180,
    });
  }, [value, travelDistance, translateX]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      style={[
        { opacity: pressableOpacity, alignItems },
        styleOverrides?.wrapper,
      ]}
      disabled={disabled}
    >
      {/* Track */}
      <View
        style={[
          styles.track,
          {
            width,
            height,
            borderRadius: height / 2,
            padding,
            backgroundColor: value ? activeColor : inactiveColor,
          },
          styleOverrides?.track,
        ]}
      >
        {/* ON / OFF Label (SAFE, CONDITIONAL) */}
        {showLabel && (
          <View
            pointerEvents="none"
            style={[
              styles.labelContainer,
              {
                justifyContent: labelJustify,
              },
              styles.labelContainer,
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={[
                styles.label,
                { fontSize: labelSize, color: color.text_default },
                styleOverrides?.label,
              ]}
            >
              {value ? onLabel : offLabel}
            </Text>
          </View>
        )}

        {/* Thumb */}
        <Animated.View
          style={[styles.thumb, thumbCont, thumbStyle, styleOverrides?.thumb]}
        />
      </View>
    </Pressable>
  );
};

export default memo(Toggle);

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    elevation: 2,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    left: 6,
    right: 6,
  },
  label: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

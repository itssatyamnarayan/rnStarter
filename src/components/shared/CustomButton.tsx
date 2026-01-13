import Haptics from '@mhpdev/react-native-haptics';
import React, { useRef, useState, useMemo, memo } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
  GestureResponderEvent,
} from 'react-native';

type Variant = 'primary' | 'outline' | 'danger' | 'ghost';
type Size = 'small' | 'medium' | 'large';
type Align = 'left' | 'center' | 'right';
type HapticType = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';

interface AppButtonProps {
  title?: string;
  onPress?: () => Promise<void> | void;
  onLongPress?: () => void;

  variant?: Variant;
  size?: Size;

  disabled?: boolean;
  loading?: boolean;

  fullWidth?: boolean;
  align?: Align;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  haptic?: HapticType;
  rippleColor?: string;

  containerStyle?: any;
  textStyle?: any;

  children?: React.ReactNode;
}

const SIZE_MAP = {
  small: { height: 36, padding: 12, font: 14 },
  medium: { height: 48, padding: 16, font: 16 },
  large: { height: 56, padding: 20, font: 18 },
};

const COLORS = {
  primary: '#3478f6',
  danger: '#dc3545',
};

const CustomButton = ({
  title,
  onPress,
  onLongPress,

  variant = 'primary',
  size = 'medium',

  disabled = false,
  loading = false,

  fullWidth = false,
  align = 'center',

  leftIcon,
  rightIcon,

  haptic = 'light',
  rippleColor = 'red',

  containerStyle,
  textStyle,

  children,
}: AppButtonProps) => {
  /* 🔒 PRESS LOCK */
  const pressLock = useRef(false);

  /* 🌊 RIPPLE */
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const rippleX = useRef(new Animated.Value(0)).current;
  const rippleY = useRef(new Animated.Value(0)).current;

  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== layout.width || height !== layout.height) {
      setLayout({ width, height });
    }
  };

  const startRipple = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    rippleX.setValue(locationX);
    rippleY.setValue(locationY);

    rippleScale.setValue(0);
    rippleOpacity.setValue(0.3);

    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = async () => {
    if (pressLock.current || disabled || loading) return;

    pressLock.current = true;
    try {
      await onPress?.();
    } finally {
      pressLock.current = false;
    }
  };

  const triggerHaptic = () => {
    if (!haptic) return;
    Haptics.impact(haptic);
  };

  /* 🎨 STYLES */
  const sizeStyle = SIZE_MAP[size];

  const backgroundColor = useMemo(() => {
    if (variant === 'danger') return COLORS.danger;
    if (variant === 'outline' || variant === 'ghost') return 'transparent';
    return COLORS.primary;
  }, [variant]);

  const textColor =
    variant === 'outline' || variant === 'ghost' ? COLORS.primary : '#fff';

  const borderStyle =
    variant === 'outline'
      ? { borderWidth: 1, borderColor: COLORS.primary }
      : undefined;

  const alignSelf =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';

  const rippleSize = Math.max(layout.width, layout.height) * 2;

  return (
    <Pressable
      onLayout={onLayout}
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={e => {
        if (!disabled && !loading) {
          triggerHaptic();
          startRipple(e);
        }
      }}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      pointerEvents={pressLock.current ? 'none' : 'auto'}
      style={[
        styles.base,
        {
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.padding,
          borderRadius: sizeStyle.height / 2,
          backgroundColor,
          opacity: disabled ? 0.5 : 1,
          alignSelf,
          width: fullWidth ? '100%' : undefined,
        },
        borderStyle,
        containerStyle,
      ]}
    >
      {/* 🌊 RIPPLE */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ripple,
          {
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            backgroundColor: rippleColor,
            opacity: rippleOpacity,
            transform: [
              { translateX: Animated.subtract(rippleX, rippleSize / 2) },
              { translateY: Animated.subtract(rippleY, rippleSize / 2) },
              { scale: rippleScale },
            ],
          },
        ]}
      />

      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          {title && (
            <Text
              style={[
                {
                  color: textColor,
                  fontSize: sizeStyle.font,
                  fontWeight: '600',
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}

          {children}
        </>
      )}
    </Pressable>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
});

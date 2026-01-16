import Haptics from '@mhpdev/react-native-haptics';
import React, { memo, useRef, useCallback, ReactNode } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';

/* ───────────────── Types ───────────────── */

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

  align?: Align;
  fullWidth?: boolean;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  haptic?: HapticType;

  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  backgroundColor?: string;
  borderRadius?: number;

  children?: ReactNode;
}

const CustomButton = ({
  title,
  onPress,
  onLongPress,

  variant = 'primary',
  size = 'medium',

  disabled = false,
  loading = false,

  align = 'center',
  fullWidth = false,

  leftIcon,
  rightIcon,

  haptic = 'light',

  backgroundColor,
  borderRadius = 16,

  containerStyle,
  textStyle,
  children,
}: AppButtonProps) => {
  const pressLock = useRef(false);

  const handlePress = useCallback(async () => {
    if (pressLock.current || disabled || loading) return;

    pressLock.current = true;
    Haptics.impact(haptic);

    try {
      await onPress?.();
    } finally {
      pressLock.current = false;
    }
  }, [disabled, loading, onPress, haptic]);

  const alignSelf: ViewStyle['alignSelf'] =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      pointerEvents={pressLock.current ? 'none' : 'auto'}
      style={({ pressed }) => [
        buttonStyles.base,
        buttonStyles[size],
        buttonStyles[variant],
        fullWidth && buttonStyles.fullWidth,
        disabled && buttonStyles.disabled,
        pressed && Platform.OS === 'ios' && { opacity: 0.7 }, // ✅ FIXED
        { alignSelf },
        backgroundColor && { backgroundColor },
        { borderRadius },
        containerStyle,
      ]}
      android_ripple={{
        color: 'rgba(62, 218, 143, 0.3)',
        borderless: true,
        foreground: true,
      }}
    >
      {/* Content */}
      <View style={buttonStyles.content}>
        {leftIcon && <View style={buttonStyles.iconLeft}>{leftIcon}</View>}

        {title && (
          <Text
            style={[
              textStyles.base,
              textStyles[size],
              textStyles[variant],
              loading && buttonStyles.hidden,
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}

        {rightIcon && <View style={buttonStyles.iconRight}>{rightIcon}</View>}

        {children}
      </View>

      {/* Loader */}
      {loading && (
        <View style={buttonStyles.loader}>
          <ActivityIndicator color={textStyles[variant].color} />
        </View>
      )}
    </Pressable>
  );
};

export default memo(CustomButton);

const buttonStyles = StyleSheet.create({
  /* Base */
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* Sizes */
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 52,
  },

  /* Variants */
  primary: {
    backgroundColor: '#3478f6',
  },
  danger: {
    backgroundColor: '#dc3545',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3478f6',
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  /* States */
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  /* Content */
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },

  /* Loader */
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
  },
});

const textStyles = StyleSheet.create({
  base: {},
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },

  primary: {
    color: '#fff',
  },
  danger: {
    color: '#fff',
  },
  outline: {
    color: '#3478f6',
  },
  ghost: {
    color: '#3478f6',
  },
});

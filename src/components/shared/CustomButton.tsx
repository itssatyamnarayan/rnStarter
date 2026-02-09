import { useAppTheme } from '@/context/ThemeContext';
import Haptics from '@mhpdev/react-native-haptics';
import React, { memo, useRef, useCallback, ReactNode, useMemo } from 'react';
import {
  Pressable,
  View,
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import CustomText from './CustomText';
import { normalize } from '@/utils/normalize';
import { isIOS } from '@/constants/device';

/* ───────────────── Types ───────────────── */

type Variant = 'primary' | 'outline' | 'danger' | 'ghost';
type Align = 'left' | 'center' | 'right';
type HapticType = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';

interface AppButtonProps {
  title?: string;
  onPress?: () => Promise<void> | void;
  onLongPress?: () => void;

  variant?: Variant;

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
  const { color } = useAppTheme();

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

  const variantButtonStyle = useMemo(
    () => ({
      primary: { backgroundColor: color.primary },
      danger: { backgroundColor: color.danger },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: color.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    }),
    [color],
  );

  const variantTextStyle = useMemo(
    () => ({
      primary: { color: color.text_default },
      danger: { color: color.text_default },
      outline: { color: color.primary },
      ghost: { color: color.primary },
    }),
    [color],
  );

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
        variantButtonStyle[variant],
        fullWidth && buttonStyles.fullWidth,
        disabled && buttonStyles.disabled,
        pressed && isIOS && { opacity: 0.7 },
        { alignSelf },
        backgroundColor && { backgroundColor },
        { borderRadius },
        containerStyle,
      ]}
      android_ripple={{
        color: 'rgba(255,255,255,0.2)',
        borderless: true,
        foreground: true,
      }}
    >
      {leftIcon && (
        <View style={fullWidth && buttonStyles.leftIcon}>{leftIcon}</View>
      )}
      {/* Content */}
      <View style={buttonStyles.content}>
        {title ? (
          <CustomText
            style={[
              loading && buttonStyles.hidden,
              variantTextStyle[variant],
              textStyle,
            ]}
            variant="button"
            weight="500"
          >
            {title}
          </CustomText>
        ) : (
          children
        )}
      </View>
      {rightIcon && (
        <View style={fullWidth && buttonStyles.rightIcon}>{rightIcon}</View>
      )}

      {/* Loader */}
      {loading && (
        <View style={buttonStyles.loader}>
          <ActivityIndicator color={variantTextStyle[variant].color} />
        </View>
      )}
    </Pressable>
  );
};

export default memo(CustomButton);

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 12,
    minHeight: normalize(46),
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
  },
  leftIcon: { position: 'absolute', left: 14 },
  rightIcon: { position: 'absolute', right: 14 },
});

import { useAppTheme } from '@/context/ThemeContext';
import { FontFamily } from '@/theme';
import React, { forwardRef, memo, ReactNode, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Icon from '../../Icon';
import { normalize } from '@/utils/normalize';

type InputValue = string | number;

type RHFTextField<T = InputValue> = {
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
};

type FormModeProps<T = InputValue> = {
  field: RHFTextField<T>;
  value?: never;
  onChangeText?: never;
};

type IndependentModeProps<T = InputValue> = {
  field?: never;
  value: T;
  onChangeText: (value: T) => void;
};

interface CommonProps {
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputProps?: TextInputProps;
  isPassword?: boolean;
}

export type TextInputVariantProps<T = InputValue> =
  | (FormModeProps<T> & CommonProps)
  | (IndependentModeProps<T> & CommonProps);

const TextInputVariant = forwardRef<TextInput, TextInputVariantProps>(
  (
    {
      field,
      value,
      onChangeText,
      disabled,
      containerStyle,
      inputContainerStyle,
      inputStyle,
      leftIcon,
      inputProps,
      rightIcon,
      isPassword = false,
    },
    ref,
  ) => {
    const resolvedValue = field ? field.value : value;
    const handleChange = field ? field.onChange : onChangeText;
    const handleBlur = field?.onBlur;
    const { color } = useAppTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handlePasswordVisible = () => {
      setIsPasswordVisible(prev => !prev);
    };

    return (
      <View style={containerStyle}>
        <View
          style={[
            styles.wrapper,
            { backgroundColor: color.background, borderColor: color.border },
            inputContainerStyle,
          ]}
        >
          {leftIcon && leftIcon}

          <TextInput
            ref={ref}
            value={String(resolvedValue ?? '')}
            onChangeText={text =>
              handleChange?.(
                typeof resolvedValue === 'number' ? Number(text) : text,
              )
            }
            onBlur={handleBlur}
            editable={!disabled}
            style={[styles.input, { color: color.textPrimary }, inputStyle]}
            returnKeyType="done"
            placeholderTextColor={color.placeholder}
            secureTextEntry={isPasswordVisible}
            {...inputProps}
          />

          {isPassword &&
            (isPasswordVisible ? (
              <Icon name="eye" size={24} onPress={handlePasswordVisible} />
            ) : (
              <Icon name="eyeOff" size={24} onPress={handlePasswordVisible} />
            ))}

          {rightIcon && rightIcon}
        </View>
      </View>
    );
  },
);

export default memo(TextInputVariant);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: normalize(48),
  },
  input: {
    flex: 1,
    fontSize: normalize(16),
    fontFamily: FontFamily.InterTightRegular,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
});

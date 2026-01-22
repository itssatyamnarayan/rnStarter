import { useAppTheme } from '@/context/ThemeContext';
import { FontFamily } from '@/theme';
import React, { forwardRef, memo, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from '../../Icon';
import { normalize } from '@/utils/normalize';
import { TextInputVariantProps } from '../type';

type InputValue = string | number;

type RHFTextField<T = InputValue> = {
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
};

type TextFormMode<T> = {
  mode: 'form';
  field: RHFTextField<T>;
};

type TextIndependentMode<T> = {
  mode: 'standalone';
  value: T;
  onChangeText: (value: T) => void;
};
type TextInputVisualProps<T = InputValue> =
  | (TextFormMode<T> & TextInputVariantProps)
  | (TextIndependentMode<T> & TextInputVariantProps);

const TextInputVariant = forwardRef<TextInput, TextInputVisualProps>(
  (props, ref) => {
    const {
      mode,
      disabled,
      inputContainerStyle,
      inputStyle,
      leftIcon,
      textInputProps,
      rightIcon,
      placeholder,
      isPassword = false,
    } = props;

    const { color } = useAppTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePassword = () => {
      setIsPasswordVisible(prev => !prev);
    };

    const resolvedValue = mode === 'form' ? props.field.value : props.value;

    const handleChange =
      mode === 'form' ? props.field.onChange : props.onChangeText;

    const handleBlur = mode === 'form' ? props.field.onBlur : undefined;

    return (
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: color.background_secondary,
            borderColor: color.border,
          },
          inputContainerStyle,
        ]}
      >
        {leftIcon}

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
          style={[styles.input, { color: color.text_primary }, inputStyle]}
          returnKeyType="done"
          placeholderTextColor={color.placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholder={placeholder}
          cursorColor={color.text_primary}
          allowFontScaling={false}
          {...textInputProps}
        />

        {isPassword && (
          <Icon
            name={isPasswordVisible ? 'eye' : 'eyeClose'}
            size={22}
            onPress={togglePassword}
          />
        )}

        {rightIcon}
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

import React, { forwardRef, memo, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

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
  inputProps?: TextInputProps;
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
    },
    ref,
  ) => {
    const resolvedValue = field ? field.value : value;
    const handleChange = field ? field.onChange : onChangeText;
    const handleBlur = field?.onBlur;

    return (
      <View style={containerStyle}>
        <View style={[styles.wrapper, inputContainerStyle]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

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
            style={[styles.input, inputStyle]}
            returnKeyType="done"
            {...inputProps}
          />
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
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type FormInputVariant =
  | 'text'
  | 'dropdown'
  | 'date'
  | 'datetime'
  | 'country-phone';

export interface BaseFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  label?: string;
  error?: string;
  disabled?: boolean;

  /** Styles */
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;

  /** Tooltip */
  isTooltip?: boolean;
  tooltipMessage?: string;
}

export interface TextVariantProps {
  variant: 'text';
  inputProps?: TextInputProps;
  leftIcon?: ReactNode;
}

export interface DropdownVariantProps {
  variant: 'dropdown';
  dropdownData: { label: string; value: any }[];
  onLoadMore?: () => void;
  onDropdownSelect?: (item: any) => void;
}

export interface DateVariantProps {
  variant: 'date' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
}

export interface CountryPhoneVariantProps {
  variant: 'country-phone';
}

export type FormInputProps<T extends FieldValues> = BaseFormInputProps<T> &
  (
    | TextVariantProps
    | DropdownVariantProps
    | DateVariantProps
    | CountryPhoneVariantProps
  );

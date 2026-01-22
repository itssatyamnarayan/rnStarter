import { ReactNode, Ref } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { ICountryCca2 } from 'react-native-country-select';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import {
  IPhoneInputRef,
  PhoneInputProps,
} from 'react-native-international-phone-number';

export type FormInputVariant =
  | 'text'
  | 'dropdown'
  | 'date'
  | 'datetime'
  | 'country-phone';

export type DropdownItem = {
  label: string;
  value: string;
};

export interface BaseFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  label?: string;
  error?: string;

  /** Styles */
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  /** Tooltip */
  isTooltip?: boolean;
  tooltipMessage?: string;
}

export interface TextInputVariantProps {
  textInputProps?: TextInputProps;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  placeholder?: string;
}

export interface DropdownVariantProps {
  dropdownData: DropdownItem[];
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  onLoadMore?: () => void;
  onListFooterLoading?: () => React.ReactElement | null;
  search?: boolean;
  onSearchTextChange?: (text: string) => void;
  onDropdownSelect?: (item: DropdownItem) => void;
  dropdownContainerStyle?: StyleProp<ViewStyle>;
  dropdownProps?: Partial<
    Omit<
      DropdownProps<any>,
      'data' | 'value' | 'onChange' | 'labelField' | 'valueField'
    >
  >;
}

export interface DateVariantProps {
  minimumDate?: Date;
  maximumDate?: Date;
}

export interface CountryPhoneVariantProps {
  showFlag?: boolean;
  defaultCountry?: ICountryCca2;
  disabled?: boolean;
  ref?: Ref<IPhoneInputRef>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  phoneInputProps?: Partial<
    Omit<
      PhoneInputProps,
      'defaultValue' | 'onChangeText' | 'defaultCountry' | 'ref'
    >
  >;
}

export type FormInputProps<T extends FieldValues> = BaseFormInputProps<T> &
  (
    | (TextInputVariantProps & { variant: 'text' })
    | (DropdownVariantProps & { variant: 'dropdown' })
    | (DateVariantProps & { variant: 'date' | 'datetime' })
    | (CountryPhoneVariantProps & { variant: 'country-phone' })
  );

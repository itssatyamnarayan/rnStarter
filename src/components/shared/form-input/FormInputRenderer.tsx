import React from 'react';
import {
  DropdownVariantProps,
  FormInputProps,
  TextInputVariantProps,
} from './type';
import TextInputVariant from './variants/TextInputVariant';
import { FieldValues } from 'react-hook-form';
import DropdownVariant from './variants/DropdownVariant';

type RendererProps<T extends FieldValues> = Omit<
  FormInputProps<T>,
  'control' | 'name' | 'rules' | 'label' | 'error'
> & {
  field: {
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
  };
};

export const FormInputRenderer = <T extends FieldValues>(
  props: RendererProps<T>,
) => {
  const { variant, field, ...rest } = props;

  switch (variant) {
    case 'dropdown': {
      const dropdownProps = rest as DropdownVariantProps;

      return <DropdownVariant mode="form" field={field} {...dropdownProps} />;
    }

    // case 'date':
    //   return <DateField mode="date" field={field} {...rest} />;

    // case 'datetime':
    //   return <DateField mode="datetime" field={field} {...rest} />;

    // case 'country-phone':
    //   return <CountryPhoneField field={field} {...rest} />;

    default:
      const textInputProps = rest as TextInputVariantProps;
      return <TextInputVariant field={field} mode="form" {...textInputProps} />;
  }
};

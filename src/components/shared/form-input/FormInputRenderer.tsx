import React from 'react';
import {
  CountryPhoneVariantProps,
  DropdownVariantProps,
  FormInputProps,
  TextInputVariantProps,
} from './type';
import TextInputVariant from './variants/TextInputVariant';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import DropdownVariant from './variants/DropdownVariant';
import CountryPhoneVariant from './variants/CountryPhoneVariant';

type RendererProps<T extends FieldValues> = Omit<
  FormInputProps<T>,
  'control' | 'name' | 'rules' | 'label' | 'error'
> & {
  field: ControllerRenderProps<T>;
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

    case 'country-phone': {
      return (
        <CountryPhoneVariant
          ref={field.ref}
          mode="form"
          field={field}
          {...(rest as CountryPhoneVariantProps)}
        />
      );
    }

    // case 'date':
    //   return <DateField mode="date" field={field} {...rest} />;

    // case 'datetime':
    //   return <DateField mode="datetime" field={field} {...rest} />;

    // case 'country-phone':
    //   return <CountryPhoneField field={field} {...rest} />;

    default:
      const textInputProps = rest as TextInputVariantProps;
      return (
        <TextInputVariant
          field={field}
          ref={field.ref}
          mode="form"
          {...textInputProps}
        />
      );
  }
};

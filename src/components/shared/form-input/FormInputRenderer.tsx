import React from 'react';
import { FormInputProps } from './type';
import TextInputVariant from './variants/TextInputVariant';
import { FieldValues } from 'react-hook-form';

type RendererProps = Omit<
  FormInputProps<FieldValues>,
  'control' | 'name' | 'rules' | 'label' | 'error'
> & {
  field: {
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
  };
};

export const FormInputRenderer = (props: RendererProps) => {
  const { variant = 'text', field, ...rest } = props;

  switch (variant) {
    // case 'dropdown':
    //   return <DropdownField field={field} {...rest} />;

    // case 'date':
    //   return <DateField mode="date" field={field} {...rest} />;

    // case 'datetime':
    //   return <DateField mode="datetime" field={field} {...rest} />;

    // case 'country-phone':
    //   return <CountryPhoneField field={field} {...rest} />;

    default:
      return <TextInputVariant field={field} {...rest} />;
  }
};

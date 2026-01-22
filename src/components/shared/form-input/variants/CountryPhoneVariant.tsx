import React, { memo } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-international-phone-number';
import { useAppTheme } from '@/context/ThemeContext';
import { CountryPhoneVariantProps } from '../type';
import { normalize } from '@/utils/normalize';
import { FontFamily } from '@/theme';

type RHFPhoneField = {
  value: string;
  onChange: (value: string) => void;
};

type FormModeProps = {
  mode: 'form';
  field: RHFPhoneField;
  value?: never;
  onChange?: never;
};

type StandaloneModeProps = {
  mode: 'standalone';
  value: string;
  onChange: (value: string) => void;
  field?: never;
};

export type CountryPhoneVisualProps =
  | (FormModeProps & CountryPhoneVariantProps)
  | (StandaloneModeProps & CountryPhoneVariantProps);

const CountryPhoneVariant = ({
  mode,
  field,
  value,
  onChange,
  showFlag = true,
  defaultCountry = 'IN',
  disabled,
  ref,
  placeholder = 'Enter phone number',
}: CountryPhoneVisualProps) => {
  const { color } = useAppTheme();

  const resolvedValue = mode === 'form' ? field.value : value;
  const handleChange = mode === 'form' ? field.onChange : onChange;

  return (
    <View>
      <PhoneInput
        ref={ref ?? null}
        defaultValue={resolvedValue}
        defaultCountry={defaultCountry}
        onChangeText={handleChange}
        // selectedCountry={p => console.log('Phone no', p)}
        allowFontScaling={false}
        disabled={disabled}
        phoneInputStyles={{
          flag: {
            display: showFlag ? 'flex' : 'none',
          },
          caret: {
            display: 'none',
          },
          divider: {
            display: showFlag ? 'flex' : 'none',
            backgroundColor: color.border,
          },
          container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 12,
            paddingRight: 12,
            minHeight: normalize(48),
            backgroundColor: color.background_secondary,
            borderColor: color.border,
          },
          callingCode: {
            color: color.text_primary,
            paddingRight: 18,
            fontSize: normalize(16),
            fontFamily: FontFamily.InterTightRegular,
          },
          input: {
            color: color.text_primary,
            flex: 1,
            fontSize: normalize(16),
            fontFamily: FontFamily.InterTightRegular,
          },
          flagContainer: {
            backgroundColor: color.background_primary,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            paddingLeft: 12,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 0,
          },
        }}
        placeholder={placeholder}
        cursorColor={color.text_primary}
        modalStyles={{
          countryItem: { backgroundColor: color.background_primary },
          content: { backgroundColor: color.background_secondary },
          countryName: { color: color.text_primary },
          callingCode: { color: color.text_primary },
          searchInput: {
            backgroundColor: color.background_primary,
            color: color.text_primary,
            paddingLeft: 10,
          },
          countryNotFoundMessage: {
            color: color.text_primary,
          },
          alphabetLetterText: { color: color.text_primary },
          alphabetLetterTextActive: { color: color.text_primary },
        }}
        modalSearchInputPlaceholderTextColor={color.placeholder}
        placeholderTextColor={color.placeholder}
      />
    </View>
  );
};

export default memo(CountryPhoneVariant);

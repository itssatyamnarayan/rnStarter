import React, { forwardRef, memo } from 'react';
import { StyleSheet } from 'react-native';
import PhoneInput, {
  IPhoneInputRef,
} from 'react-native-international-phone-number';
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
};

type StandaloneModeProps = {
  mode: 'standalone';
  value: string;
  onChange: (value: string) => void;
};

export type CountryPhoneVisualProps =
  | (FormModeProps & CountryPhoneVariantProps)
  | (StandaloneModeProps & CountryPhoneVariantProps);

const CountryPhoneVariant = forwardRef<IPhoneInputRef, CountryPhoneVisualProps>(
  (props, ref) => {
    const { color } = useAppTheme();
    const {
      mode,
      countryContainerStyle,
      defaultCountry = 'IN',
      showFlag = true,
      disabled,
      onChangeSelectedCountry,
      phoneInputProps,
      placeholder = 'Enter phone number',
    } = props;

    const resolvedValue = mode === 'form' ? props.field.value : props.value;
    const handleChange =
      mode === 'form' ? props.field.onChange : props.onChange;

    return (
      <PhoneInput
        ref={ref ?? null}
        value={resolvedValue}
        defaultCountry={defaultCountry}
        onChangeText={handleChange}
        // onChangeSelectedCountry={country => {
        //   console.log('Country:', country);
        //   console.log('Calling code:', country.idd.root); // ← "+91"
        //   console.log('ISO code:', country.cca2); // ← "IN"
        // }}
        onChangeSelectedCountry={onChangeSelectedCountry}
        allowFontScaling={false}
        disabled={disabled}
        phoneInputStyles={{
          flag: {
            display: showFlag ? 'flex' : 'none',
          },
          caret: {
            display: showFlag ? 'flex' : 'none',
            color: color.text_primary,
          },
          divider: {
            display: showFlag ? 'flex' : 'none',
            backgroundColor: color.border,
          },
          container: [
            styles.container,
            {
              backgroundColor: disabled
                ? color.disabled
                : color.background_secondary,
              borderColor: color.border,
            },
            countryContainerStyle,
          ],
          callingCode: [
            styles.callingCode,
            {
              color: color.text_primary,
            },
          ],
          input: [styles.input, { color: color.text_primary }],
          flagContainer: [
            styles.flagContainer,
            { backgroundColor: color.background_primary },
          ],
        }}
        placeholder={placeholder}
        cursorColor={color.text_primary}
        modalStyles={{
          countryItem: { backgroundColor: color.background_primary },
          content: { backgroundColor: color.background_secondary },
          countryName: { color: color.text_primary },
          callingCode: { color: color.text_primary },
          searchInput: [
            styles.searchInput,
            {
              backgroundColor: color.background_primary,
              color: color.text_primary,
            },
          ],
          countryNotFoundMessage: {
            color: color.text_primary,
          },
          alphabetLetterText: { color: color.text_primary },
          alphabetLetterTextActive: { color: color.text_primary },
        }}
        modalSearchInputPlaceholderTextColor={color.placeholder}
        placeholderTextColor={color.placeholder}
        keyboardType="number-pad"
        {...phoneInputProps}
      />
    );
  },
);

export default memo(CountryPhoneVariant);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 12,
    minHeight: normalize(48),
  },
  callingCode: {
    paddingRight: 18,
    fontSize: normalize(16),
  },
  input: {
    flex: 1,
    fontSize: normalize(16),
    fontFamily: FontFamily.InterTightRegular,
  },
  flagContainer: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 0,
  },
  searchInput: {
    paddingLeft: 10,
  },
});

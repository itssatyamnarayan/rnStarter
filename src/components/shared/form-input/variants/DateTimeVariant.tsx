import { useAppTheme } from '@/context/ThemeContext';
import { FontFamily } from '@/theme';
import React, { memo, useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import Icon from '../../Icon';
import { normalize } from '@/utils/normalize';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { DateTimeVariantProps } from '../type';
import moment from 'moment';
import { isAndroid } from '@/constants/device';

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = 'date' | 'time';

type RHFDateTimeField = {
  value?: Date;
  onChange?: (date: Date) => void;
};

type DateTimeFormMode = {
  mode: 'form';
  field: RHFDateTimeField;
  dateTimeMode?: IOSMode | AndroidMode;
};

type DateTimeIndependentMode = {
  mode: 'standalone';
  value?: Date;
  onChange?: (date: Date) => void;
  dateTimeMode?: IOSMode | AndroidMode;
};

type DateTimeVisualProps =
  | (DateTimeFormMode & DateTimeVariantProps)
  | (DateTimeIndependentMode & DateTimeVariantProps);

const DateTimeVariant = (props: DateTimeVisualProps) => {
  const { color } = useAppTheme();
  const [showPicker, setShowPicker] = useState(false);

  const {
    mode,
    disabled,
    placeholder = 'Select date',
    dateTimeMode = 'date',
    inputStyle,
    minimumDate,
    maximumDate,
    showIcon = true,
    iconName = 'calendar',
    dateTimePickerProps,
    dateTimeContainerStyle,
  } = props;

  const value =
    mode === 'form' ? props.field.value ?? null : props.value ?? null;

  const onChange = mode === 'form' ? props.field.onChange : props.onChange;

  const handlePickerChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (isAndroid) {
      setShowPicker(false);
    }

    if (event.type === 'set' && selectedDate) {
      onChange?.(selectedDate);
      //Always use .toISOString() when accessing the date/time value in the parent onChange
    }
  };

  const displayValue = value
    ? moment(value).format(dateTimeMode === 'time' ? 'hh:mm A' : 'DD MMM YYYY')
    : '';

  const handlePress = () => {
    setShowPicker(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.wrapper,
        {
          backgroundColor: disabled
            ? color.disabled
            : color.background_secondary,
          borderColor: color.border,
        },
        dateTimeContainerStyle,
      ]}
    >
      <TextInput
        value={displayValue}
        editable={false}
        pointerEvents="none"
        placeholder={placeholder}
        placeholderTextColor={color.placeholder}
        style={[styles.input, { color: color.text_primary }, inputStyle]}
      />

      {showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={dateTimeMode}
          onChange={handlePickerChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          {...dateTimePickerProps}
        />
      )}
      {showIcon && <Icon name={iconName} size={20} style={styles.rightIcon} />}
    </Pressable>
  );
};

export default memo(DateTimeVariant);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: normalize(16),
    fontFamily: FontFamily.InterTightRegular,
    minHeight: normalize(48),
    paddingHorizontal: 12,
  },
  rightIcon: {
    margin: 12,
  },
});

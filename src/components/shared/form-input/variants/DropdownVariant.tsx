import { useAppTheme } from '@/context/ThemeContext';
import { DropdownVariantProps } from '../type';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from '../../Icon';
import { normalize } from '@/utils/normalize';
import { memo } from 'react';
import { FontFamily } from '@/theme';

type RHFDropdownField = {
  value: string;
  onChange: (value: string) => void;
};
type DropdownFormMode = {
  mode: 'form';
  field: RHFDropdownField;
};

type DropdownStandaloneMode = {
  mode: 'standalone';
  value: string;
  onChange: (value: string) => void;
};

export type DropdownVisualProps =
  | (DropdownFormMode & DropdownVariantProps)
  | (DropdownStandaloneMode & DropdownVariantProps);

const DropdownVariant = (props: DropdownVisualProps) => {
  const { color } = useAppTheme();

  const {
    dropdownData,
    disabled,
    placeholder,
    isLoading,
    onLoadMore,
    onListFooterLoading,
    search,
    onSearchTextChange,
    onDropdownSelect,
    dropdownProps,
    dropdownContainerStyle,
    mode,
  } = props;

  const resolvedValue = mode === 'form' ? props.field.value : props.value;

  const handleChange = mode === 'form' ? props.field.onChange : props.onChange;

  return (
    <Dropdown
      {...dropdownProps}
      data={dropdownData}
      labelField="label"
      valueField="value"
      value={resolvedValue}
      disable={disabled}
      placeholder={placeholder}
      style={[
        styles.dropdown,
        {
          borderColor: color.border,
          backgroundColor: disabled
            ? color.disabled
            : color.background_secondary,
        },
        dropdownContainerStyle,
      ]}
      containerStyle={[
        styles.dropdownContainer,
        {
          borderColor: color.border,
          backgroundColor: color.background_primary,
        },
      ]}
      placeholderStyle={[
        styles.placeholderStyle,
        { color: color.text_secondary },
      ]}
      selectedTextStyle={[
        styles.selectedTextStyle,
        { color: color.text_primary },
      ]}
      itemTextStyle={[styles.dropdownText, { color: color.text_primary }]}
      activeColor={color.border}
      renderRightIcon={() =>
        isLoading ? (
          <ActivityIndicator size="small" color={color.primary} />
        ) : (
          <Icon name="downArrow" size={18} color={color.background_secondary} />
        )
      }
      onChange={item => {
        handleChange(item.value);
        onDropdownSelect?.(item);
      }}
      flatListProps={{
        onEndReachedThreshold: 0.05,
        onEndReached: onLoadMore,
        ListFooterComponent: onListFooterLoading,
      }}
      search={search}
      searchPlaceholder="Search..."
      onChangeText={onSearchTextChange}
      inputSearchStyle={{
        color: color.text_primary,
        borderRadius: normalize(12),
        borderColor: color.border,
      }}
    />
  );
};

export default memo(DropdownVariant);

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    height: normalize(48),
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: normalize(16),
    fontFamily: FontFamily.InterTightRegular,
  },
  selectedTextStyle: {
    fontSize: normalize(16),
    fontFamily: FontFamily.InterTightRegular,
  },
  dropdownText: {
    fontSize: normalize(14),
    fontFamily: FontFamily.InterTightRegular,
  },
  dropdownContainer: {
    borderWidth: 1,
    maxHeight: normalize(200),
    overflow: 'hidden',
    borderRadius: 5,
  },
});

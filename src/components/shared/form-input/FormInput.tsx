import { useState } from 'react';
import { FormInputProps } from './type';
import { StyleSheet, Text, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Controller, FieldValues } from 'react-hook-form';
import { isIOS } from '@/constants/device';
import { FormInputRenderer } from './FormInputRenderer';
import CustomText from '../CustomText';
import { useAppTheme } from '@/context/ThemeContext';
import { FontFamily } from '@/theme';
import Icon from '../Icon';

const FormInput = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  error,
  containerStyle,
  labelStyle,
  isTooltip,
  tooltipMessage,
  variant,
  ...rest
}: FormInputProps<T>) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { color, icon } = useAppTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelCont}>
          <CustomText style={labelStyle} variant="label" weight="400">
            {label}
          </CustomText>

          {isTooltip && (
            <Tooltip
              isVisible={showTooltip}
              placement="bottom"
              tooltipStyle={styles.tooltip}
              content={<Text>{tooltipMessage}</Text>}
              disableShadow
              onClose={() => setShowTooltip(false)}
            >
              <Icon name={icon.tooltip} size={15} style={styles.tooltipIcon} />
            </Tooltip>
          )}
        </View>
      )}

      {/* Controlled Field */}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormInputRenderer<T> variant={variant} field={field} {...rest} />
        )}
      />

      {/* Error */}
      {error && (
        <Text style={[styles.errorText, { color: color.danger }]}>{error}</Text>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    marginLeft: 6,
    fontFamily: FontFamily.InterTightMedium,
  },

  labelCont: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tooltipCont: { marginTop: isIOS ? 0 : -60 },
  tooltip: {},
  tooltipIcon: { marginBottom: 8 },
});

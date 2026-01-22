import { useState } from 'react';
import { FormInputProps } from './type';
import { StyleSheet, Text, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Controller, FieldValues } from 'react-hook-form';
import { FormInputRenderer } from './FormInputRenderer';
import CustomText from '../CustomText';
import { useAppTheme } from '@/context/ThemeContext';
import { FontFamily, palette } from '@/theme';
import Icon from '../Icon';
import { normalize } from '@/utils/normalize';

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

  const handleTooltipPress = () => {
    setShowTooltip(prev => !prev);
  };

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
              content={
                <CustomText style={[styles.tooltipText]}>
                  {tooltipMessage}
                </CustomText>
              }
              contentStyle={styles.tooltipContent}
              disableShadow
              closeOnBackgroundInteraction
              childContentSpacing={-50}
              showChildInTooltip={false}
              onClose={handleTooltipPress}
            >
              <Icon
                name={icon.tooltip}
                size={15}
                style={styles.tooltipIcon}
                onPress={handleTooltipPress}
              />
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
    fontSize: normalize(12),
    marginLeft: 6,
    fontFamily: FontFamily.InterTightMedium,
  },

  labelCont: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: 'transparent',
  },
  tooltipContent: {
    backgroundColor: palette.white[900],
  },
  tooltipIcon: { marginBottom: 8 },
  tooltipText: {
    fontSize: normalize(14),
    fontFamily: FontFamily.InterTightRegular,
    textAlign: 'center',
    color: palette.black[500],
  },
});

import { useState } from 'react';
import { FormInputProps } from './type';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Controller, FieldValues } from 'react-hook-form';
import { isIOS } from '@/constants/device';
import { FormInputRenderer } from './FormInputRenderer';
import CustomText from '../CustomText';

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

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label + Tooltip */}
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
              <TouchableOpacity onPress={() => setShowTooltip(true)}>
                {/* <FastImage
                  source={Icons.info}
                  style={styles.tooltipIcon}
                //   tintColor={}
                /> */}
              </TouchableOpacity>
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
          <FormInputRenderer
            variant={variant}
            field={field}
            disabled={rest.disabled}
            {...rest}
          />
        )}
      />

      {/* Error */}
      {error && <Text style={[styles.errorText]}>{error}</Text>}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    // fontFamily: fontFamily?.InterTightRegular,
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
  },

  labelCont: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tooltipCont: { marginTop: isIOS ? 0 : -60 },
  tooltip: {
    width: 14,
    height: 14,
    marginBottom: 8,
  },
});

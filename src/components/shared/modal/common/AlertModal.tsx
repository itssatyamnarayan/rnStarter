import React, { memo, useCallback } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import CustomText from '../../text/CustomText';
import CustomButton, { AppButtonProps } from '../../CustomButton';
import Icon from '../../Icon';
import BaseModal from '../BaseModal';
import { useAppTheme } from '@/context/ThemeContext';
import { IconName } from '@/assets/icons';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: IconName;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  primaryButton?: Partial<Omit<AppButtonProps, 'onPress'>>;
  secondaryButton?: Partial<Omit<AppButtonProps, 'onPress'>>;
  onClose?: () => void;
  closeOnOverlayPress?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  onPressPrimaryBtn?: () => void;
  onPressSecondaryBtn?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  description,
  icon,
  showPrimaryButton = true,
  showSecondaryButton = true,
  primaryButton = {
    title: 'Yes',
    variant: 'primary',
  },
  secondaryButton = {
    title: 'Cancel',
    variant: 'outline',
  },
  onClose,
  closeOnOverlayPress = false,
  contentStyle,
  onPressPrimaryBtn,
  onPressSecondaryBtn,
}) => {
  const { color } = useAppTheme();

  const handlePrimaryPress = useCallback(() => {
    onPressPrimaryBtn?.();
  }, [onPressPrimaryBtn]);

  const handleSecondaryPress = useCallback(() => {
    onPressSecondaryBtn?.();
  }, [onPressSecondaryBtn]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      disableOverlayPress={!closeOnOverlayPress}
      contentStyle={[styles.content, contentStyle]}
    >
      {/* Icon */}
      {icon && <Icon name={icon} size={65} style={styles.iconContainer} />}

      {/* Title */}
      <CustomText
        variant="title"
        weight="600"
        style={styles.title}
        textAlign="center"
      >
        {title}
      </CustomText>

      {/* Description */}
      {description && (
        <CustomText
          variant="body"
          style={[styles.description, { color: color.text_secondary }]}
          textAlign="center"
        >
          {description}
        </CustomText>
      )}

      {/* Buttons */}
      {(showPrimaryButton || showSecondaryButton) && (
        <View style={styles.buttonContainer}>
          {showSecondaryButton && (
            <CustomButton
              title={secondaryButton.title}
              variant={secondaryButton.variant}
              onPress={handleSecondaryPress}
              containerStyle={[
                styles.button,
                showPrimaryButton && styles.buttonWithMargin,
              ]}
              {...secondaryButton}
            />
          )}

          {showPrimaryButton && (
            <CustomButton
              title={primaryButton.title}
              variant={primaryButton.variant}
              onPress={handlePrimaryPress}
              containerStyle={styles.button}
              {...primaryButton}
            />
          )}
        </View>
      )}
    </BaseModal>
  );
};

export default memo(AlertModal);

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  buttonWithMargin: {
    marginRight: 12,
  },
});

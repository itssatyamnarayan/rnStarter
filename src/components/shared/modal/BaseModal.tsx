import React, { memo, ReactNode } from 'react';
import {
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { useAppTheme } from '@/context/ThemeContext';

interface Props extends Partial<Omit<ModalProps, 'visible' | 'children'>> {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  overlayStyle?: ViewProps['style'];
  contentStyle?: ViewProps['style'];
  disableOverlayPress?: boolean;
}

const BaseModal = ({
  isOpen,
  onClose,
  children,
  overlayStyle,
  contentStyle,
  disableOverlayPress = false,
  ...rest
}: Props) => {
  const { color } = useAppTheme();

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={onClose}
      {...rest}
    >
      <Pressable
        style={[styles.overlay, overlayStyle]}
        disabled={disableOverlayPress}
        onPress={onClose}
      >
        <Pressable
          style={[
            styles.content,
            { backgroundColor: color.background_secondary },
            contentStyle,
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default memo(BaseModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginHorizontal: 16,
  },
});

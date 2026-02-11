import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import CustomText from '@/components/shared/CustomText';
import BaseBottomSheetModal from '../BaseBottomSheetModal';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BSRef } from '../types';

interface Props {
  onCamera: () => void;
  onGallery: () => void;
  snapPoints?: string[];
}

const ImagePickerSheet = forwardRef<BSRef, Props>(
  ({ onCamera, onGallery, snapPoints = ['25%'] }, ref) => {
    const sheetRef = useRef<BottomSheetModal>(null);
    const pendingAction = useRef<'camera' | 'gallery' | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.present(),
      close: () => sheetRef.current?.dismiss(),
    }));

    const handleCamera = () => {
      pendingAction.current = 'camera';
      sheetRef.current?.dismiss();
    };

    const handleGallery = () => {
      pendingAction.current = 'gallery';
      sheetRef.current?.dismiss();
    };

    const handleDismiss = useCallback(() => {
      if (pendingAction.current === 'camera') {
        onCamera();
      } else if (pendingAction.current === 'gallery') {
        onGallery();
      }
      pendingAction.current = null;
    }, [onCamera, onGallery]);

    return (
      <BaseBottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        onDismiss={handleDismiss}
      >
        <BottomSheetView style={styles.container}>
          <Pressable style={styles.item} onPress={handleCamera}>
            <CustomText variant="body">📷 Take Photo</CustomText>
          </Pressable>

          <Pressable style={styles.item} onPress={handleGallery}>
            <CustomText variant="body">🖼️ Choose from Gallery</CustomText>
          </Pressable>
        </BottomSheetView>
      </BaseBottomSheetModal>
    );
  },
);

export default React.memo(ImagePickerSheet);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  item: {
    paddingVertical: 16,
  },
});

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import CustomText from '@/components/shared/CustomText';
import BaseBottomSheetModal from '../BaseBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export type ImagePickerSheetRef = {
  open: () => void;
  close: () => void;
};

interface Props {
  onCamera: () => void;
  onGallery: () => void;
  snapPoints?: string[];
}

const ImagePickerSheet = forwardRef<ImagePickerSheetRef, Props>(
  ({ onCamera, onGallery, snapPoints = ['80%'] }, ref) => {
    const sheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.present(),
      close: () => sheetRef.current?.dismiss(),
    }));

    const handleCamera = useCallback(() => {
      onCamera();
      sheetRef.current?.dismiss();
    }, [onCamera]);

    const handleGallery = useCallback(() => {
      onGallery();
      sheetRef.current?.dismiss();
    }, [onGallery]);

    return (
      <BaseBottomSheetModal ref={sheetRef} snapPoints={snapPoints}>
        <View style={styles.container}>
          <Pressable style={styles.item} onPress={handleCamera}>
            <CustomText variant="body">Take Photo</CustomText>
          </Pressable>

          <Pressable style={styles.item} onPress={handleGallery}>
            <CustomText variant="body">Choose from Gallery</CustomText>
          </Pressable>
        </View>
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

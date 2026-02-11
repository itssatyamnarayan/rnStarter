import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import AppImage from './AppImage';
import { GlobalImage } from '@/assets/images';
import Icon from './Icon';
import { useAppTheme } from '@/context/ThemeContext';
import { isIOS } from '@/constants/device';
import { useImagePicker } from '@/hooks/useImagePicker';
import ImagePickerSheet from './bottom-sheet/sheets/ImagePickerSheet';
import { BSRef } from './bottom-sheet/types';

type SourceType = 'gallery' | 'camera' | 'both';

interface Props {
  imageUrl?: string;
  defaultImage?: any;
  width?: number;
  height?: number;
  alignSelf?: ViewStyle['alignSelf'];
  containerStyle?: ViewStyle;
  editable?: boolean;
  editIconSize?: number;

  source?: SourceType;
  maxSize?: number;
  quality?: number;
  onImageChange?: (image: string) => void;
}

const AvatarPicker = ({
  imageUrl,
  defaultImage = GlobalImage.profilePlaceholder,
  width = 100,
  height = 100,
  alignSelf = 'center',
  containerStyle,
  editable = false,
  editIconSize = 28,
  source = 'both',
  maxSize = 256,
  quality = 80,
  onImageChange,
}: Props) => {
  const { color } = useAppTheme();
  const { captureFromCamera, images, pickFromGallery } = useImagePicker({
    maxSize,
    quality,
  });
  const [localImageUri, setLocalImageUri] = useState<string | undefined>(
    imageUrl,
  );
  const imageSource = localImageUri ? { uri: localImageUri } : defaultImage;
  const sheetRef = useRef<BSRef>(null);

  useEffect(() => {
    if (images?.length > 0) {
      const image = images[0];

      setLocalImageUri(image.uri);
      onImageChange?.(image.uri);
    }
  }, [images, onImageChange]);

  useEffect(() => {
    setLocalImageUri(imageUrl);
  }, [imageUrl]);

  const dynamicContainerStyle: ViewStyle = {
    width,
    height,
    borderRadius: width / 2,
    alignSelf,
  };

  // Main press handler
  const handleEditPress = useCallback(() => {
    if (source === 'both') {
      sheetRef.current?.open();
    } else if (source === 'camera') {
      captureFromCamera();
    } else {
      pickFromGallery();
    }
  }, [source, captureFromCamera, pickFromGallery]);

  return (
    <>
      <View style={[styles.container, dynamicContainerStyle, containerStyle]}>
        <View style={[styles.imageContainer, { borderRadius: width / 2 }]}>
          <AppImage
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {editable && (
          <Pressable
            onPress={handleEditPress}
            style={({ pressed }) => [
              styles.editIconContainer,
              pressed && isIOS && { opacity: 0.7 },
              {
                width: editIconSize,
                height: editIconSize,
                borderRadius: editIconSize / 2,
                backgroundColor: color.primary,
                borderColor: color.background_secondary,
              },
            ]}
            android_ripple={{
              color: 'rgba(255,255,255,0.2)',
              borderless: true,
              foreground: true,
            }}
          >
            <Icon name="edit" size={14} />
          </Pressable>
        )}
      </View>
      <ImagePickerSheet
        ref={sheetRef}
        onCamera={captureFromCamera}
        onGallery={pickFromGallery}
      />
    </>
  );
};

export default memo(AvatarPicker);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 16,
    borderWidth: 2.5,
    borderColor: '#fff',
  },
  imageContainer: {
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderWidth: 2,
    overflow: 'hidden',
  },
});

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import AppImage from './AppImage';
import { GlobalImage } from '@/assets/images';
import Icon from './Icon';
import { useAppTheme } from '@/context/ThemeContext';
import { isIOS } from '@/constants/device';
import { pickImage } from '@/utils/imagePickerHandler';

type SourceType = 'gallery' | 'camera' | 'both';

interface ImageResult {
  uri: string;
  width: number;
  height: number;
}

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
  onImageChange?: (image: ImageResult) => void;
  onCancel?: () => void;
}

const ImagePicker: React.FC<Props> = ({
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
  onCancel,
}) => {
  const { color } = useAppTheme();
  const [localImageUri, setLocalImageUri] = useState<string | undefined>(
    imageUrl,
  );
  const isImagePickerOpen = useRef<boolean>(false);

  // Determine image source
  const imageSource =
    localImageUri && typeof localImageUri === 'string'
      ? { uri: localImageUri }
      : defaultImage;

  const dynamicContainerStyle: ViewStyle = {
    width,
    height,
    borderRadius: width / 2,
    alignSelf,
  };

  // Handle image picking from a specific source
  const handlePickFromSource = useCallback(
    async (pickSource: 'gallery' | 'camera') => {
      try {
        const result = await pickImage({
          source: pickSource,
          multiple: false,
          maxSize,
          quality,
        });

        if (result.cancelled) {
          onCancel?.();
          return;
        }

        if (result.images.length > 0) {
          const imageResult = result.images[0];
          setLocalImageUri(imageResult.uri);
          onImageChange?.(imageResult);
        }
      } catch (error) {
        console.error('Error picking image:', error);
      } finally {
        isImagePickerOpen.current = false;
      }
    },
    [maxSize, quality, onImageChange, onCancel],
  );

  // Show action sheet for 'both' source type
  const showSourceActionSheet = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            handlePickFromSource('camera');
          } else if (buttonIndex === 2) {
            handlePickFromSource('gallery');
          }
        },
      );
    } else {
      // Android Alert
      Alert.alert(
        'Select Image',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take Photo', onPress: () => handlePickFromSource('camera') },
          {
            text: 'Choose from Library',
            onPress: () => handlePickFromSource('gallery'),
          },
        ],
        { cancelable: true }, // We need add in Cancel isImagePickerOpen.current = false;
      );
    }
  }, [handlePickFromSource]);

  // Main press handler
  const handleEditPress = useCallback(() => {
    if (isImagePickerOpen?.current) {
      return;
    }
    isImagePickerOpen.current = true;
    if (source === 'both') {
      showSourceActionSheet();
    } else {
      handlePickFromSource(source);
    }
  }, [source, showSourceActionSheet, handlePickFromSource]);

  // Update local state when imageUrl prop changes
  useEffect(() => {
    setLocalImageUri(imageUrl);
  }, [imageUrl]);

  return (
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
              borderColor: color.background_primary,
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
  );
};

export default ImagePicker;

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

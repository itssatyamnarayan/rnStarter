import { Platform } from 'react-native';
import ImageResizer, { Response } from '@bam.tech/react-native-image-resizer';

export const getCompressedImage = async ({
  path,
  maxWidth = 256,
  maxHeight = 256,
  quality = 80,
  maxSize = 256,
}: {
  path: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSize?: number;
}): Promise<Response | null> => {
  const getCalculatedSize = (width: number, height: number) => {
    let ratio = maxSize / width;
    let newWidth = maxSize;
    let newHeight = height * ratio;

    if (newHeight > maxSize) {
      ratio = maxSize / height;
      newHeight = maxSize;
      newWidth = width * ratio;
    }

    return { width: newWidth, height: newHeight };
  };

  let newSize = { width: maxWidth, height: maxHeight };

  if (maxWidth > maxSize || maxHeight > maxSize) {
    newSize = getCalculatedSize(maxWidth, maxHeight);
  }

  try {
    const result = await ImageResizer.createResizedImage(
      path,
      newSize.width,
      newSize.height,
      'JPEG',
      quality,
    );

    if (result?.path) {
      return {
        ...result,
        path: Platform.OS === 'android' ? 'file://' + result.path : result.path,
      };
    }

    return null;
  } catch (err) {
    console.warn('Image compression error:', err);
    return null;
  }
};

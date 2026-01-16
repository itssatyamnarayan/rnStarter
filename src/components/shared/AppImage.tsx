import React, { memo, useState } from 'react';
import FastImage, {
  FastImageProps,
  OnErrorEvent,
} from '@d11/react-native-fast-image';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GlobalImage } from '@/assets/images';

interface AppImageProps extends FastImageProps {
  showLoader?: boolean;
  placeholder?: FastImageProps['source'];
}

const AppImage = memo(
  ({
    resizeMode = FastImage.resizeMode.cover,
    showLoader = false,
    placeholder = GlobalImage.profilePlaceholder,
    style,
    onLoadStart,
    onLoadEnd,
    onError,
    source,
    ...rest
  }: AppImageProps) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
      <View style={[styles.container, style]}>
        {showLoader && loading && (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        )}

        <FastImage
          {...rest}
          style={StyleSheet.absoluteFill}
          resizeMode={resizeMode}
          source={hasError && placeholder ? placeholder : source}
          onLoadStart={() => {
            setLoading(true);
            onLoadStart?.();
          }}
          onLoadEnd={() => {
            setLoading(false);
            onLoadEnd?.();
          }}
          onError={(event: OnErrorEvent) => {
            setHasError(true);
            onError?.(event);
          }}
        />
      </View>
    );
  },
);

export default AppImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

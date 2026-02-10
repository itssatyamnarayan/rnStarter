import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface Props {
  children: React.ReactNode;
  snapPoints?: string[];
  backgroundStyle?: object;
  enablePanDownToClose?: boolean;
  index?: number;
}

const BaseBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  (
    {
      children,
      snapPoints = ['50%'],
      backgroundStyle,
      enablePanDownToClose = true,
      index = 0,
    },
    ref,
  ) => {
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const bottomSheetBackdropRenderer = useCallback(
      (backdropProps: BottomSheetDefaultBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...backdropProps}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={'close'}
          />
        );
      },
      [],
    );
    return (
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={memoSnapPoints}
        backgroundStyle={backgroundStyle}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing
        backdropComponent={bottomSheetBackdropRenderer}
      >
        {children}
      </BottomSheet>
    );
  },
);

export default React.memo(BaseBottomSheetModal);

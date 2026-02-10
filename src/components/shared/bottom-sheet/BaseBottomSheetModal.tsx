import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface Props {
  children: React.ReactNode;
  snapPoints?: string[];
  backgroundStyle?: object;
  enablePanDownToClose?: boolean;
  index?: number;
  onDismiss?: () => void;
}

export type BSRef = {
  open: () => void;
  close: () => void;
};

const BaseBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  (
    {
      children,
      snapPoints = ['50%'],
      backgroundStyle,
      enablePanDownToClose = true,
      index = 0,
      onDismiss,
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
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={memoSnapPoints}
        backgroundStyle={backgroundStyle}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing
        onDismiss={onDismiss}
        backdropComponent={bottomSheetBackdropRenderer}
      >
        {children}
      </BottomSheetModal>
    );
  },
);

export default React.memo(BaseBottomSheetModal);

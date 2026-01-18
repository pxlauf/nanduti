import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface BottomSheetProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  snapPoints?: string[];
}

export const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  children,
  isVisible,
  onClose,
  snapPoints = ['25%', '50%', '75%'],
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useMemo(
    () => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={onClose}
      />
    ),
    [onClose]
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={isVisible ? 0 : -1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onClose={onClose}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
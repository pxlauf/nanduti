import React, { useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  onClose?: () => void;
}

/**
 * Modal bottom sheet component
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  snapPoints = ['25%', '50%', '90%'],
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose?.();
    }
  }, [onClose]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={Handle}
        enablePanDownToClose={true}
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={styles.content}>{children}</BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const Handle = () => {
  return (
    <View style={styles.handleContainer}>
      <View style={styles.handle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});

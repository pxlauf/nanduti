import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Map, SearchBar, StopCard, BottomSheet } from '../components';
import { useLocation } from '../hooks/useLocation';
import { useRoute } from '../hooks/useRoute';
import { BusStop, Route } from '../types';

export const HomeScreen: React.FC = () => {
  const { location, error: locationError } = useLocation();
  const { routes, stops, searchRoutes, searchStops } = useRoute();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchRoutes(searchQuery);
      searchStops(searchQuery);
    }
  }, [searchQuery]);

  const handleMarkerPress = (stop: BusStop) => {
    setSelectedStop(stop);
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
    setSelectedStop(null);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => {}}
      />
      
      <Map
        stops={stops}
        routes={routes}
        userLocation={location}
        onMarkerPress={handleMarkerPress}
      />

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
      >
        {selectedStop && (
          <StopCard
            stop={selectedStop}
            onPress={handleCloseBottomSheet}
          />
        )}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
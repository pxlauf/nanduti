import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Map, SearchBar, StopCard, BottomSheet } from '@components';
import { Stop, MapRegion } from '@types';
import { DEFAULT_LOCATION, MAP_PADDING } from '@utils/constants';

interface HomeScreenProps {
  navigation: any;
}

/**
 * Main home screen with map and search functionality
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [region, setRegion] = useState<MapRegion>(DEFAULT_LOCATION);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [nearbyStops, setNearbyStops] = useState<Stop[]>([]);

  const handleRegionChange = (newRegion: MapRegion) => {
    setRegion(newRegion);
  };

  const handleMarkerPress = (stop: Stop) => {
    setSelectedStop(stop);
    Keyboard.dismiss();
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <Map
        region={region}
        onRegionChange={handleRegionChange}
        onMarkerPress={handleMarkerPress}
        showUserLocation={true}
      />
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      {selectedStop && (
        <BottomSheet snapPoints={['25%', '50%']} onClose={() => setSelectedStop(null)}>
          <StopCard stop={selectedStop} />
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

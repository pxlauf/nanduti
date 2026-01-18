import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Region, LatLng } from 'react-native-maps';
import { Stop, LinePolyline } from '@types';

interface MapProps {
  region?: Region;
  stops?: Stop[];
  polylines?: LinePolyline[];
  onRegionChange?: (region: Region) => void;
  onMarkerPress?: (stop: Stop) => void;
  showUserLocation?: boolean;
  userLocation?: LatLng;
}

/**
 * MapView component wrapper for displaying transit map
 */
export const Map: React.FC<MapProps> = ({
  region,
  stops = [],
  polylines = [],
  onRegionChange,
  onMarkerPress,
  showUserLocation = false,
  userLocation,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={showUserLocation}
        followsUserLocation={showUserLocation}
      >
        {userLocation && (
          <Marker coordinate={userLocation} identifier="userLocation" />
        )}
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            identifier={`stop-${stop.id}`}
            onPress={() => onMarkerPress?.(stop)}
          />
        ))}
        {polylines.map((polyline) => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.geojson.coordinates.map(coord => ({
              latitude: coord[1],
              longitude: coord[0],
            }))}
            strokeColor="#000"
            strokeWidth={2}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

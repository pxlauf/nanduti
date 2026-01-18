import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { BusStop, Route } from '../types';

interface MapProps {
  stops: BusStop[];
  routes: Route[];
  userLocation?: { latitude: number; longitude: number };
  onMarkerPress: (stop: BusStop) => void;
}

export const Map: React.FC<MapProps> = ({ 
  stops, 
  routes, 
  userLocation, 
  onMarkerPress 
}) => {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={
          userLocation || {
            latitude: -25.2637,
            longitude: -57.5779,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        showsUserLocation={true}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            identifier="user"
          />
        )}
        
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.name}
            onPress={() => onMarkerPress(stop)}
          />
        ))}
        
        {routes.map((route) => (
          <Polyline
            key={route.id}
            coordinates={route.path}
            strokeColor={route.color}
            strokeWidth={3}
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
    width: '100%',
    height: '100%',
  },
});
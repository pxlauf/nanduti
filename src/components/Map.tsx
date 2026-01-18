import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Region, LatLng, Marker as MapMarker } from 'react-native-maps';
import { Stop, LinePolyline, TravelRoute } from '../types';
import { COLORS } from '../utils/constants';

interface MapProps {
  region?: Region;
  stops?: Stop[];
  polylines?: LinePolyline[];
  route?: TravelRoute;
  onRegionChange?: (region: Region) => void;
  onMarkerPress?: (stop: Stop) => void;
  showUserLocation?: boolean;
  userLocation?: LatLng;
}

export const Map: React.FC<MapProps> = ({
  region,
  stops = [],
  polylines = [],
  route,
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
        {/* User location marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            identifier="userLocation"
            pinColor={COLORS.primary}
          />
        )}

        {/* Stop markers */}
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            identifier={`stop-${stop.id}`}
            onPress={() => onMarkerPress?.(stop)}
            pinColor="red"
          />
        ))}

        {/* Route polylines */}
        {route && route.line && (
          <>
            {polylines
              .filter(p => p.line_id === route.line!.id)
              .map((polyline) => (
                <Polyline
                  key={polyline.id}
                  coordinates={polyline.geojson.coordinates.map((coord: [number, number]) => ({
                    latitude: coord[1],
                    longitude: coord[0],
                  }))}
                  strokeColor={route.line!.color}
                  strokeWidth={4}
                />
              ))}
          </>
        )}

        {/* Transfer route polylines */}
        {route && route.type === 'transfer' && route.firstLine && route.secondLine && (
          <>
            {polylines
              .filter(p => p.line_id === route.firstLine!.id)
              .map((polyline) => (
                <Polyline
                  key={`first-${polyline.id}`}
                  coordinates={polyline.geojson.coordinates.map((coord: [number, number]) => ({
                    latitude: coord[1],
                    longitude: coord[0],
                  }))}
                  strokeColor={route.firstLine!.color}
                  strokeWidth={4}
                />
              ))}
            {polylines
              .filter(p => p.line_id === route.secondLine!.id)
              .map((polyline) => (
                <Polyline
                  key={`second-${polyline.id}`}
                  coordinates={polyline.geojson.coordinates.map((coord: [number, number]) => ({
                    latitude: coord[1],
                    longitude: coord[0],
                  }))}
                  strokeColor={route.secondLine!.color}
                  strokeWidth={4}
                />
              ))}
          </>
        )}

        {/* All line polylines (when no route selected) */}
        {!route && polylines.map((polyline) => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.geojson.coordinates.map((coord: [number, number]) => ({
              latitude: coord[1],
              longitude: coord[0],
            }))}
            strokeColor="#999999"
            strokeWidth={2}
            lineDashPattern={[5, 5]}
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

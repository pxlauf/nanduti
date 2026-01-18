import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Map, RouteCard } from '@components';
import { Stop, Line, MapRegion } from '@types';
import { DEFAULT_LOCATION } from '@utils/constants';

interface RouteDetailScreenProps {
  route: {
    params: {
      lineId: number;
      stops: Stop[];
    };
  };
  navigation: any;
}

/**
 * Screen displaying detailed route information for a line
 */
export const RouteDetailScreen: React.FC<RouteDetailScreenProps> = ({ route, navigation }) => {
  const { lineId, stops } = route.params;
  const [line, setLine] = React.useState<Line | null>(null);
  const [region, setRegion] = React.useState<MapRegion>(DEFAULT_LOCATION);

  React.useEffect(() => {
    navigation.setOptions({ title: line?.name || 'Route Details' });
  }, [line, navigation]);

  const renderStop = ({ item, index }: { item: Stop; index: number }) => (
    <View style={styles.stopRow}>
      <View style={styles.stopIndexContainer}>
        <Text style={styles.stopIndex}>{index + 1}</Text>
      </View>
      <View style={styles.stopInfo}>
        <Text style={styles.stopName}>{item.name}</Text>
        {item.neighborhood && (
          <Text style={styles.stopNeighborhood}>{item.neighborhood}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map
          region={region}
          stops={stops}
          onRegionChange={setRegion}
        />
      </View>
      <View style={styles.infoContainer}>
        {line && (
          <View style={styles.lineHeader}>
            <View style={[styles.lineBadge, { backgroundColor: line.color }]}>
              <Text style={styles.lineName}>{line.name}</Text>
            </View>
          </View>
        )}
        <View style={styles.stopsHeader}>
          <Text style={styles.stopsTitle}>Stops ({stops.length})</Text>
        </View>
        <FlatList
          data={stops}
          renderItem={renderStop}
          keyExtractor={(item) => item.id.toString()}
          style={styles.stopsList}
          contentContainerStyle={styles.stopsListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    height: '40%',
  },
  infoContainer: {
    flex: 1,
  },
  lineHeader: {
    padding: 16,
    alignItems: 'center',
  },
  lineBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  lineName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stopsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  stopsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  stopsList: {
    flex: 1,
  },
  stopsListContent: {
    paddingVertical: 8,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  stopIndexContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stopIndex: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  stopNeighborhood: {
    fontSize: 13,
    color: '#757575',
  },
});

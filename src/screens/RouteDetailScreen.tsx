import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Map, RouteCard, LoadingSpinner } from '../components';
import { TravelRoute, RootStackParamList, RouteStep } from '../types';
import { COLORS } from '../utils/constants';
import { fetchAllStops, fetchAllPolylines } from '../services/supabase';

type RouteDetailScreenRouteProp = RouteProp<RootStackParamList, 'RouteDetail'>;
type RouteDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface RouteDetailScreenProps {
  route: RouteDetailScreenRouteProp;
  navigation: RouteDetailScreenNavigationProp;
}

export const RouteDetailScreen: React.FC<RouteDetailScreenProps> = ({ route, navigation }) => {
  const { route: travelRoute } = route.params;
  const [stops, setStops] = React.useState<any[]>([]);
  const [polylines, setPolylines] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: travelRoute.type === 'direct' ? 'Ruta Directa' : 'Ruta con Transbordo',
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: '700',
      },
    });
  }, [navigation, travelRoute]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [stopsData, polylinesData] = await Promise.all([
        fetchAllStops(),
        fetchAllPolylines(),
      ]);

      setStops(stopsData);
      setPolylines(polylinesData);
    } catch (error) {
      // Silently handle loading errors
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (step: RouteStep) => {
    switch (step.type) {
      case 'walk':
        return '🚶';
      case 'bus':
        return '🚌';
      case 'transfer':
        return '🔄';
      default:
        return '📍';
    }
  };

  const getStepColor = (step: RouteStep) => {
    switch (step.type) {
      case 'walk':
        return '#757575';
      case 'bus':
        return step.line?.color || COLORS.primary;
      case 'transfer':
        return COLORS.secondary;
      default:
        return COLORS.text;
    }
  };

  const renderStep = ({ item, index }: { item: RouteStep; index: number }) => (
    <View style={styles.stepContainer}>
      <View style={[styles.stepIcon, { backgroundColor: getStepColor(item) }]}>
        <Text style={styles.stepIconText}>{getStepIcon(item)}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepInstruction}>{item.instruction}</Text>
        {(item.duration !== undefined || item.distance !== undefined) && (
          <View style={styles.stepDetails}>
            {item.duration !== undefined && (
              <Text style={styles.stepDetailText}>{item.duration} min</Text>
            )}
            {item.distance !== undefined && item.distance > 0 && (
              <Text style={styles.stepDetailText}>{item.distance}m</Text>
            )}
          </View>
        )}
      </View>
      {index < travelRoute.steps.length - 1 && (
        <View style={[styles.stepConnector, { backgroundColor: getStepColor(item) }]} />
      )}
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <Map
          stops={stops}
          polylines={polylines}
          route={travelRoute}
        />
      </View>

      {/* Route Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duración</Text>
            <Text style={styles.summaryValue}>{travelRoute.totalTime} min</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Distancia</Text>
            <Text style={styles.summaryValue}>{travelRoute.totalDistance}m</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tipo</Text>
            <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
              {travelRoute.type === 'direct' ? 'Directo' : 'Transbordo'}
            </Text>
          </View>
        </View>
      </View>

      {/* Route Steps */}
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsTitle}>Instrucciones</Text>
        <FlatList
          data={travelRoute.steps}
          renderItem={renderStep}
          keyExtractor={(item, index) => `step-${index}`}
          contentContainerStyle={styles.stepsList}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.understoodButton}
              onPress={() => {
                triggerHaptic();
                navigation.goBack();
              }}
            >
              <Text style={styles.understoodButtonText}>Entendido</Text>
            </TouchableOpacity>
          }
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
  summaryContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  stepsContainer: {
    flex: 1,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  stepsList: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepIconText: {
    fontSize: 20,
  },
  stepContent: {
    flex: 1,
    paddingVertical: 8,
  },
  stepInstruction: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  stepDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  stepDetailText: {
    fontSize: 13,
    color: '#757575',
  },
  stepConnector: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: -24,
    width: 2,
  },
  understoodButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  understoodButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

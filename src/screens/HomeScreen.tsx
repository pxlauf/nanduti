import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Map, SearchBar, StopCard, RouteCard, BottomSheet, LoadingSpinner } from '../components';
import { Stop, MapRegion, RootStackParamList, TravelRoute } from '../types';
import { DEFAULT_LOCATION, MAP_PADDING, COLORS } from '../utils/constants';
import { useLocation } from '../hooks/useLocation';
import { useRoute } from '../hooks/useRoute';
import { fetchAllStops, fetchAllPolylines, searchStops } from '../services/supabase';
import { findNearestStop } from '../services/routing';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

type PlanningStep = 'origin' | 'destination' | 'results';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  const [region, setRegion] = useState<MapRegion>(DEFAULT_LOCATION);
  const [allStops, setAllStops] = useState<Stop[]>([]);
  const [allPolylines, setAllPolylines] = useState<any[]>([]);
  const [filteredStops, setFilteredStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [nearbyStop, setNearbyStop] = useState<Stop | null>(null);

  // Route planning state
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningStep, setPlanningStep] = useState<PlanningStep>('origin');
  const [originStop, setOriginStop] = useState<Stop | null>(null);
  const [destinationStop, setDestinationStop] = useState<Stop | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'origin' | 'destination'>('origin');

  // Hooks
  const { location, loading: locationLoading } = useLocation();
  const { routes, loading: routesLoading, findRoutes, clearRoutes, error: routesError } = useRoute();

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update region when location changes
  useEffect(() => {
    if (location) {
      setRegion({
        ...region,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // Find nearby stop for origin
      const nearest = findNearestStop(location, allStops);
      if (nearest) {
        setNearbyStop(nearest);
        setOriginStop(nearest);
      }
    }
  }, [location, allStops]);

  const loadData = async () => {
    try {
      const [stopsData, polylinesData] = await Promise.all([
        fetchAllStops(),
        fetchAllPolylines(),
      ]);

      setAllStops(stopsData);
      setAllPolylines(polylinesData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos. Por favor verifica tu conexión.');
    }
  };

  const handleRegionChange = (newRegion: MapRegion) => {
    setRegion(newRegion);
  };

  const handleMarkerPress = (stop: Stop) => {
    setSelectedStop(stop);
    Keyboard.dismiss();
  };

  const handleSearchChange = async (text: string) => {
    setSearchQuery(text);

    if (text.length >= 2) {
      try {
        const results = await searchStops(text);
        setFilteredStops(results);
      } catch (error) {
        // Silently handle search errors
        setFilteredStops([]);
      }
    } else {
      setFilteredStops([]);
    }
  };

  const handleSelectStop = (stop: Stop) => {
    if (searchType === 'origin') {
      setOriginStop(stop);
      setPlanningStep('destination');
      setSearchQuery('');
      setFilteredStops([]);
      setSearchType('destination');
    } else {
      setDestinationStop(stop);
      setPlanningStep('results');
      setSearchQuery('');
      setFilteredStops([]);

      // Find routes
      if (originStop) {
        findRoutes(originStop, stop, allStops);
      }
    }
  };

  const handlePlanRoute = () => {
    triggerHaptic();
    setIsPlanning(true);
    setPlanningStep('origin');
    setOriginStop(nearbyStop);
    setDestinationStop(null);
    setSearchType('origin');
  };

  const handleRoutePress = (route: TravelRoute) => {
    triggerHaptic();
    navigation.navigate('RouteDetail', { route });
  };

  const closePlanning = () => {
    setIsPlanning(false);
    setPlanningStep('origin');
    clearRoutes();
  };

  const renderStopItem = ({ item }: { item: Stop }) => (
    <StopCard
      stop={item}
      onPress={() => handleSelectStop(item)}
    />
  );

  const renderRouteItem = ({ item }: { item: TravelRoute }) => (
    <RouteCard
      route={item}
      onPress={() => handleRoutePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Map
        region={region}
        stops={allStops}
        polylines={allPolylines}
        onRegionChange={handleRegionChange}
        onMarkerPress={handleMarkerPress}
        showUserLocation={true}
        userLocation={location || undefined}
      />

      {/* Planning FAB */}
      {!isPlanning && !locationLoading && (
        <TouchableOpacity
          style={styles.fab}
          onPress={handlePlanRoute}
        >
          <Text style={styles.fabText}>Planificar Ruta</Text>
        </TouchableOpacity>
      )}

      {/* Selected Stop Bottom Sheet */}
      {selectedStop && !isPlanning && (
        <BottomSheet
          onClose={() => setSelectedStop(null)}
        >
          <View style={styles.stopDetailContainer}>
            <StopCard stop={selectedStop} />
            <TouchableOpacity
              style={styles.useAsOriginButton}
              onPress={() => {
                setSelectedStop(null);
                handlePlanRoute();
              }}
            >
              <Text style={styles.useAsOriginText}>Usar como origen</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      )}

      {/* Route Planning Modal */}
      {isPlanning && (
        <View style={styles.planningModal}>
          <View style={styles.planningHeader}>
            <TouchableOpacity onPress={closePlanning}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.planningTitle}>Planificar Ruta</Text>
            <View style={styles.spacer} />
          </View>

          {/* Origin and Destination Selection */}
          {planningStep !== 'results' && (
            <View style={styles.selectionContainer}>
              {/* Origin */}
              <TouchableOpacity
                style={[
                  styles.selectionBox,
                  searchType === 'origin' && styles.selectionBoxActive,
                ]}
                onPress={() => {
                  setSearchType('origin');
                  setPlanningStep('origin');
                }}
              >
                <Text style={styles.selectionLabel}>Origen</Text>
                {originStop ? (
                  <Text style={styles.selectionValue}>{originStop.name}</Text>
                ) : (
                  <Text style={styles.selectionPlaceholder}>
                    {nearbyStop ? nearbyStop.name : 'Seleccionar...'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Arrow */}
              <Text style={styles.arrow}>↓</Text>

              {/* Destination */}
              <TouchableOpacity
                style={[
                  styles.selectionBox,
                  searchType === 'destination' && styles.selectionBoxActive,
                ]}
                onPress={() => {
                  if (originStop) {
                    setSearchType('destination');
                    setPlanningStep('destination');
                  }
                }}
                disabled={!originStop}
              >
                <Text style={styles.selectionLabel}>Destino</Text>
                {destinationStop ? (
                  <Text style={styles.selectionValue}>{destinationStop.name}</Text>
                ) : (
                  <Text style={styles.selectionPlaceholder}>Seleccionar...</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Search Input */}
          {planningStep !== 'results' && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={
                  searchType === 'origin'
                    ? 'Buscar origen...'
                    : 'Buscar destino...'
                }
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoFocus
              />
            </View>
          )}

          {/* Search Results */}
          {planningStep !== 'results' && filteredStops.length > 0 && (
            <FlatList
              data={filteredStops}
              renderItem={renderStopItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.resultsList}
            />
          )}

          {/* Loading */}
          {routesLoading && <LoadingSpinner />}

          {/* Error */}
          {routesError && !routesLoading && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{routesError}</Text>
            </View>
          )}

          {/* Route Results */}
          {planningStep === 'results' && !routesLoading && routes.length > 0 && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>
                {routes.length} ruta{routes.length > 1 ? 's' : ''} encontrada{routes.length > 1 ? 's' : ''}
              </Text>
              <FlatList
                data={routes}
                renderItem={renderRouteItem}
                keyExtractor={(item) => item.id}
                style={styles.resultsList}
              />
            </View>
          )}

          {/* No Routes */}
          {planningStep === 'results' && !routesLoading && routes.length === 0 && !routesError && (
            <View style={styles.noRoutesContainer}>
              <Text style={styles.noRoutesText}>No se encontraron rutas disponibles</Text>
              <TouchableOpacity
                style={styles.tryAgainButton}
                onPress={() => setPlanningStep('origin')}
              >
                <Text style={styles.tryAgainText}>Intentar de nuevo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Loading indicator for initial load */}
      {locationLoading && allStops.length === 0 && <LoadingSpinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 100,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  planningModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  planningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cancelButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  planningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  spacer: {
    width: 60,
  },
  selectionContainer: {
    padding: 16,
    gap: 12,
  },
  selectionBox: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectionBoxActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#E8F5E9',
  },
  selectionLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  selectionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  selectionPlaceholder: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  arrow: {
    textAlign: 'center',
    fontSize: 20,
    color: '#757575',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resultsList: {
    flex: 1,
  },
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  errorContainer: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: COLORS.error,
    textAlign: 'center',
  },
  noRoutesContainer: {
    padding: 32,
    alignItems: 'center',
  },
  noRoutesText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  tryAgainButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  tryAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  stopDetailContainer: {
    padding: 16,
  },
  useAsOriginButton: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  useAsOriginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

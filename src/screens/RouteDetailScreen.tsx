import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteCard, StopCard } from '../components';
import { Route, BusStop } from '../types';

interface RouteDetailScreenProps {
  route: Route;
  stops: BusStop[];
}

export const RouteDetailScreen: React.FC<RouteDetailScreenProps> = ({ route, stops }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <RouteCard
          route={route}
          onPress={() => {}}
        />

        <Text style={styles.sectionTitle}>Stops on this route:</Text>

        {stops.map((stop) => (
          <StopCard
            key={stop.id}
            stop={stop}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Route } from '../types';

interface RouteCardProps {
  route: Route;
  onPress: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.header, { borderLeftColor: route.color }]}>
        <Text style={styles.name}>{route.name}</Text>
        <Text style={styles.description}>{route.description}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.info}>Stops: {route.stops?.length || 0}</Text>
        <Text style={styles.info}>Distance: {route.distance?.toFixed(2) || 'N/A'} km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: {
    borderLeftWidth: 4,
    paddingLeft: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    fontSize: 12,
    color: '#666',
  },
});
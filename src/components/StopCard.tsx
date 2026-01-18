import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BusStop } from '../types';

interface StopCardProps {
  stop: BusStop;
  onPress: () => void;
}

export const StopCard: React.FC<StopCardProps> = ({ stop, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{stop.name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.coordinates}>Lat: {stop.latitude.toFixed(6)}, Lon: {stop.longitude.toFixed(6)}</Text>
        {stop.lines && stop.lines.length > 0 && (
          <View style={styles.linesContainer}>
            <Text style={styles.linesLabel}>Lines: </Text>
            {stop.lines.map((line) => (
              <View key={line.id} style={[styles.lineBadge, { backgroundColor: line.color }]}>
                <Text style={styles.lineText}>{line.name}</Text>
              </View>
            ))}
          </View>
        )}
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
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    marginTop: 5,
  },
  coordinates: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  linesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linesLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 5,
  },
  lineBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  lineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
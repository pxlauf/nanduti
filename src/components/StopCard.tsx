import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stop } from '../types';

interface StopCardProps {
  stop: Stop;
  onPress?: () => void;
  distance?: number;
}

/**
 * Card component displaying stop information
 */
export const StopCard: React.FC<StopCardProps> = ({
  stop,
  onPress,
  distance,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {stop.name}
        </Text>
        {stop.neighborhood && (
          <Text style={styles.neighborhood} numberOfLines={1}>
            {stop.neighborhood}
          </Text>
        )}
        {distance !== undefined && (
          <Text style={styles.distance}>{Math.round(distance)}m away</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  neighborhood: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  distance: {
    fontSize: 12,
    color: '#2E7D32',
  },
});

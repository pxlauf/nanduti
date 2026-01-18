import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteSuggestion } from '@types';

interface RouteCardProps {
  route: RouteSuggestion;
  onPress?: () => void;
}

/**
 * Card component displaying route suggestion
 */
export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.header, { borderLeftColor: route.line.color }]}>
        <Text style={[styles.lineName, { color: route.line.color }]}>
          {route.line.name}
        </Text>
        <Text style={styles.stopsCount}>{route.stops.length} stops</Text>
      </View>
      {route.line.description && (
        <Text style={styles.description} numberOfLines={2}>
          {route.line.description}
        </Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.distance}>{Math.round(route.distance)}m</Text>
        {route.estimatedTime && (
          <Text style={styles.time}>~{route.estimatedTime} min</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  lineName: {
    fontSize: 18,
    fontWeight: '700',
  },
  stopsCount: {
    fontSize: 14,
    color: '#757575',
  },
  description: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: 13,
    color: '#757575',
  },
  time: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '600',
  },
});

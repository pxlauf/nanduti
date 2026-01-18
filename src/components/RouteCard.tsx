import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TravelRoute } from '../types';
import { COLORS } from '../utils/constants';

interface RouteCardProps {
  route: TravelRoute;
  onPress?: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  onPress,
}) => {
  const getLineColor = () => {
    if (route.type === 'direct' && route.line) {
      return route.line.color;
    }
    return COLORS.primary;
  };

  const getBadgeText = () => {
    if (route.type === 'direct' && route.line) {
      return route.line.name;
    }
    if (route.type === 'transfer' && route.firstLine && route.secondLine) {
      return `${route.firstLine.name} → ${route.secondLine.name}`;
    }
    return 'Ruta';
  };

  const getBadgeType = () => {
    return route.type === 'direct' ? 'Directo' : 'Transbordo';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={[styles.lineInfo, { borderLeftColor: getLineColor() }]}>
          <Text style={[styles.lineName, { color: getLineColor() }]}>
            {getBadgeText()}
          </Text>
          <View style={[styles.typeBadge, { backgroundColor: getLineColor() }]}>
            <Text style={styles.typeText}>{getBadgeType()}</Text>
          </View>
        </View>
        <Text style={styles.time}>{route.totalTime} min</Text>
      </View>
      <View style={styles.details}>
        <Text style={stopsCount}>{route.steps.length} pasos</Text>
        <Text style={styles.distance}>{route.totalDistance}m total</Text>
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
  },
  lineInfo: {
    flex: 1,
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginRight: 12,
  },
  lineName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  time: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: 13,
    color: '#757575',
  },
});

const stopsCount = StyleSheet.compose(styles.distance, {
  fontWeight: '600',
});

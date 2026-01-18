export interface Stop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
}

export interface Line {
  id: number;
  name: string;
  description?: string;
  color: string;
}

export interface Route {
  id: number;
  line_id: number;
  stop_id: number;
  order: number;
}

export interface LinePolyline {
  id: number;
  line_id: number;
  geojson: {
    type: 'LineString';
    coordinates: [number, number][];
  };
}

export interface RouteStop extends Route {
  stop: Stop;
}

export interface LineWithRoutes extends Line {
  routes: RouteStop[];
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface RouteSuggestion {
  line: Line;
  stops: Stop[];
  distance: number;
  estimatedTime?: number;
  type: 'direct' | 'transfer';
  transferStop?: Stop;
  firstLine?: Line;
  secondLine?: Line;
}

export interface RouteStep {
  type: 'walk' | 'bus' | 'transfer';
  instruction: string;
  distance?: number;
  line?: Line;
  duration?: number;
  stop?: Stop;
}

export interface TravelRoute {
  id: string;
  type: 'direct' | 'transfer';
  origin: Stop | Location;
  destination: Stop;
  steps: RouteStep[];
  totalDistance: number;
  totalTime: number;
  line?: Line;
  firstLine?: Line;
  secondLine?: Line;
  transferStop?: Stop;
}

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type RootStackParamList = {
  Home: undefined;
  RouteDetail: {
    route: TravelRoute;
  };
};

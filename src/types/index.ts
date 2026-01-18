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
  geojson: GeoJSON.LineString;
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
}

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type NavigationParams = {
  RouteDetail?: {
    lineId: number;
    stops: Stop[];
  };
};

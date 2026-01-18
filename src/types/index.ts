export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lines?: Line[];
}

export interface Route {
  id: string;
  name: string;
  description: string;
  color: string;
  stops?: BusStop[];
  path?: { latitude: number; longitude: number }[];
  distance?: number;
}

export interface Line {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface RouteSuggestion {
  route: Route;
  distance: number;
  transfers: number;
  estimatedTime: number;
}
export const APP_CONSTANTS = {
  DEFAULT_LOCATION: {
    latitude: -25.2637,
    longitude: -57.5779,
  },
  MAP_REGION: {
    latitude: -25.2637,
    longitude: -57.5779,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  SEARCH_DEBOUNCE_TIME: 500,
  MAX_SEARCH_RESULTS: 10,
  NEARBY_STOP_RADIUS: 0.5, // 500 meters
};

export const COLORS = {
  PRIMARY: '#4285F4',
  SECONDARY: '#34A853',
  ACCENT: '#EA4335',
  BACKGROUND: '#F5F5F5',
  TEXT: '#333333',
  TEXT_SECONDARY: '#666666',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

export const API_ENDPOINTS = {
  STOPS: '/stops',
  ROUTES: '/routes',
  LINES: '/lines',
  SEARCH: '/search',
};
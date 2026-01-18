export const Colors = {
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',
  
  secondary: '#FFC107',
  secondaryLight: '#FFD54F',
  secondaryDark: '#FFA000',
  
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceVariant: '#EEEEEE',
  
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  
  border: '#E0E0E0',
  borderLight: '#F5F5F5',
  
  error: '#D32F2F',
  errorLight: '#EF5350',
  errorDark: '#C62828',
  
  success: '#388E3C',
  successLight: '#66BB6A',
  successDark: '#2E7D32',
  
  warning: '#FFA000',
  warningLight: '#FFB74D',
  warningDark: '#F57C00',
  
  info: '#1976D2',
  infoLight: '#42A5F5',
  infoDark: '#1565C0',
  
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

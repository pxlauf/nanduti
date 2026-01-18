import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

/**
 * Search input component for finding stops or routes
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search stops...',
  value = '',
  onChangeText,
  onClear,
  autoFocus = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    height: 44,
    backgroundColor: '#F5F5F5',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});

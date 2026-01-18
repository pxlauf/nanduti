import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen, RouteDetailScreen } from './src/screens';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Ñanduti',
              headerStyle: {
                backgroundColor: '#2E7D32',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name="RouteDetail"
            component={RouteDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

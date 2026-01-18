import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen, RouteDetailScreen } from '@screens';
import { Stop, MapRegion } from '@types';

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  MainTabs: undefined;
  RouteDetail: {
    lineId: number;
    stops: Stop[];
  };
};

type RouteDetailScreenRouteProp = {
  params: {
    lineId: number;
    stops: Stop[];
  };
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              tabBarLabel: 'Map',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Map',
        }}
      />
    </Tab.Navigator>
  );
}

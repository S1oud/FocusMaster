import React from 'react';
import { Text, SafeAreaView, StyleSheet, Button, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyCalendar from './components/MyCalendar';
import ToDo from './components/ToDo';
import StopWatch from './components/AssetExample'

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Study Schedule" component={StopWatch} options = {{
        tabBarIcon: ({color, size}) => (
          <Icon name = "book" color = {color} size = {size} />
        ),
      }} />
      <Tab.Screen name="Calendar" component={MyCalendar} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Daily Activities" component={ToDo} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="check-square" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}
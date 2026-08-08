import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import GenerateScreen from '../screens/GenerateScreen';
import OutputScreen from '../screens/OutputScreen';
import QuizPlayerScreen from '../screens/QuizPlayerScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GenerateScreen" component={GenerateScreen} />
        <Stack.Screen name="OutputScreen" component={OutputScreen} />
        <Stack.Screen name="QuizPlayerScreen" component={QuizPlayerScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

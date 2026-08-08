import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { getOnboardingStatus } from '../utils/storage';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      const completed = await getOnboardingStatus();
      setTimeout(() => {
        if (!isMounted) return;
        if (completed) {
          navigation.replace('HomeScreen');
        } else {
          navigation.replace('OnboardingScreen');
        }
      }, 1800);
    };

    checkStatus();
    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <View className="flex-1 bg-indigo-950 items-center justify-center px-6">
      <View className="w-28 h-28 rounded-3xl bg-indigo-600 items-center justify-center mb-6 shadow-2xl shadow-indigo-500/50">
        <Text className="text-white text-5xl font-black">T</Text>
      </View>
      <Text className="text-white font-black text-5xl tracking-tight mb-2">
        TeachMate
      </Text>
      <Text className="text-indigo-200 text-lg font-medium text-center">
        AI-Powered Quiz & Test Paper Companion
      </Text>

      <View className="absolute bottom-12 items-center">
        <View className="flex-row items-center bg-indigo-900/60 px-4 py-2 rounded-full border border-indigo-700/50">
          <Text className="text-indigo-300 text-xs font-semibold uppercase tracking-widest">
            Top 50 Hackathon Edition
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

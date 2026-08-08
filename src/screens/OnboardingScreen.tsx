import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { setOnboardingStatus } from '../utils/storage';
import CustomButton from '../components/CustomButton';

type OnboardingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OnboardingScreen'>;
};

const slides = [
  {
    icon: '⚡',
    title: 'Instant AI Quiz Generation',
    description:
      'Generate comprehensive test papers and quizzes on any subject in seconds using Gemini AI.',
  },
  {
    icon: '🎯',
    title: 'Custom Level & Difficulty',
    description:
      'Tailor questions for Kindergarten to Higher Education with flexible MCQ, True/False & Short Answer options.',
  },
  {
    icon: '🚀',
    title: 'Interactive Play & Export',
    description:
      'Play quizzes interactively inside the app with instant scoring, or export formatted test papers with answer keys.',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFinish = async () => {
    await setOnboardingStatus(true);
    navigation.replace('HomeScreen');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <View className="flex-1 bg-slate-900 justify-between px-6 pt-16 pb-12">
      {/* Top Bar: Skip */}
      <View className="flex-row justify-end">
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={handleFinish} className="px-4 py-2 bg-slate-800 rounded-full">
            <Text className="text-slate-300 font-semibold text-sm">Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Slide Card */}
      <View className="items-center px-4 my-auto">
        <View className="w-32 h-32 rounded-full bg-indigo-600/20 border border-indigo-500/30 items-center justify-center mb-10 shadow-2xl">
          <Text className="text-6xl">{slides[currentIndex].icon}</Text>
        </View>

        <Text className="text-white font-extrabold text-3xl text-center mb-4 leading-tight">
          {slides[currentIndex].title}
        </Text>

        <Text className="text-slate-400 text-lg text-center leading-relaxed max-w-xs">
          {slides[currentIndex].description}
        </Text>
      </View>

      {/* Bottom Actions & Dots */}
      <View className="w-full">
        {/* Pagination Dots */}
        <View className="flex-row justify-center space-x-3 mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-indigo-500'
                  : 'w-2.5 bg-slate-700'
              }`}
            />
          ))}
        </View>

        <CustomButton
          title={currentIndex === slides.length - 1 ? 'Get Started 🚀' : 'Continue →'}
          onPress={handleNext}
          className="w-full py-5"
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

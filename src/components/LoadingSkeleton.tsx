import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingSkeletonProps {
  message?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  message = 'Gemini AI is crafting your quiz...',
}) => {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-slate-50">
      <View className="w-24 h-24 rounded-full bg-indigo-100 items-center justify-center mb-6 shadow-inner">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
      <Text className="text-slate-900 font-extrabold text-2xl text-center mb-2">
        Generating Questions
      </Text>
      <Text className="text-slate-500 text-base text-center max-w-xs mb-8">
        {message}
      </Text>

      <View className="w-full space-y-4 max-w-sm">
        <View className="w-full h-16 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm opacity-60 justify-center">
          <View className="w-3/4 h-4 bg-slate-200 rounded-full" />
        </View>
        <View className="w-full h-16 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm opacity-40 justify-center">
          <View className="w-1/2 h-4 bg-slate-200 rounded-full" />
        </View>
        <View className="w-full h-16 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm opacity-20 justify-center">
          <View className="w-2/3 h-4 bg-slate-200 rounded-full" />
        </View>
      </View>
    </View>
  );
};

export default LoadingSkeleton;

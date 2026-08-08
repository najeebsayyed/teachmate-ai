import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack, rightAction }) => {
  return (
    <View className="w-full flex-row items-center justify-between py-4 px-1">
      <View className="flex-row items-center flex-1">
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center mr-3 shadow-sm"
          >
            <Text className="text-slate-800 text-lg font-bold">←</Text>
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text className="text-slate-900 font-extrabold text-2xl tracking-tight">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-slate-500 text-sm font-medium">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && <View className="ml-2">{rightAction}</View>}
    </View>
  );
};

export default Header;

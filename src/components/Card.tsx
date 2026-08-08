import React from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', style, onPress }) => {
  const containerStyles = `bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-slate-200/50 ${className}`;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={containerStyles}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={containerStyles} style={style}>
      {children}
    </View>
  );
};

export default Card;

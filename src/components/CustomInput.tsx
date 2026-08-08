import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerClassName = '',
  icon,
  ...props
}) => {
  return (
    <View className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-slate-700 font-semibold text-base mb-2">
          {label}
        </Text>
      )}
      <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3.5 shadow-sm focus:border-indigo-500">
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          className="flex-1 text-slate-900 text-lg font-medium"
          placeholderTextColor="#94A3B8"
          {...props}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};

export default CustomInput;

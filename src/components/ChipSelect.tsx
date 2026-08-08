import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ChipSelectProps {
  label?: string;
  options: string[];
  selectedValues: string[];
  onSelect: (selected: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}

const ChipSelect: React.FC<ChipSelectProps> = ({
  label,
  options,
  selectedValues,
  onSelect,
  multiSelect = true,
  className = '',
}) => {
  const toggleOption = (option: string) => {
    if (multiSelect) {
      if (selectedValues.includes(option)) {
        onSelect(selectedValues.filter(v => v !== option));
      } else {
        onSelect([...selectedValues, option]);
      }
    } else {
      onSelect([option]);
    }
  };

  return (
    <View className={`w-full mb-5 ${className}`}>
      {label && (
        <Text className="text-slate-800 font-semibold text-base mb-2.5">
          {label}
        </Text>
      )}
      <View className="flex-row flex-wrap gap-2.5">
        {options.map(option => {
          const isSelected = selectedValues.includes(option);
          return (
            <TouchableOpacity
              key={option}
              onPress={() => toggleOption(option)}
              activeOpacity={0.7}
              className={`px-5 py-3 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <Text
                className={`font-semibold text-base ${
                  isSelected ? 'text-white' : 'text-slate-700'
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ChipSelect;

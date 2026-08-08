import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  text: string;
  className?: string;
  textStyle?: StyleProp<TextStyle>;
}

const CustomText: React.FC<CustomTextProps> = ({ text, className = '', textStyle, ...props }) => {
  return (
    <Text
      className={`text-slate-800 text-lg font-medium ${className}`}
      style={textStyle}
      {...props}
    >
      {text}
    </Text>
  );
};

export default CustomText;

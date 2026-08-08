import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  className = '',
  textClassName = '',
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
}) => {
  let baseStyles = 'rounded-2xl px-6 py-4 flex-row items-center justify-center active:scale-[0.98] transition-all';
  let variantStyles = '';
  let textVariantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 shadow-lg shadow-indigo-200 border border-indigo-500';
      textVariantStyles = 'text-white font-bold text-lg';
      break;
    case 'secondary':
      variantStyles = 'bg-emerald-500 shadow-lg shadow-emerald-200 border border-emerald-400';
      textVariantStyles = 'text-white font-bold text-lg';
      break;
    case 'outline':
      variantStyles = 'bg-white border-2 border-indigo-600';
      textVariantStyles = 'text-indigo-600 font-bold text-lg';
      break;
    case 'danger':
      variantStyles = 'bg-red-500 border border-red-400';
      textVariantStyles = 'text-white font-bold text-lg';
      break;
  }

  if (disabled || loading) {
    variantStyles += ' opacity-50';
  }

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles} ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4F46E5' : '#FFFFFF'} className="mr-2" />
      ) : icon ? (
        <React.Fragment>{icon}</React.Fragment>
      ) : null}
      <Text className={`${textVariantStyles} ${textClassName}`} style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

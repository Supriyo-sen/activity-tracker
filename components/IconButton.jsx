import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from '@expo/vector-icons';

const IconButton = ({ onPress, iconName, iconType = 'Ionicons', size = 30, color = 'white', style }) => {
  const IconComponent = Icons[iconType];

  if (!IconComponent) {
    console.error(`Icon type "${iconType}" does not exist in "@expo/vector-icons".`);
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.iconButton, style]}>
      <IconComponent name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default IconButton;

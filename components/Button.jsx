import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ text, size = "full", buttonStyle, textStyle, onPress }) => {
  const getSizeStyle = () => {
    switch (size) {
      case "full":
        return { width: "100%" };
      case "half":
        return { width: "50%" };
      case "small":
        return { width: 100 };
      default:
        return { width: "100%" };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getSizeStyle(), buttonStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#0D38CE",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Button;

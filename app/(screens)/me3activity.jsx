import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const me3activity = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/app-bg.png")}
      resizeMode="cover"
      style={styles.image}
    ></ImageBackground>
  );
};

export default me3activity;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 14,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

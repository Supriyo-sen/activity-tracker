import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Clickedimg = ({ clickedimg, size = "full" }) => {
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
    <View style={[styles.main, getSizeStyle()]}>
      <Image style={styles.image} source={clickedimg} />
    </View>
  );
};

export default Clickedimg;

const styles = StyleSheet.create({
  main: {
    width: 343,
    height: 250,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

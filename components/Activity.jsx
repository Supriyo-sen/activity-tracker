import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Activity = ({ title, img, onPress }) => {
  return (
    <TouchableOpacity style={styles.activity} onPress={onPress}>
      <View style={styles.imgcontainer}>
        <Image style={styles.image} source={img} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Activity;

const styles = StyleSheet.create({
  activity: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  imgcontainer: {
    width: 163,
    height: 163,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 4,
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
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});

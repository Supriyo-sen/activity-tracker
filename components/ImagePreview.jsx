// components/ImagePreview.js
import React from "react";
import { View, Image, StyleSheet, Button, ImageBackground } from "react-native";
import IconButton from "./IconButton";

export default function ImagePreview({ picture, onCancel, onContinue }) {
  return (
    <ImageBackground
      source={require("../assets/images/app-bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.dropitems}>
            <Image source={{ uri: picture }} style={styles.clickedimage} />
          </View>
          <View style={styles.buttongroup}>
            <IconButton
              iconName={"cross"}
              iconType={"Entypo"}
              color="black"
              size={50}
              onPress={onCancel}
            />
            <IconButton
              iconName={"check"}
              iconType={"Entypo"}
              color="black"
              size={50}
              onPress={onContinue}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 14,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  clickedimage: {
    width: 350,
    height: 400,
    objectFit: "contain",
    borderRadius: 10,
  },
  dropitems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buttongroup: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
});

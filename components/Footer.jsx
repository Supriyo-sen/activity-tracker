import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View style={styles.main}>
      <Text>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 56,
    backgroundColor: "#0D38CE",
    position: "static"
  },
});

export default Footer;

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.main}>
      <View></View>
      <Text style={styles.text_main}>Activity Mapping</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 70,
    backgroundColor: "#0D38CE",
    display: "flex",
    justifyContent: "flex-end",
    padding: 10,
  },
  text_main: {
    color: "#fff",
    fontSize: 14,
  },
});

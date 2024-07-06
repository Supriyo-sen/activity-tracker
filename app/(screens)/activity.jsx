import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Activity from "../../components/Activity";

const activity = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/app-bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.activity_items}>
              <Activity
                title="Activity 1"
                img={require("../../assets/images/activity_1.png")}
              />
              <Activity
                title="Activity 2"
                img={require("../../assets/images/activity_2.png")}
              />
              <Activity
                title="Activity 3"
                img={require("../../assets/images/activity_3.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default activity;

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
  activity_items: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    justifyContent: "space-between",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

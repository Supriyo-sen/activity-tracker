import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="overview"/>
      </Stack>
  );
}



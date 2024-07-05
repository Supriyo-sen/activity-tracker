import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { Stack } from "expo-router";

export default function App() {
  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="overview"/>
      </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

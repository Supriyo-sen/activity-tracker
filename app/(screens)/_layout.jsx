import { Stack, usePathname } from "expo-router";
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { KeyboardAvoidingView } from "react-native";

const RootScreen = () => {
  const router = usePathname();

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
        <Stack.Screen name="activity" />
        <Stack.Screen name="me3activity" />
        <Stack.Screen name="uploadDetails" />
        <Stack.Screen name="camerapage" />
      </Stack>
      {router !== "/" && router !== "/camerapage" && <Footer />}
      </KeyboardAvoidingView>
    </>
  );
};

export default RootScreen;

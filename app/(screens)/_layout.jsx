import { Stack, usePathname } from "expo-router";
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RootScreen = () => {
  const router = usePathname();

  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
        <Stack.Screen name="activity" />
      </Stack>
      {router !== "/" && <Footer />}
    </>
  );
};

export default RootScreen;

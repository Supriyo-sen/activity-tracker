import { useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const overview = () => {
  const router = useRouter();
  
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      router.navigate("(screens)"); 
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/onboarding.png")} style={styles.image} resizeMode="contain"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  image: {
    width: 500,
    height: 300,
  },
});

export default overview;

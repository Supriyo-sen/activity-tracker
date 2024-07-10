import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location"

const Footer = () => {
  const [location,setLocation] = useState(null);
  const [errorMsg,setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  let latitude = "N/A";
  let longitude = "N/A";
  
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }
  
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Lat: {latitude} | Long: {longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 56,
    backgroundColor: "#0D38CE",
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    color:"#FFFFFF",
    fontSize: 14
  }
});

export default Footer;
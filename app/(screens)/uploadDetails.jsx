import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import Inputfield from "../../components/Inputfield";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import Clickedimg from "../../components/Clickedimg";

const uploadDetails = () => {
  const router = useRouter();
  const [remarks, setRemarks] = useState("");
  const [physical, setPhysical] = useState("");
  const [financial, setFinancial] = useState("");
  const [date, setDate] = useState("");

  state = { text: "" };

  

  return (
  
    <ImageBackground
      source={require("../../assets/images/app-bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.dropitems}>
            <Clickedimg
              size="full"
              clickedimg={require("../../assets/images/demo.png")}
            />
            <Inputfield
              header="Remarks :"
              onChangeText={(text) => setRemarks(text)}
              value={remarks}
              size="full"
            />
            <Inputfield
              header="Estimated Physical Progress (%) :"
              onChangeText={(text) => setPhysical(text)}
              value={physical}
              size="full"
            />
            <Inputfield
              header="Estimated Financial Overview (%) :"
              onChangeText={(text) => setFinancial(text)}
              value={financial}
              size="full"
            />
            {/* <Inputfield
              header="Expected Completion Date :"
              onChangeText={(text) => setInput(text)}
              value={input}
              size="full"
            /> */}
          </View>
          <Button
            text={"Save"}
            size="full"
            onPress={() => router.navigate("activity")}
          />
        </View>
      </View>
    </ImageBackground>
  
  );
};

export default uploadDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 14,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  dropitems: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});

// Insert Work ID :

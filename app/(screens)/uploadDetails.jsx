import { ImageBackground, StyleSheet, View, Alert, Button } from "react-native";
import React, { useState } from "react";
import Inputfield from "../../components/Inputfield";
import { useRouter } from "expo-router";
import Clickedimg from "../../components/Clickedimg";
import { useRoute } from "@react-navigation/native";
import DatePickerField from "../../components/DatePickerField";
import axios from 'axios';

const uploadDetails = () => {
  const router = useRouter();
  const { picture, image, WorkStatus, work_id } = useRoute().params;
  console.log(image);
  const [remarks, setRemarks] = useState("");
  const [physical, setPhysical] = useState("");
  const [financial, setFinancial] = useState("");
  const [date, setDate] = useState(new Date());

  const baseUrl = "http://192.168.0.59:5000/user";

  const handleSubmit = async () => {
    try {
      const data = {
        work_id: work_id,
        estimated_physical_progress: physical,
        estimated_financial_overview: financial,
        expected_completion_date: date.toISOString().split('T')[0], 
        remark: remarks,
        image: image,
      };

      console.log(data);
      
      const response = await axios.post(`${baseUrl}/uploadProgress`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Details submitted successfully.");
        router.navigate("activity");
      } else {
        Alert.alert("Error", "An hgfchfgcfgc gf error occurred.");
      }

    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/app-bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.dropitems}>
            <Clickedimg size="full" clickedimg={{ uri: picture }} />
            {WorkStatus === "Completed" || WorkStatus === "Yet to be started" ? (
              <Inputfield
                header="Remarks :"
                onChangeText={(text) => setRemarks(text)}
                value={remarks}
                size="full"
              />
            ) : (
              <>
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
                <DatePickerField
                  header="Expected Completion Date :"
                  value={date}
                  onChange={setDate}
                  size="full"
                />
              </>
            )}
          </View>
          <Button title="Save" onPress={handleSubmit}/>
          {/* <Button
            text={"Save"}
            size="hlaf"
            onPress={} 
          /> */}
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

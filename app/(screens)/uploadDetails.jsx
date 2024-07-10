import {
  ImageBackground,
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Inputfield from "../../components/Inputfield";
import { useRouter } from "expo-router";
import Clickedimg from "../../components/Clickedimg";
import { useRoute } from "@react-navigation/native";
import DatePickerField from "../../components/DatePickerField";
import axios from "axios";
import Button from "../../components/Button";

const UploadDetails = () => {
  const router = useRouter();
  const { picture, image, WorkStatus, work_id } = useRoute().params;
  const [remarks, setRemarks] = useState("");
  const [physical, setPhysical] = useState("");
  const [financial, setFinancial] = useState("");
  const [date, setDate] = useState(new Date());

  const baseUrl = `${process.env.API_URL}/user`;

  const handleSubmit = async () => {
    try {
      const data = {
        work_id: work_id,
        estimated_physical_progress: physical || null,
        estimated_financial_overview: financial || null,
        expected_completion_date: date.toISOString().split("T")[0],
        remark: remarks || null,
        image: image,
      };

      const response = await axios.post(`${baseUrl}/uploadProgress`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Details submitted successfully.");
        router.navigate("activity");
      } else {
        Alert.alert("Error", "An error occurred.");
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.dropitems}>
              <Clickedimg size="full" clickedimg={{ uri: picture }} />
              {WorkStatus === "Completed" ||
              WorkStatus === "Yet to be started" ? (
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
            <Button text="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default UploadDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "100%",
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

import {
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { useRouter } from "expo-router";
import { Category, Indicator, WorkStatus } from "../../static/index";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const me3activity = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [openDropdown, setOpenDropdown]   = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [selectedItem3, setSelectedItem3] = useState(null);
  const [selectedItem4, setSelectedItem4] = useState(null);
  const [workId, setWorkId] = useState([]);

  const baseUrl = "http://192.168.0.59:5000/user";

  const fetchWorkId = async () => {
    try {
      const response = await axios.get(`${baseUrl}/progress`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.map((workId) => ({
        label: workId.work_id,
        value: workId.work_id,
      }));
      setWorkId(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkId();
  }, []);

  const postData = async () => {
    if (selectedItem1 && selectedItem2 && selectedItem3 && selectedItem4) {
      const data = {
        category: selectedItem1.value,
        indicator: selectedItem2.value,
        work_status: selectedItem3.value,
        work_id: selectedItem4.value,
      };

      try {
        const response = await axios.post(`${baseUrl}/progress`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        Alert.alert("Success", response.data.message);
        navigation.navigate("camerapage", { WorkStatus: selectedItem3.value, work_id: selectedItem4.value});
      } catch (error) {
        if (error.response) {
          Alert.alert("Error", error.response.data.message);
        } else {
          Alert.alert("Error", error.message);
        }
      }
    } else {
      Alert.alert("Please select all the fields");
    }
  };

  const handleToggleDropdown = (dropdownId) => {
    setOpenDropdown(dropdownId === openDropdown ? null : dropdownId);
  };

  const handleCloseDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseDropdowns}>
      <ImageBackground
        source={require("../../assets/images/app-bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.dropitems}>
              <Dropdown
                data={Category}
                size="full"
                header={"Select Category :"}
                isOpen={openDropdown === "dropdown1"}
                onToggle={() => handleToggleDropdown("dropdown1")}
                selectedItem={selectedItem1}
                onSelect={(item) => {
                  setSelectedItem1(item);
                  handleCloseDropdowns();
                }}
              />

              <Dropdown
                data={Indicator}
                size="full"
                header={"Select Indicator :"}
                isOpen={openDropdown === "dropdown2"}
                onToggle={() => handleToggleDropdown("dropdown2")}
                selectedItem={selectedItem2}
                onSelect={(item) => {
                  setSelectedItem2(item);
                  handleCloseDropdowns();
                }}
              />
              <Dropdown
                data={WorkStatus}
                size="full"
                header={"Select Work Status :"}
                isOpen={openDropdown === "dropdown3"}
                onToggle={() => handleToggleDropdown("dropdown3")}
                selectedItem={selectedItem3}
                onSelect={(item) => {
                  setSelectedItem3(item);
                  handleCloseDropdowns();
                }}
              />
              <Dropdown
                data={workId}
                size="full"
                header={"Work ID :"}
                isOpen={openDropdown === "dropdown4"}
                onToggle={() => handleToggleDropdown("dropdown4")}
                selectedItem={selectedItem4}
                onSelect={(item) => {
                  setSelectedItem4(item);
                  handleCloseDropdowns();
                }}
              />
            </View>
            <Button
              text={"Save"}
              size="full"
              onPress={postData}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default me3activity;

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

import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Alert } from "react-native";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import axios from "axios";

const Index = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [selectedItem3, setSelectedItem3] = useState(null);
  const [imeiNumber, setImeiNumber] = useState("");

  const [districts, setDistricts] = useState();
  const [blocks, setBlocks] = useState();
  const [gps, setGps] = useState();

  const baseUrl = "http://192.168.0.59:5000/area";
  const authUrl = "http://192.168.0.59:5000/auth";
  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/districts`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.map((district) => ({
        label: district.district_name,
        value: district.district_name,
      }));
      setDistricts(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchBlocks = async (item) => {
    const blockUrl = `${baseUrl}/block/${item.value}`;
    try {
      const response = await axios.get(blockUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.map((block) => ({
        label: block.block_name,
        value: block.block_name,
      }));
      setBlocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGps = async (item) => {
    const gpUrl = `${baseUrl}/gp/${item.value}`;

    try {
      const response = await axios.get(gpUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.map((gp) => ({
        label: gp.gp_name,
        value: gp.gp_name,
      }));
      setGps(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async () => {
    if (selectedItem1 && selectedItem2 && selectedItem3) {
      const data = {
        district_name: selectedItem1.value,
        block_name: selectedItem2.value,
        gp_name: selectedItem3.value,
        imei_number: "523456789012349",
      };

      try {
        const response = await axios.post(`${authUrl}/validate`, data, {
          headers: {
            "Content-Type": "application/json", 
          },
        });

        if (response.status === 200) {
          Alert.alert("Login successful", response.data.message);
          router.navigate("activity");
        } else {
          Alert.alert("Login failed: ", response.data.message);
          return;
        }
      } catch (error) {
        Alert.alert("Error", error.response.data.message);
      }
    } else {
      Alert.alert("Please fill all the fields");
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
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.dropitems}>
            <Dropdown
              data={districts}
              size="full"
              header={"1. Select District :"}
              isOpen={openDropdown === "dropdown1"}
              onToggle={() => handleToggleDropdown("dropdown1")}
              selectedItem={selectedItem1}
              onSelect={(item) => {
                setSelectedItem1(item);
                fetchBlocks(item);
                handleCloseDropdowns();
              }}
            />
            <Dropdown
              data={blocks}
              size="full"
              header={"2. Select Block :"}
              isOpen={openDropdown === "dropdown2"}
              onToggle={() => handleToggleDropdown("dropdown2")}
              selectedItem={selectedItem2}
              onSelect={(item) => {
                setSelectedItem2(item);
                fetchGps(item);
                handleCloseDropdowns();
              }}
            />
            <Dropdown
              data={gps}
              size="full"
              header={"3. Select GP :"}
              isOpen={openDropdown === "dropdown3"}
              onToggle={() => handleToggleDropdown("dropdown3")}
              selectedItem={selectedItem3}
              onSelect={(item) => {
                setSelectedItem3(item);
                handleCloseDropdowns();
              }}
            />
          </View>
          <Button
            text={"Set Details"}
            size="full"
            onPress={postData}
          />
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  dropitems: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});

export default Index;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
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

  const [districts, setDistricts] = useState();
  const [blocks, setBlocks] = useState();
  const [gps, setGps] = useState();

  const baseUrl = "http://192.168.1.102:5000/area";
  useEffect(() => {
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
    fetchDistricts();
  }, []);

  const fetchBlocks = async (item) => {
    // console.log(item);
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
      // console.log(data);
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
    const data = {
      district: selectedItem1.value,
      block: selectedItem2.value,
      // gp: selectedItem3.value,
    };
    console.log(data);
    // try {
    //   const response = await axios.post(`${baseUrl}/set`, data, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
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
                console.log(item);
                setSelectedItem3(item);
                console.log(selectedItem3);
                handleCloseDropdowns();
                postData();
              }}
            />
          </View>
          <Button
            text={"Set Details"}
            size="full"
            onPress={() => router.navigate("activity")}
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

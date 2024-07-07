import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import Inputfield from "../../components/Inputfield";
import { useRouter } from "expo-router";
import { options } from "../../static/index";
import Button from "../../components/Button";

const me3activity = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [selectedItem3, setSelectedItem3] = useState(null);

  const handleToggleDropdown = (dropdownId) => {
    setOpenDropdown(dropdownId === openDropdown ? null : dropdownId);
  };

  const handleCloseDropdowns = () => {
    setOpenDropdown(null);
  };
  state = { text: "" };

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
                data={options}
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
                data={options}
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
                data={options}
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
              <Inputfield
                header="Work ID :"
                onChangeText={(text) => setInput(text)}
                value={input}
                size="full"
              />
            </View>
            <Button
              text={"Save"}
              size="full"
              onPress={() => router.navigate("camerapage")}
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

// Insert Work ID :

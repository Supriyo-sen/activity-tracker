import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { options } from "../../static/index";
import IconButton from "../../components/IconButton";

const Index = () => {
  const router = useRouter();
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

  return (
    <TouchableWithoutFeedback onPress={handleCloseDropdowns}>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.dropitems}>
            <Dropdown
              data={options}
              size="full"
              header={"1. Select District :"}
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
              header={"2. Select Block :"}
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
          <Button text={"Set Details"} size="full" onPress={()=>router.navigate("activity")}/>
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
  main:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width:"100%",
    height:"100%"
  },
  dropitems: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});

export default Index;

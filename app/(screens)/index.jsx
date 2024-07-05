import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

const Index = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (dropdownIndex) => {
    setOpenDropdown(openDropdown === dropdownIndex ? null : dropdownIndex);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.dropitems}>
            <Dropdown
              data={options}
              onSelect={handleSelect}
              selectedItem={selectedItem}
              size="full"
              isOpen={openDropdown === 1}
              onToggle={() => handleDropdownToggle(1)}
              header={"1. Select District :"}
            />
            <Dropdown
              data={options}
              onSelect={handleSelect}
              selectedItem={selectedItem}
              size="full"
              isOpen={openDropdown === 2}
              onToggle={() => handleDropdownToggle(2)}
              header={"2. Select Block :"}
            />
            <Dropdown
              data={options}
              onSelect={handleSelect}
              selectedItem={selectedItem}
              size="full"
              isOpen={openDropdown === 3}
              onToggle={() => handleDropdownToggle(3)}
              header={"3. Select GP :"}
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

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Dropdown = ({ data, onSelect, size = "full", selectedItem, isOpen, onToggle, header }) => {
  const getSizeStyle = () => {
    switch (size) {
      case "full":
        return { width: "100%" };
      case "half":
        return { width: "50%" };
      case "small":
        return { width: 100 };
      default:
        return { width: "100%" };
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
  };

  const renderItem = (item) => (
    <TouchableOpacity key={item.value} onPress={() => handleSelect(item)}>
      <Text style={styles.dropdownItem}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <Text style={styles.header}>{header}</Text>
      <View style={[styles.container, getSizeStyle()]} onStartShouldSetResponder={() => true}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <Text style={styles.dropdownText}>
            {selectedItem?.label || ""}
          </Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={[styles.dropdownList, getSizeStyle()]}>{data.map(renderItem)}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 365,
    height: 90,
    backgroundColor: "#E4EAFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 5,
    flexDirection: "column",
    position: "relative",
    gap: 10,
  },
  container: {
    position: "relative",
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    alignItems: "center",
  },
  header:{
    color: "#0D38CE",
    fontSize: 12,
    fontWeight: "500",
  },
  dropdownList: {
    position: "absolute",
    top: 50,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default Dropdown;

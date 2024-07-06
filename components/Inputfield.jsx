import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const Inputfield = ({
  data,
  value,
  onChangeText,
  size = "full",
  selectedItem,
  isOpen,
  onToggle,
  header,
}) => {
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

  return (
    <View style={[styles.main, getSizeStyle()]}>
      <Text style={styles.header}>{header}</Text>
      <TouchableOpacity onPress={onToggle}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Select an option"
          editable={true}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 365,
    height: 90,
    backgroundColor: "#E4EAFF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "column",
    position: "relative",
    marginVertical: 3,
  },
  textInput: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownText: {
    color: "#333",
  },
  header: {
    color: "#0D38CE",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default Inputfield;

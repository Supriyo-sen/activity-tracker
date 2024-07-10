import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerField = ({
  value,
  onChange,
  size = "full",
  header,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

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

  const showDatePicker = () => {
    setPickerVisible(true);
  };

  const onDateChange = (event, selectedDate) => {
    setPickerVisible(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={[styles.main, getSizeStyle()]}>
      <Text style={styles.header}>{header}</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.textInput}
          value={value ? value.toLocaleDateString() : ""}
          placeholder="Select a date"
          editable={false}
        />
      </TouchableOpacity>
      {isPickerVisible && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
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

export default DatePickerField;

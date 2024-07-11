import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

const Dropdown = ({
  data,
  onSelect,
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

  const handleSelect = (item) => {
    onSelect(item);
    onToggle(); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.value} onPress={() => handleSelect(item)}>
      <Text style={styles.dropdownItem}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.main, getSizeStyle()]}>
      <Text style={styles.header}>{header}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={(e) => {
          e.stopPropagation();
          onToggle(); 
        }}
      >
        <Text style={styles.dropdownText}>
          {selectedItem?.label || "Select an option"}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => onToggle()}
      >
        <TouchableWithoutFeedback onPress={() => onToggle()}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.value.toString()}                
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 365,
    height: "auto",
    backgroundColor: "#E4EAFF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "column",
    position: "relative",
    marginVertical: 3,  
  },
  dropdownButton: {
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%", 
    maxHeight: 200,
    overflow: "scroll",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 15,
    // borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default Dropdown;

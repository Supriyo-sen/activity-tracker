import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";
import { usePathname, useRouter } from "expo-router";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionPress = (option) => {
    console.log(option); // Handle the option press accordingly
    setDropdownVisible(false);
  };

  return (
    <View style={styles.main}>
      <View style={styles.sub_main}>
        {pathname !== "/" && (
          <TouchableOpacity onPress={() => router.back()}>
            <Image style={styles.icon} source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
        )}
        <Text style={styles.text_main}>Activity Mapping</Text>
      </View>
      {pathname !== "/" && (
        <TouchableOpacity onPress={toggleDropdown}>
          <Image style={styles.icon} source={require("../assets/icons/menu.png")} />
        </TouchableOpacity>
      )}
      {dropdownVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={dropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.dropdown}>
                <TouchableOpacity onPress={() => handleOptionPress("Upload Status")} style={styles.dropdownItem}>
                  <Text>Upload Status</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress("Synchronize Data")} style={styles.dropdownItem}>
                  <Text>Synchronize Data</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress("Export Data")} style={styles.dropdownItem}>
                  <Text>Export Data</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 75,
    backgroundColor: "#0D38CE",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
  },
  sub_main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text_main: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 50,
    marginRight: 10,
    padding: 10,
    elevation: 5,
    width: 200,
    maxHeight: 184,
    overflow: "scroll",
  },
  dropdownItem: {
    padding: 10,
  },
});

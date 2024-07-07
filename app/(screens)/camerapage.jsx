import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconButton from "../../components/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import ImagePreview from "../../components/ImagePreview";

export default function camerapage() {
  const router = useRouter();
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);
  const [zoom, setZoom] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState("");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function zoomIn() {
    setZoom((current) => (current + 0.1 <= 1 ? current + 0.1 : 1));
  }

  function zoomOut() {
    setZoom((current) => (current - 0.1 >= 0 ? current - 0.1 : 0));
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const response = await cameraRef.current.takePictureAsync();
      setPicture(response.uri);
    }
  };

  const handleCancel = () => {
    setPicture("");
  };

  const handleContinue = () => {
    router.navigate("uploadDetails", { picture });
  };

  if (picture) {
    return (
      <ImagePreview
        picture={picture}
        onCancel={handleCancel}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <CameraView
      style={styles.camera}
      facing={facing}
      zoom={zoom}
      ref={cameraRef}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <IconButton
            iconName={"camera"}
            iconType={"AntDesign"}
            size={40}
            onPress={handleTakePicture}
            style={styles.continue}
            color={"black"}
          />
        </View>
        <IconButton
            iconName={"camera-flip-outline"}
            iconType={"MaterialCommunityIcons"}
            onPress={toggleCameraFacing}
            style={styles.close}
            size={40}
          />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 14,
    display: "flex",
    position: "relative"
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  continue: {
    backgroundColor: "white",
    width: 60,
    height: 60,
  },
  close: {
    display: "flex",
    top: 20,
    right: 20,
    position: "absolute",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IconButton from "../../components/IconButton";
import {useRouter } from "expo-router";
import ImagePreview from "../../components/ImagePreview";
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";

export default function camerapage() {
  const router = useRouter();
  const [facing, setFacing] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(FlashMode.off);
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

  function camerafacingtoggle() {
    setFacing((current) =>
      current === CameraType.front ? CameraType.back : CameraType.front
    );
  }

  function flashlighttoggle() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.torch : FlashMode.off
    );
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
      ref={cameraRef}
      flash={flash}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <IconButton
            iconName={"flashlight"}
            iconType={"MaterialCommunityIcons"}
            onPress={flashlighttoggle}
            style={styles.flip}
            size={40}
            color={"black"}
          />
          <IconButton
            iconName={"camera"}
            iconType={"AntDesign"}
            size={40}
            onPress={handleTakePicture}
            style={styles.continue}
            color={"black"}
          />
          <IconButton
            iconName={"camera-flip-outline"}
            iconType={"MaterialCommunityIcons"}
            onPress={camerafacingtoggle}
            style={styles.flip}
            size={40}
            color={"black"}
          />
        </View>
      </View>
    </CameraView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 14,
    display: "flex",
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  continue: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 20,
  },
  flip: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 25,
  },
  flash: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

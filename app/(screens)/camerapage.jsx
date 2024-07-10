import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/IconButton";
import { useRouter } from "expo-router";
import ImagePreview from "../../components/ImagePreview";
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function camerapage() {
  const navigation = useNavigation();
  const {WorkStatus, work_id} = useRoute().params;
  const [facing, setFacing] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(FlashMode.off);
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState("");
  const [source, setSource] = useState("");
  const [loading , setLoading] = useState(false);

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
      const options = { quality: 0.7, base64: true };
      const response = await cameraRef.current.takePictureAsync(options);
      const source = response.base64;
      setSource(source);
      setPicture(response.uri);
    }
  };

  const handleCancel = () => {
    setPicture("");
  };

  const handleContinue = () => {
    if (source) {
      setLoading(true);
      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl = "https://api.cloudinary.com/v1_1/dxq3ps3xt/image/upload";
      let data = {
        file: base64Img,
        upload_preset: "activity-tracker",
      };

      axios
        .post(apiUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.secure_url) {
            setImage(response.data.secure_url);
            if(image){
              setLoading(false);
              alert("Upload successful");
              navigation.navigate("uploadDetails", { picture, image, WorkStatus, work_id });
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("Cannot upload", err);
          return;
        }).finally(() => {
          setLoading(false);
        });
    }
  };

  if(loading){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

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

import { StyleSheet, View, BackHandler, Image, Dimensions } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import DoubleClick from "react-native-double-tap";
import loader from "./assets/images/loader.gif";
import logo from "./assets/images/mitsubishi.png";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [sound, setSound] = useState();
  const exit = () => {
    BackHandler.exitApp();
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/audio/welcome-highway.mp3"),
      {},
      (status) => {
        if (status.didJustFinish) {
          exit();
        }
      }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let loaderStyle = {
    height: "100%",
    width: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
  };
  if (windowWidth > windowHeight) {
    loaderStyle.height = undefined;
    loaderStyle.width = "100%";
  }

  return (
    <View style={styles.container}>
      <DoubleClick doubleTap={exit}>
        <Image style={loaderStyle} source={loader} />
        <Image source={logo} />
      </DoubleClick>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

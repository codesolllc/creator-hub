import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import InteractiveButton from "../../components/extras/InteractiveButton";

const GetStarted = ({ navigation }) => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (isLoginScreen) {
        BackHandler.exitApp();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isLoginScreen]);

  const NavigationFunc = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../assets/Auth/sin1.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.getstartedText}>Welcome to the creators hub!</Text>
        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <InteractiveButton
            backcolor="blue"
            onPress={NavigationFunc}
            title=" Let's Get Started  "
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },

  getstartedText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
  },
});

export default GetStarted;

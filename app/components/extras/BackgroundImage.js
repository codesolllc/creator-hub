import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const BackgroundImage = ({ source, style, children }) => {
  const TestingFunction = () => {
    try {
      const Imagez = source;
      return Imagez;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const imageSource = TestingFunction();

  return (
    <ImageBackground source={imageSource} style={[styles.container, style]}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default BackgroundImage;

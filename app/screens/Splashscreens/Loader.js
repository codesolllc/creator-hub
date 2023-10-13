
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = ({ navigation }) => {


  
  const startAnimation = () => {
    // Start the logo animation
    // this.animation.play();

    const myTimeout = setTimeout(() => {
      navigation.navigate('getstarted');
    }, 3000);
  };

  useEffect(() => {
    startAnimation();    
  }, []);


  return (
    <View style={styles.container}>
     <Text style={{ fontSize:40, fontWeight:"900", color:"blue" }}>Creators Hub</Text>
      {/* <LottieView
        // ref={animation => {
        //   this.animation = animation;
        // }}
        source={require('../../assets/splashscreen/loader.json')}
        style={styles.animation}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Loader;
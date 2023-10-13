import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native'
import React from 'react'
import InteractiveButton from '../../components/extras/InteractiveButton';
import BackgroundImage from '../../components/extras/BackgroundImage';
import { FontAwesome } from "@expo/vector-icons";

const Twowaybuttons = ({navigation}) => {

    const NavigateToCreatorSignUP = () => {
        navigation.navigate("Signupcreator");
    }

    const NavigateToUserSignUP = () => {
        navigation.navigate("SignUp");
    }
    const LoginScreen = () => {
        navigation.navigate("Login");
    }

    const goBack = () => {
      navigation.goBack();
    };

  return (
    <BackgroundImage source={require('../../assets/wrapper/backgroundimagetwoway.jpg')}>
    <View style={styles.container}>
       {/* Add back button */}
       <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
      <InteractiveButton backcolor="#613499" title='Signup as creator' onPress={NavigateToCreatorSignUP} />
      <InteractiveButton backcolor="#3e78d6" title='Signup as user' onPress={NavigateToUserSignUP} />
      <View style={styles.footertext}>
      <Text style={{color:"#fff"}}>Already have an account? Login Now!
      </Text>
      <TouchableOpacity onPress={LoginScreen} >
        <Text style={{color:"lightblue", fontWeight:"600"}}>  Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    </BackgroundImage>
  )
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    footertext:{
      marginTop:40,
      flexDirection: 'row',
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1,
  },
  });

export default Twowaybuttons;
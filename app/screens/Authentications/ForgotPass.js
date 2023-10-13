import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import InteractiveButton from '../../components/extras/InteractiveButton';
import { useForgotPasswordMutation } from '../../Redux/Reducers/UserReducer';


const EnterEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const [forgotPassword] = useForgotPasswordMutation();
  const handleContinue = async () => { 
    try {
      const res = await forgotPassword({ 
        email: email 
      });
      if(!res.error){
        navigation.navigate('EmailVerification',{
                email: email,
                otpCode : res.data.data.otpCode,
              });
      }
      else{
        console.log(res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (

    <View style={styles.container}>
        <Text style={styles.Heading}>Forgot Password</Text>

        <View style={{ width:"80%", textAlign:"center" }}>
        <Text style={styles.text}>Enter your email address associated with your account</Text>
        </View>
      <TextInput
        style={styles.inputs}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholder="Enter your email"
      />
      <InteractiveButton backcolor="blue" title="Continue"
       onPress={handleContinue} 
       />
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputs: {
        width: '80%',
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        color: 'gray',
        margin:10,
        fontSize:20,
       marginBottom:30,
        fontStyle:"normal",
        borderWidth: 1, 
      },
      text: {
        fontSize: 18,
        fontWeight: "400",
      
        color:"gray",
        marginBottom:30,
        textAlign:"center",
      },
      Heading: {
        fontSize: 35,
        fontWeight: "600",
        color:"blue",
        marginBottom:10,
      },


})

export default EnterEmailScreen;

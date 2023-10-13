import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import InteractiveButton from '../../components/extras/InteractiveButton';
import { useResetPasswordMutation } from '../../Redux/Reducers/UserReducer';

const Newpass = ({ route, navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const email = route.params.email;
  const otp = route.params.otp;

  
  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const [resetPass] = useResetPasswordMutation();
  
  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      try {
        const res = await resetPass(
        { email: email,
        otpCode: otp,
        password: newPassword,
        });
       if(!res.error){
        navigation.navigate('Login')
       }else{
        console.log(res.error);
       }
     
      } catch (error) {
        console.log(error);
      }
      setNewPassword('');
      setConfirmPassword('');
    } else {
      // Passwords don't match, show an error or take appropriate action
      alert('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
       <Image source={require('../../assets/Auth/newpass.png')} style={styles.logo} />

      <Text style={styles.Heading}>New Password</Text>
      <Text style={styles.text}>Enter new password and make sure password would be diffrent from the old one!</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={handleNewPasswordChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      <InteractiveButton backcolor="blue" title="Submit" 
      onPress={handleSubmit}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    
    margin:10,
    fontSize:20,
   
    color:"gray",
    fontStyle:"normal",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color:"#D3D3D3",
    marginBottom:30,
    textAlign:"center",
  },
  Heading: {
    fontSize: 35,
    fontWeight: "600",
    color:"blue",
    marginBottom:10,
  },
});

export default Newpass;

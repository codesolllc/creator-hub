import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import InteractiveButton from '../../components/extras/InteractiveButton';
import { useResendOtpMutation } from '../../Redux/Reducers/UserReducer';

const EmailVerification = ({ route, navigation }) => {
  
  const [verificationCode, setVerificationCode] = useState('');
  const [otp, setOtp] = useState(route.params.otpCode || '');
  const email = route.params.email;


  const handleVerifyCode = () => {
    if (verificationCode == otp) {
      Alert.alert('Verification Successful');
      navigation.navigate('newpass', {
        email: email,
        otp : otp,
      });
    } else {
      Alert.alert('Invalid Verification Code');
    }
  };

  const handleChangeCode = (text, index) => {
    let updatedCode = verificationCode.split('');
    updatedCode[index] = text;
    setVerificationCode(updatedCode.join(''));
  };

  const [resendOtpx] = useResendOtpMutation(); 
  

  const resendOtp = async () => {
    try {
     const res = await resendOtpx({
      email: email,
     })
     if(!res.error) {
      const latestOtp = res.data.data.otpCode;
      setOtp(latestOtp);
     }
    else{
      console.log(res.error);
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Verification Code</Text>
      <Text style={styles.text}>Verification code sent to your email</Text>
      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={verificationCode[index] || ''}
            onChangeText={(text) => handleChangeCode(text, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <View style={{ marginRight: '28%' }}>
        <View style={styles.forgotpass}>
          <Text style={{ color: 'black' }}>Resend OTP? </Text>
          <TouchableOpacity 
          onPress={resendOtp}
          >
            <Text style={{ color: 'blue' }}>Click Here!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <InteractiveButton backcolor="blue" title="Verify" 
      onPress={handleVerifyCode}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#D3D3D3',
    marginBottom: 30,
  },
  Heading: {
    fontSize: 35,
    fontWeight: '600',
    color: 'blue',
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: 50,
    textAlign: 'center',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 25,
    elevation: 17,
    marginHorizontal: 8,
  },
  forgotpass: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default EmailVerification;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from "react-native";
import InteractiveButton from "../../components/extras/InteractiveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginUserMutation } from "../../Redux/Reducers/UserReducer";


const Login = ({ navigation }) => {
  const [loginUser] = useLoginUserMutation();
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (isLoginScreen) {
        // BackHandler.exitApp();
        navigation.navigate("getstarted")
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isLoginScreen]);


  const [email, setEmail] = useState("");
  const [password, onChangePass] = useState("");
  let emailRegex = /^\w+[\w.-]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleLoginUser = async () => {
    if (email && password) {
      if (emailRegex.test(email)) {
        try {
          const res = await loginUser({
            email,
            password,
          });
          
          if (!res.error) {
            await AsyncStorage.setItem(
              "email",
              JSON.stringify(res.data.findUser.email)
            );
            await AsyncStorage.setItem(
              "usertype",
              JSON.stringify(res.data.findUser.usertype)
            );
            await AsyncStorage.setItem("userdata", JSON.stringify(res.data));
            navigation.navigate("Btabs");
          } else {
            console.log(res.error);
            alert(res.error.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Email is not Valid");
      }
    } else {
      alert("All Fields Required");
    }
  };

  const signUpdNav = () => {
    navigation.navigate("twowaybuttons");
  };

  const NavigatetoForgotpassScreen = () => {
    navigation.navigate("forgotpass");
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/Auth/sin2.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView style={styles.container}>
        {/* <View style={styles.container}> */}
        <Text style={styles.Heading}>Hello Again!</Text>
        <Text style={styles.text}>Signin to your account</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputs}
          placeholder="Name"
          // keyboardShouldPersistTaps="handled"
        />
        {/* <Text style={styles.text}>Password</Text> */}
        <TextInput
          value={password}
          onChangeText={onChangePass}
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={false}
          keyboardShouldPersistTaps="handled"
        />

        <View style={{ marginRight: "28%" }}>
          <View style={styles.forgotpass}>
            <Text style={{ color: "#fff" }}>Forgot Your password?</Text>
            <TouchableOpacity onPress={NavigatetoForgotpassScreen}>
              <Text style={{ color: "lightblue" }}> Click Here!</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <InteractiveButton
            backcolor="blue"
            title="Login"
            //  onPress={LoginInapp}
            onPress={handleLoginUser}
          />
        </View>

        {/* <Button title="Login" onPress={LoginInapp} /> */}

        <View style={styles.footertext}>
          <Text style={{ color: "#fff" }}>
            Don't have an account? Register Now!
          </Text>
          <TouchableOpacity onPress={signUpdNav}>
            <Text style={{ color: "lightblue" }}> SignUp</Text>
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  inputs: {
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    // color: '#ffffff',
    margin: 10,
    fontSize: 20,
    // fontStyle:"italic",
    color: "white",
    fontStyle: "normal",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "#D3D3D3",
    marginBottom: 30,
  },
  Heading: {
    fontSize: 35,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' for different image resizing options
  },
  footertext: {
    marginTop: 40,
    flexDirection: "row",
  },
  forgotpass: {
    // marginTop:40,
    flexDirection: "row",
    marginTop: 10,
  },
});

//make this component available to the app
export default Login;

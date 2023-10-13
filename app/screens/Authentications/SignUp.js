import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InteractiveButton from "../../components/extras/InteractiveButton";
import { FontAwesome } from "@expo/vector-icons";
import { useSignUpUserMutation } from "../../Redux/Reducers/UserReducer";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  // const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("user");

  const LoginNav = () => {
    navigation.navigate("Login");
  };

  const [signupUser] = useSignUpUserMutation();
  let emailRegex = /^\w+[\w.-]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const Register = async () => {
    if (name && email && city && state && zipcode && password) {
      if (emailRegex.test(email)) {
        try {
          const res = await signupUser({
            name: name,
            email: email,
            city: city,
            state: state,
            // category: category,
            zipcode: zipcode,
            password: password,
            usertype: usertype,
          });

          console.log(res.data);
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

            navigation.navigate("categoryselection");
          } else {
            console.log(res.error);
            alert(res.error.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Email is not valid");
      }
    } else {
      alert("All Feilds Required!");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/wrapper/signupuser.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Add back button */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.Heading}>SignUp</Text>
        <Text style={styles.text}>Create An Account!</Text>
        <Text style={styles.text1}>As a User</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.inputs}
          placeholder="Name"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          value={state}
          onChangeText={setState}
          style={styles.inputs}
          placeholder="state"
        />
        <TextInput
          value={city}
          onChangeText={setCity}
          style={styles.inputs}
          placeholder="city"
        />
        <TextInput
          value={zipcode}
          onChangeText={setZipcode}
          style={styles.inputs}
          placeholder="ZipCode"
          keyboardType="numeric"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={false}
          // placeholderTextColor="#fff"
        />

        <InteractiveButton backcolor="blue" title="Signup" onPress={Register} />

        <View style={styles.footertext}>
          <Text style={{ color: "#fff" }}>
            Already have an account? Login Now!
          </Text>
          <TouchableOpacity onPress={LoginNav}>
            <Text style={{ color: "lightblue" }}> Login</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
    color: "#fff",
  },
  text1: {
    fontSize: 20,
    fontWeight: "400",
    color: "red",
  },
  Heading: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
  },
  containeri: {
    // width: '80%',
    // margin:20,
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    // color: '#ffffff',
    margin: 10,
  },
  searchInput: {
    color: "#333",
  },
  multiSelectWrapper: {
    // borderColor: '#CCC',
    // borderWidth: 1,
    // borderRadius: 4,
  },
  dropdownMenuSubsection: {
    // padding: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dropdownMenu: {
    // backgroundColor: '#FFF',
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  inputGroup: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    // marginBottom: 10,
  },
  itemsContainer: {
    maxHeight: 450,
    width: 330,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  listContainer: {
    // borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 4,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectorContainer: {
    borderColor: "#CCC",
    // borderWidth: 1,
    // borderRadius: 4,
    // padding: 10,
    // flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectorContainerActive: {
    borderColor: "#333",
  },
  rowList: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  // selectedValue: {
  //   fontSize: 28,
  //   fontWeight: 'bold',
  // },
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' for different image resizing options
  },
  footertext: {
    marginTop: 40,
    flexDirection: "row",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
    zIndex: 1,
  },

  // item: {
  //   width: 200,
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  // selectedItem: {
  //   backgroundColor: 'gray',
  // },
  // itemText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

//make this component available to the app
export default SignUp;

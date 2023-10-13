import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import InteractiveButton from "../../components/extras/InteractiveButton";
import BackgroundImage from "../../components/extras/BackgroundImage";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useUpdateUserMutation } from "../../Redux/Reducers/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DottedBorderButton from "../../components/extras/DottedBorderButton";

const Edit_accounts = ({ route, navigation }) => {
  const userData = route.params.item;
  const [name, setName] = useState(userData?.name);
  const [city, setCity] = useState(userData?.city);
  const [state, setState] = useState(userData?.state);
  const [zipcode, setZipcode] = useState(userData?.zipcode);
  const [about, setAbout] = useState(userData?.about);
  const [desc, setDesc] = useState(userData?.desc);
  const [pickedImage, setPickedImage] = useState("");
  const [pickedBannerImage, setPickedBannerImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [bannerimageName, setBannerImageName] = useState("");
  const [userId, setUserId] = useState("");
  const [updateUser] = useUpdateUserMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      setImageName("Unable to Upload Try Again!!");
    } else {
      setPickedImage(result.assets[0].uri);
      const resultSplit = result.assets[0].uri.split("/");
      const name = resultSplit[resultSplit.length - 1];
      setImageName(name);
    }
  };

  const pickBannerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      setBannerImageName("Unable to Upload Try Again!!");
    } else {
      setPickedBannerImage(result.assets[0].uri);
      const resultSplit = result.assets[0].uri.split("/");
      const name = resultSplit[resultSplit.length - 1];
      setBannerImageName(name);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUserId(findUser.findUser._id);
        } catch (parseError) {
          console.log("Error parsing user data:", parseError);
        }
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.log("Unable to get user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const UpdateProfile = async () => {
    if (
      name.length !== 0 &&
      city.length !== 0 &&
      state.length !== 0 &&
      zipcode.length !== 0 &&
      about.length !== 0 &&
      desc.length !== 0
    ) {
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipcode", zipcode);
        formData.append("about", about);
        formData.append("desc", desc);
        if (pickedImage) {
          const imageUriParts = pickedImage.split(".");
          const imageType = imageUriParts[imageUriParts.length - 1];
          formData.append("image", {
            uri: pickedImage,
            name: `user_image.${imageType}`,
            type: `image/${imageType}`,
          });
        }

        if (pickedBannerImage) {
          const imageUriParts = pickedBannerImage.split(".");
          const imageType = imageUriParts[imageUriParts.length - 1];
          formData.append("banner_Img", {
            uri: pickedBannerImage,
            name: `banner_img.${imageType}`,
            type: `image/${imageType}`,
          });
        }

        const res = await updateUser({
          id: userId,
          data: formData,
        });

        if (!res.error) {
          AsyncStorage.clear().then(async () => {
            console.log("Cleared"),
              await AsyncStorage.setItem("userdata", JSON.stringify(res.data));
            alert("Update Successfully!");
            navigation.navigate("Login");
          });
        } else {
          console.log("Unable to update ", res.error.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("All Fields Required");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      {/* Add back button */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Edit your profile
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.label}>City:</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />
          <Text style={styles.label}>State:</Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
          />
          <Text style={styles.label}>ZipCode:</Text>
          <TextInput
            style={styles.input}
            value={zipcode}
            onChangeText={setZipcode}
          />
          <Text style={styles.label}>About:</Text>
          <TextInput
            style={styles.input}
            value={about}
            onChangeText={setAbout}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput style={styles.input} value={desc} onChangeText={setDesc} />

          <View style={{ marginTop: 30, alignItems: "center" }}>
            <DottedBorderButton
              title="Select profile image"
              onPress={pickImage}
            />
            <Text>{imageName}</Text>
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <DottedBorderButton
              title="Select banner image"
              onPress={pickBannerImage}
            />
            <Text>{bannerimageName}</Text>
          </View>

          <View
            style={{ marginTop: 10, marginBottom: 190, alignItems: "center" }}
          >
            <InteractiveButton
              title="Update"
              backcolor="#613499"
              textColor="white"
              onPress={UpdateProfile}
            />
            <InteractiveButton
              title="Cancel"
              backcolor="#3e78d6"
              textColor="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1,
  },
});

export default Edit_accounts;

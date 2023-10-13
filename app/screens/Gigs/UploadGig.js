import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundImage from "../../components/extras/BackgroundImage";
import InteractiveButton from "../../components/extras/InteractiveButton";
import DottedBorderButton from "../../components/extras/DottedBorderButton";
import * as ImagePicker from "expo-image-picker";
import { useCreateGigMutation } from "../../Redux/Reducers/GigsReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadGig = ({ navigation }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [createGig] = useCreateGigMutation();

  const goBack = () => {
    navigation.goBack();
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      setPickedImage("Unable to Upload Try Again!!");
    } else {
      setPickedImage(result.assets[0].uri);
    }
  };

  const handleCreateGig = async () => {
    if (title && description && price) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      if (pickedImage) {
        const imageUriParts = pickedImage.split(".");
        const imageType = imageUriParts[imageUriParts.length - 1];
        formData.append("image", {
          uri: pickedImage,
          name: `user_image.${imageType}`,
          type: `image/${imageType}`,
        });
      }
      try {
        const res = createGig({
          authorID: userId,
          data: formData,
        });
        if (!res.error) {
          alert("Upload Gig Successfully!");
          setTitle("");
          setDescription("");
          setPrice("");
          setPickedImage(null);
          navigation.goBack();

        } else {
          alert("Failed to Upload Gig! Try Again");
        }
      } catch (error) {
        alert("API Failed! Try later");
      }
    } else {
      alert("All Fields Required");
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

  return (
    <BackgroundImage
      source={require("../../assets/Home/bg_img.png")}
    >
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
        Upload Gig
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            maxLength={30}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            maxLength={100}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            maxLength={15}
          />

          <Text style={styles.label}>Optional</Text>
          <View
            style={{ marginTop: 10, marginBottom: 10, alignItems: "center" }}
          >
            <DottedBorderButton title="Attach Picture" onPress={pickImage} />
            {pickedImage? <Text>selected image {pickedImage.length}</Text>: null}
          </View>

          <View
            style={{ marginTop: 10, marginBottom: 190, alignItems: "center" }}
          >
            <InteractiveButton
              title="Create"
              backcolor="#613499"
              textColor="white"
              onPress={handleCreateGig}
            />
            <InteractiveButton
              title="Cancel"
              backcolor="#3e78d6"
              textColor="white"
              onPress={goBack}
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

export default UploadGig;

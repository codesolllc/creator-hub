import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatorPostHeader = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigateToProfile = () => {
    navigation.navigate("MyProfile");
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUserData(findUser.findUser);
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
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={navigateToProfile}>
          <Image
            source={{uri: userData?.profile_Image}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.FieldContainer}>
          <Text style={styles.field_text}>Write Some thing Here....</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <FontAwesome5
            name="image"
            type="font-awesome"
            color="#593BFB"
            size={38}
          />
        </TouchableOpacity>
      </View>
      <CreatePostModal
        navigation={navigation}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        userData={userData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    padding: 10,
  },
  FieldContainer: {
    borderWidth: 2,
    borderColor: "#593BFB",
    borderRadius: 20,
    padding: 10,
  },
  field_text: {
    fontSize: 15,
    fontWeight: "500",
    color: "gray",
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default CreatorPostHeader;

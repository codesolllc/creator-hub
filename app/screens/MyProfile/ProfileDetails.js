import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ProfileHeader from "../../components/MyProfileComps/ProfileHeader";
import TextButton from "../../components/MyProfileComps/TextButton";
import Review from "../../components/MyProfileComps/Review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";


const ProfileDetails = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const NavigationToMyProfile = () => {
    navigation.navigate("MyProfile");
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUser(findUser.findUser);
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
    <ScrollView>
      <ProfileHeader />

      <View style={styles.container}>
        <TextButton title="Details" color="black" />
        <TextButton onPress={NavigationToMyProfile} title="Work" color="gray" />
      </View>

      <View style={styles.Main_container_About}>
        <View style={styles.Main_Inner_About}>
          <Text style={styles.Heading_ABout}>About</Text>
          <Text style={styles.Text_Content}>
            {user?.about}.
            </Text>
        </View>

        <View style={styles.Main_Inner_About}>
          <Text style={styles.Heading_ABout}>Job Description:</Text>
          <Text style={styles.Text_Content}>{user?.desc}</Text>
        </View>
      </View>

      <Review />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  Main_container_About: {
    alignItems: "center",
    justifyContent: "center",
  },
  Main_Inner_About: {
    justifyContent: "center",
    width: "90%",
    marginTop: 20,
  },
  Heading_ABout: {
    color: "#593BFB",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "left",
  },
  Text_Content: {
    fontSize: 16,
    color: "gray",
    textAlign: "left",
  },
});

export default ProfileDetails;

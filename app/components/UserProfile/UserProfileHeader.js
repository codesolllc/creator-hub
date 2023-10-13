import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileHeader = () => {
  const [user, setUser] = useState(null);

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
    <>
      <View style={styles.container}>
        <Image
          style={styles.Profile_picture_main}
          source={{ uri: user?.profile_Image }}
        />
        <Text style={styles.Header_heading}>{user?.name}</Text>
        <Text style={styles.Sub_Heading}>{user?.usertype}</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20, width: "100%", marginBottom: 40}}>
        <View style={styles.Main_container_About}>
          <View style={styles.Main_Inner_About}>
            <Text style={styles.Heading_ABout}>About</Text>
            <Text style={styles.Text_Content}>{user?.about}</Text>
          </View>

          <View style={styles.Main_Inner_About}>
            <Text style={styles.Heading_ABout}>Description:</Text>
            <Text style={styles.Text_Content}>{user?.desc}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  Profile_picture_main: {
    height: 150,
    width: 150,
    borderRadius: 50,
  },
  Header_heading: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  Sub_Heading: {
    fontSize: 15,
    fontWeight: "500",
    color: "gray",
    marginTop: 3,
  },
  button_reviews: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button_review_text: {
    color: "#593BFB",
    fontWeight: "600",
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

export default UserProfileHeader;

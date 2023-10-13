import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const HomeHeader = ({ navigation }) => {
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

  const NavigateToNotifications = () => {
    navigation.navigate("Notification");
  };

  const NavigateToChat = () => {
    navigation.navigate("Chats");
  };

  const NavigateToAccounts = () => {
    navigation.navigate("Accounts");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={NavigateToAccounts}>
          {user?.profile_Image ? 
          <Image
            style={styles.HeaderProfilePic}
            source={{ uri: user?.profile_Image }}
          />
          : 
          <Image
          style={styles.HeaderProfilePic}
          source={require("../../assets/Auth/user_profile.png")}
        />
        }
        </TouchableOpacity>
        <View style={styles.AllTexts}>
          <Text style={styles.Hi_TExt}>Hi, {user?.name}!</Text>
          <View style={styles.imageContainer}>
            <Text>Discover Your</Text>
            <Text style={styles.coutedText}>Dream Job</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={NavigateToNotifications}
            style={styles.IconsSpaces}
          >
            <Image source={require("../../assets/Home/notification.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={NavigateToChat} style={styles.IconsSpaces}>
            <Image source={require("../../assets/Home/message.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderProfilePic: {
    height: screenWidth * 0.15,
    width: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    marginTop: screenWidth * 0.05, 
    paddingHorizontal: screenWidth * 0.05, 
    paddingTop: screenWidth * 0.05,
  },
  Hi_TExt: {
    fontWeight: "600",
    fontSize: screenWidth * 0.05, 
  },
  coutedText: {
    color: "purple",
    fontSize: screenWidth * 0.0375, 
    fontWeight: "600",
    marginLeft: 5,
  },
  AllTexts: {
    marginLeft: screenWidth * 0.0175,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: screenWidth * 0.0125,
  },
  IconsSpaces: {
    marginLeft: screenWidth * 0.075,
  },
});

export default HomeHeader;

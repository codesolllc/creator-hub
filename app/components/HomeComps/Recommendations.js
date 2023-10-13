import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRecommendedUsersQuery } from "../../Redux/Reducers/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Recommendations = ({ navigation }) => {
  const recommendedUsers = useRecommendedUsersQuery();

  const [userId, setUserId] = useState("");

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
    <View
      style={{
        marginTop: 5,
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommendedUsers?.isLoading ? (
          <View style={{ alignItems: "center", marginBottom: 100 }}>
            <ActivityIndicator size="medium" color="#0000ff" />
          </View>
        ) : recommendedUsers?.isError ? (
          <Text style={{ textAlign: "center" }}>Unable to load users..</Text>
        ) : (
          recommendedUsers?.data
            ?.filter((item) => item._id !== userId)
            ?.map((item) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CreatorProfile", { item })}
                key={item?._id}
                style={{
                  alignItems: "center",
                  marginRight: 30,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              >
                <ImageBackground
                  source={{ uri: item?.banner_Img }}
                  style={styles.images_Background}
                >
                  <View style={styles.container}>
                    <Image
                      style={styles.subimage}
                      source={{ uri: item?.profile_Image }}
                    />
                    <Text style={styles.NameText}>{item?.name}</Text>
                    <Text style={styles.NameTextHead}>
                      {item?.city}, {item?.state}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    resizeMode: "contain",
    height: 200,
    width: 200,
  },
  images_Background: {
    height: 300,
    width: 300,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  NameText: {
    color: "#fff",
    fontSize: 20,
  },

  NameTextHead: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  subimage: {
    height: 70,
    width: 70,
    marginBottom: 20,
    borderRadius: 50,
  },
});

export default Recommendations;

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useVerifiedUsersQuery } from "../../Redux/Reducers/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopPhotographer = ({ navigation }) => {
  const verifiedUsers = useVerifiedUsersQuery();
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
        {verifiedUsers?.isLoading ? (
          <View style={{ alignItems: "center", marginBottom: 100 }}>
            <ActivityIndicator size="medium" color="#0000ff" />
          </View>
        ) : verifiedUsers?.isError ? (
          <Text style={{ textAlign: "center" }}>Unable to load users..</Text>
        ) : (
          verifiedUsers?.data
            ?.filter((item) => item._id !== userId)
            ?.map((item) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CreatorProfile", { item })}
                key={item?._id}
              >
                <View
                  style={{ alignItems: "center", marginRight: 10 }}
                >
                  <Image
                    source={{ uri: item?.profile_Image }}
                    style={styles.images}
                  />
                  <Text style={{ fontSize: 17, fontWeight: "500" }}>
                    {item.name}
                  </Text>
                </View>
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
    height: 100,
    width: 120,
    borderRadius: 10,
  },
});

export default TopPhotographer;

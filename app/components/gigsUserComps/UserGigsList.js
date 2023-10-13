import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import React from "react";
import {
  useGetAllGigsQuery,
  useGetUserGigQuery,
} from "../../Redux/Reducers/GigsReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("window");

const UserGigsList = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const getUserGig = useGetUserGigQuery(userId);
  const getAllGigs = useGetAllGigsQuery();
  const NavigateToSingleGigShow = (item) => {
    navigation.navigate("SingleGigShow", {
      item: item,
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      getUserGig.refetch();
      getAllGigs.refetch();
      setRefreshing(false);
    }, 2000);
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
    (async function () {
      try {
        const user = await AsyncStorage.getItem("usertype");
        setUserType(JSON.parse(user));
      } catch (error) {
        console.log(error, "unable to get user type!");
      }
    })();
    getUserData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.Main_container}>
        {userType === "user" ? (
          getUserGig.isLoading ? (
            <Text>Loading..</Text>
          ) : getUserGig.isError ? (
            <Text>Unable to display your gigs</Text>
          ) : getUserGig?.length === 0 ? (
            <Text style={{ textAlign: "center", flex: 1 }}>No Gig Avalaible!</Text>
          ) : (
            getUserGig?.data?.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => NavigateToSingleGigShow(item)}
              >
                <View style={styles.gigItemCard}>
                  <View>
                    <Image
                      style={styles.gig_images}
                      source={{ uri: item?.authorID?.profile_Image }}
                    />
                  </View>

                  <View style={styles.mainDetails_user}>
                    <Text style={styles.user_name}>{item?.authorID?.name}</Text>
                    <Text style={styles.userInfoTitle}>
                      {item?.description?.length > 20
                        ? item?.description?.substring(0, 25) + "..."
                        : item?.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.userInfoTitle}>{item?.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )
        ) : null}
        {userType === "creator" ? (
          getAllGigs.isLoading ? (
            <Text>Loading..</Text>
          ) : getAllGigs.isError ? (
            <Text>Unable to display your gigs</Text>
          ) : getAllGigs?.length === 0 ? (
            <Text style={{ textAlign: "center", flex: 1 }}>No Gig avalaible!</Text>
          ) : (
            getAllGigs?.data?.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => NavigateToSingleGigShow(item)}
              >
                <View style={styles.gigItemCard}>
                  <View>
                    <Image
                      style={styles.gig_images}
                      source={{ uri: item?.authorID?.profile_Image }}
                    />
                  </View>

                  <View style={styles.mainDetails_user}>
                    <Text style={styles.user_name}>{item?.authorID?.name}</Text>
                    <Text style={styles.userInfoTitle}>
                      {item?.description?.length > 20
                        ? item?.description?.substring(0, 25) + "..."
                        : item?.description}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.userInfoTitle}>{item?.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Main_container: {
    alignItems: "center",
    marginTop: height * 0.02, // Adjust the marginTop based on screen height
    marginBottom: height * 0.08, // Adjust the marginTop based on screen height
  },
  gigItemCard: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: width * 0.04, // Adjust the padding based on screen width
    marginBottom: height * 0.02, // Adjust the marginBottom based on screen height
    borderRadius: width * 0.06, // Adjust the borderRadius based on screen width
    shadowColor: "grey",
    width: width * 0.9, // Adjust the width based on screen width
    height: height * 0.15, // Adjust the height based on screen height
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,
    elevation: 5,
  },
  gig_images: {
    height: width * 0.12, // Adjust the height based on screen width
    width: width * 0.12, // Adjust the width based on screen width
    borderRadius: width * 0.03, // Adjust the borderRadius based on screen width
  },
  user_name: {
    fontSize: width * 0.04, // Adjust the fontSize based on screen width
    fontWeight: "500",
    color: "black",
  },
  mainDetails_user: {
    marginRight: width * 0.1, // Adjust the marginRight based on screen width
  },
});

export default UserGigsList;

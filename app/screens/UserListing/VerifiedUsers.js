import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useVerifiedUsersQuery } from "../../Redux/Reducers/UserReducer";

const UserCard = ({ imageSource, name, state, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image
        source={{ uri: imageSource }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.totalFollowers}>{state}</Text>
    </TouchableOpacity>
  );
};

const VerifiedUsers = ({ navigation }) => {
  const userByCategory = useVerifiedUsersQuery();

  const [userId, setUserId] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      userByCategory.refetch();
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
    getUserData();
  }, []);

  const navigateToCreatorProfile = (item) => {
    navigation.navigate("CreatorProfile", { item });
  };

  const renderItem = ({ item }) => {
    return (
      <UserCard
        imageSource={item.profile_Image}
        name={item.name}
        state={item.state}
        onPress={() => navigateToCreatorProfile(item)}
      />
    );
  };

  return (
    <>
      <View style={styles.categories_heading}>
        <View style={styles.Category_container_Main}>
          <Text style={styles.category_Heading_Text}>Recommended Users</Text>
        </View>
      </View>
      <View style={styles.Main_container}>
        {userByCategory?.data?.userData?.length === 0 ? (
          <Text>Not Verified User Available!</Text>
        ) : (
          <FlatList
            data={userByCategory?.data?.filter((item) => item._id !== userId)}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Main_container: {
    padding: 10,
    marginTop: 90,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  totalFollowers: {
    fontSize: 16,
    paddingVertical: 5,
    color: "gray",
  },
  category_Heading_Text: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
    marginTop: 30,
  },
  Category_container_Main: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  categories_heading: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#593BFB",
    backgroundColor: "#593BFB",
  },
});

export default VerifiedUsers;

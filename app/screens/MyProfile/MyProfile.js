import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/MyProfileComps/ProfileHeader";
import TextButton from "../../components/MyProfileComps/TextButton";
import Photos from "../../components/MyProfileComps/Photos";
import Videos from "../../components/MyProfileComps/Videos";
import Content from "../../components/MyProfileComps/Content";
import Selling from "../../components/MyProfileComps/Selling";
import { useGetUserPostsQuery } from "../../Redux/Reducers/PostReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyProfile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const allPost = useGetUserPostsQuery(userId);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      allPost.refetch();
      setRefreshing(false);
    }, 2000);
  };

  const NavigateToProfiledetails = () => {
    navigation.navigate("ProfileDetails");
  };

  const [currentComponent, setCurrentComponent] = useState(1);

  const renderComponent = (posts) => {
    switch (currentComponent) {
      case 1:
        return <Photos navigation={navigation} posts={posts} />;
      case 2:
        return <Videos navigation={navigation} posts={posts} />;
      case 3:
        return <Content navigation={navigation} posts={posts} />;
      case 4:
        return <Selling navigation={navigation} />;
      default:
        return null;
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileHeader navigation={navigation} />

      <View style={styles.container}>
        <TextButton
          onPress={NavigateToProfiledetails}
          title="Details"
          color="gray"
        />
        <TextButton title="Work" color="black" />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => setCurrentComponent(1)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 1 && styles.activeTab,
            ]}
          >
            Photos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => setCurrentComponent(2)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 2 && styles.activeTab,
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => setCurrentComponent(3)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 3 && styles.activeTab,
            ]}
          >
            Content
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setCurrentComponent(4)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 4 && styles.activeTab,
            ]}
          >
            Selling
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.componentContainer}>
        {renderComponent(allPost.data)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  tabsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 9,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginRight: 10,
  },
  activeTab: {
    color: "#593BFB",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  componentContainer: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  componentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyProfile;

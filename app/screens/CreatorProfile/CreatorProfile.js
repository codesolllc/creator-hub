import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import ProfileHeader from "../../components/CreatorProfileComps/ProfileHeader";
import TextButton from "../../components/CreatorProfileComps/TextButton";
import Photos from "../../components/CreatorProfileComps/Photos";
import Videos from "../../components/CreatorProfileComps/Videos";
import Content from "../../components/CreatorProfileComps/Content";
import Selling from "../../components/CreatorProfileComps/Selling";
import { useGetUserPostsQuery } from "../../Redux/Reducers/PostReducer";
import { BackgroundImage } from "react-native-elements/dist/config";

const CreatorProfile = ({ route, navigation }) => {
  const { item } = route.params;
  const allPost = useGetUserPostsQuery(item?._id);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      allPost.refetch();
      setRefreshing(false);
    }, 2000);
  };

  const NavigateToProfiledetails = () => {
    navigation.navigate("CreatorProfileDetails", { item });
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
        return <Selling navigation={navigation} item={item} />;
      default:
        return null;
    }
  };

  return (
    <BackgroundImage
      source={require("../../assets/Home/bg_img.png")}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileHeader navigation={navigation} item={item} />

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
    </BackgroundImage>
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

export default CreatorProfile;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import BackgroundImage from "../../components/extras/BackgroundImage";
import HomeHeader from "../../components/HomeComps/HomeHeader";
import HomeSearch from "../../components/HomeComps/HomeSearch";
import Categories from "../../components/HomeComps/Categories";
import Recommendations from "../../components/HomeComps/Recommendations";
import TopPhotographer from "../../components/HomeComps/TopPhotographer";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const NavigateToCategoryListing = () => {
    navigation.navigate("CategoryListing");
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
        <View style={{ marginBottom: height * 0.1 }}>
          <HomeHeader navigation={navigation} />

          <HomeSearch navigation={navigation} />

          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Categories</Text>
            <TouchableOpacity onPress={NavigateToCategoryListing}>
              <Text style={styles.readmoretext}>View More...</Text>
            </TouchableOpacity>
          </View>
          <Categories navigation={navigation} />

          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Recommendations</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RecommendedUsers")}
            >
              <Text style={styles.readmoretext}>View More...</Text>
            </TouchableOpacity>
          </View>
          <Recommendations navigation={navigation} />

          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Verified Creators</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("VerifiedUsers")}
            >
              <Text style={styles.readmoretext}>View More...</Text>
            </TouchableOpacity>
          </View>
          <TopPhotographer navigation={navigation} />
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  futuretext: {
    fontSize: width * 0.05, // Example of using width for responsiveness
  },
  message: {
    fontSize: width * 0.06, // Example of using width for responsiveness
    fontWeight: "bold",
    marginBottom: height * 0.02, // Example of using height for responsiveness
  },
  subMessage: {
    fontSize: width * 0.04, // Example of using width for responsiveness
    textAlign: "center",
    marginHorizontal: width * 0.05, // Example of using width for responsiveness
    marginBottom: height * 0.02, // Example of using height for responsiveness
  },
  HeaderProfilePic: {
    height: width * 0.2, // Example of using width for responsiveness
    width: width * 0.2, // Example of using width for responsiveness
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subheadingtext: {
    fontSize: width * 0.06, // Example of using width for responsiveness
    fontWeight: "600",
  },
  subHeadingcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: width * 0.05, // Example of using width for responsiveness
    marginVertical: height * 0.01, // Example of using height for responsiveness
  },
  readmoretext: {
    color: "gray",
    fontSize: width * 0.05,
    marginTop: height * 0.01,
  },
});

export default Home;

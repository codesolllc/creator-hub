import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,

} from "react-native";
import BackgroundImage from "../../components/extras/BackgroundImage";
import { useGetConnectionsQuery } from "../../Redux/Reducers/CommunityReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyNetwork = ({ navigation }) => {
  const [user_id, setUser_id] = useState("");

  const getData = async () => {
    try {
      const userdata = await AsyncStorage.getItem("userdata");
      const idExtractor = JSON.parse(userdata);
      const userID = idExtractor.findUser._id;
      setUser_id(userID);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id]);

  const getConnections = useGetConnectionsQuery(user_id, {
    skip: !user_id,
  });

  const navigateTo = (item) => {
    if (item.usertype === "creator") {
      navigation.navigate("CreatorProfile", { item: item });
    } else {
      navigation.navigate("SingleUserProfile", { item: item });
    }
  };

  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getConnections.refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <BackgroundImage
      source={require("../../assets/Home/bg_img.png")}
    >
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Text style={styles.HeadText}>My Network</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.Margin_on_scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {getConnections?.data?.connections?.map((Network) => (
            <TouchableOpacity
              key={Network?._id}
              onPress={() => navigateTo(Network.requests)}
              style={styles.tabItem}
            >
              <Image
                style={styles.Image_Banner}
                source={{ uri: Network?.requests?.banner_Img }}
              />
              <View style={styles.MainContainer}>
                <View style={styles.Profile}>
                  <Image
                    style={styles.Network_profile_image}
                    source={{ uri: Network?.requests?.profile_Image }}
                  />
                  <Text style={styles.HeadingNameColor}>
                    {Network?.requests?.name}
                  </Text>
                  <Text>{Network?.requests?.usertype}</Text>
                </View>

                <View style={styles.SecondaryColoumn}>
                  <Text style={styles.HeadingAboutColor}>About</Text>
                  <Text style={styles.AboutData}>
                    {Network?.requests?.about}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  HeadingNameColor: {
    marginTop: 10,
    color: "purple",
    fontWeight: "600",
  },
  HeadingAboutColor: {
    color: "purple",
    fontWeight: "600",
  },
  AboutData: {
    fontSize: 12,
  },
  SecondaryColoumn: {
    padding: 10,
    justifyContent: "center",
    width: "63%",
  },
  Profile: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  HeadText: {
    position: "absolute",
    top: 70,
    fontSize: 20,
    fontWeight: "500",
  },
  text_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  Margin_on_scroll: {
    marginTop: 100,
    marginBottom: 20,
  },
  MainContainer: {
    flexDirection: "row",
    padding: 10,
  },
  Image_Banner: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 50,
  },
  Network_profile_image: {
    marginTop: -40,
    height: 70,
    borderRadius: 50,
    width: 70,
  },
  tabItem: {
    borderRadius: 18,
    marginHorizontal: 30,
    marginBottom: 18,
    backgroundColor: "#fff",
  },
});

export default MyNetwork;

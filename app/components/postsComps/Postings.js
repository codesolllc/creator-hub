import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { Video } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetAllPostsQuery } from "../../Redux/Reducers/PostReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";


const Postings = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const allPosts = useGetAllPostsQuery(userId);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      allPosts.refetch();
      setRefreshing(false);
    }, 2000);
  };

  const Simulation = () => {
    setTimeout(() => {
      setIsLoading(false);
      setLoadedPosts(allPosts?.data?.slice(0, 5));
    }, 2000);
  };

  const loadMorePosts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoadedPosts((prevPosts) => {
        const remainingPosts = allPosts?.data?.slice(prevPosts.length);
        return [...prevPosts, ...remainingPosts.slice(0, 3)];
      });
    }, 2000);
  };

  const navigateToSinglePost = (post) => {
    navigation.navigate("SinglePost", { post });
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
    Simulation();
    getUserData();
  }, [allPosts]);

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToSinglePost(item)}>
      <View style={styles.Post_MAin}>
        <View style={styles.Post_data}>
          <View style={styles.post_Footer}>
            <Image
              style={styles.footerimage}
              source={{ uri: item?.authorID?.profile_Image }}
            />
            <Text style={styles.Post_userName}>{item?.authorID?.name}</Text>
          </View>
          <View style={styles.Foter_data_Of_post}>
            <Text style={styles.Post_Data_Text_Head}>{item.title}</Text>
            <Text style={styles.Fotter_text_description}>
              {item.description.substring(0, 100)}...
            </Text>
          </View>
          {item.image ? (
            <Image style={styles.Post_image} source={{ uri: item?.image }} />
          ) : item?.video ? (
            <View style={{ width: "100%", height: 210, resizeMode: "cover" }}>
              <Video
                source={{ uri: item?.video }}
                style={styles.Post_video}
                useNativeControls={false}
                // isLooping={false}
                // posterSource={{ uri: item?.video }}
                isLooping={true}
                shouldPlay={true}
                isMuted={true}
            resizeMode="contain"

              />
            </View>
          ) : (
            <Image
              source={require("../../assets/SinglePost/contentpostrandom.gif")}
              style={styles.postImage}
              resizeMode="cover"
            />
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View
              style={{
                marginLeft: 12,
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
            >
              <AntDesign name="heart" size={22} color="red" />
              <Text style={{ fontWeight: "bold" }}>
                {item?.likes?.length} Likes
              </Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <Text style={{ fontWeight: "bold" }}>
                {item?.comments?.length} Comments
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {allPosts.isError ? (
        <Text>Unable To Show Posts!</Text>
      ) : allPosts.isLoading ? (
        <>
          <Text>Loading...</Text>
          <ActivityIndicator size={30} color="#0000ff" />
        </>
      ) : allPosts.data.length === 0 ? (
        <Text>Not Post Yet!</Text>
      ) : (
        allPosts.data && (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={loadedPosts}
            keyExtractor={(item) => item._id}
            renderItem={renderPostItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <>
                {isLoading && (
                  <View style={styles.margining_bottoms}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#5853FF",
                        fontSize: 14,
                        marginTop: 10,
                      }}
                    >
                      Loading
                    </Text>
                    <ActivityIndicator size={30} color="#5853FF" />
                  </View>
                )}
                {!isLoading && allPosts?.data?.length > loadedPosts?.length && (
                  <TouchableOpacity
                    style={styles.margining_bottoms}
                    onPress={loadMorePosts}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        marginTop: 20,
                        backgroundColor: "#5853FF",
                        width: 100,
                        borderRadius: 50,
                        padding: 5,
                      }}
                    >
                      Load more
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 70,
  },
  margining_bottoms: {
    marginBottom: 50,
    alignItems: "center",
  },
  Post_MAin: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 3,
    backgroundColor: "#E9E9E9",
    paddingVertical: 18,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden",
  },
  post_Footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  footerimage: {
    height: hp("5%"),
    width: hp("5%"),
    borderRadius: 50,
  },
  Post_data: {
    textAlign: "center",
    justifyContent: "center",
    width: wp("96%"),
  },
  Post_image: {
    width: wp("100%"),
    height: hp("30%"),
    resizeMode: "cover",
  },
  Post_Data_Text_Head: {
    color: "#5853FF",
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  Foter_data_Of_post: {
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: hp("1%"),
  },
  Fotter_text_description: {
    color: "#4C4E52",
    fontSize: 14,
  },
  Post_userName: {
    marginLeft: hp("1%"),
    fontSize: hp("2%"),
    color: "gray",
  },
  Post_video: {
    width: "98%",
    height: hp("25%"),
    borderRadius: 10
  },
  postImage: {
    width: wp("100%"),
    height: hp("25%"),
  },
});

export default Postings;

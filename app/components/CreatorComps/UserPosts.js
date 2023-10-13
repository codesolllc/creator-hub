import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Video } from "expo-av";
import CommentsModal from "./CommentsModal";
import {
  useGetAllPostsQuery,
  useLikePostMutation,
} from "../../Redux/Reducers/PostReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBookMarkPostMutation } from "../../Redux/Reducers/BookMarkedReducer";

const UserPosts = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [likesUser, setLikedUsers] = useState([]);
  const allPost = useGetAllPostsQuery(userId);
  const [likePost] = useLikePostMutation();
  const allPosts = useGetAllPostsQuery(userId);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      allPosts.refetch();
      setRefreshing(false);
    }, 2000);
  };

  const [bookMarkPost] = useBookMarkPostMutation();

  const toggleModal = (data) => {
    setLikedUsers(data);
    setModalVisible(!isModalVisible);
  };

  const Simulation = () => {
    // Simulate loading with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      setLoadedPosts(allPost?.data?.slice(0, 5));
    }, 2000);
  };

  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate loading with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      setLoadedPosts((prevPosts) => {
        const remainingPosts = allPost?.data?.slice(prevPosts.length);
        return [...prevPosts, ...remainingPosts?.slice(0, 3)];
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
  }, [allPost]);

  const handleLikes = async (postId) => {
    try {
      const res = await likePost({
        _user_id: userId,
        Post_Id: postId,
      });
    } catch (error) {
      console.log("failed to liked", error.message);
    }
  };

  const onBookmark = async (postid) => {
    try {
      const res = await bookMarkPost({
        userID: userId,
        postID: postid,
      });
      if (!res.error) {
        allPost.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.Post_MAin}>
      <View style={styles.Action_Button_gap}>
        <TouchableOpacity
          style={
            item.likes.some((item) => item.userID?._id === userId)
              ? styles.Liked_buttons
              : styles.Action_buttons
          }
          onPress={() => handleLikes(item?._id)}
        >
          <Image
            style={styles.action_button_icons}
            source={require("../../assets/Creator/like.png")}
          />
        </TouchableOpacity>
        <Text
          style={styles.action_buton_text}
          onPress={() => toggleModal(item?.likes)}
        >
          {item?.likes?.length}
        </Text>
        <TouchableOpacity
          onPress={() => navigateToSinglePost(item)}
          style={styles.Action_buttons}
        >
          <Image
            style={styles.action_button_icons}
            source={require("../../assets/Creator/rename.png")}
          />
        </TouchableOpacity>
        <Text style={styles.action_buton_text}>{item?.comments?.length}</Text>
        <TouchableOpacity
          onPress={() => onBookmark(item?._id)}
          style={styles.save_bookmark_buttons}
        >
          {item?.bookmark === false ? (
            <FontAwesome5
              name="bookmark-outline"
              type="font-awesome"
              color="#333"
              size={32}
            />
          ) : (
            <FontAwesome5
              name="bookmark"
              type="Ionicons"
              color="red"
              size={32}
            />
          )}
        </TouchableOpacity>
        {/* <Text style={styles.action_buton_text}>2</Text> */}
        {item?.image && item?.video ? (
          <View style={styles.View_gaping}></View>
        ) : null}
      </View>

      <View style={{ width: "100%" }}>
        <View style={styles.post_Footer}>
          <Image
            style={styles.footerimage}
            source={{ uri: item?.authorID?.profile_Image }}
          />
          <Text style={styles.Post_userName}>{item?.authorID?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigateToSinglePost(item)}
          style={styles.Post_data}
        >
          {item?.image ? (
            <Image style={styles.Post_image} source={{ uri: item?.image }} />
          ) : item?.video ? (
            <Video
              source={{ uri: item?.video }}
              style={styles.Post_video}
              useNativeControls={false}
              // resizeMode="contain"
              isLooping={true}
              shouldPlay={true}
              isMuted={true}
              // posterSource={{ uri: item?.video }}
            />
          ) : (
            <Image
              source={require("../../assets/SinglePost/contentpostrandom.gif")}
              style={styles.postImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.Foter_data_Of_post}>
            <Text style={styles.Post_Data_Text_Head}>{item?.title}</Text>
            <Text style={styles.Fotter_text_description}>
              {item?.description.substring(0, 100)}...
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ marginTop: 90, backgroundColor: "#fff", paddingBottom: 70 }}>
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
              <View style={{ alignItems: "center", marginBottom: 100 }}>
                <ActivityIndicator size="medium" color="#5853FF" />
              </View>
            )}
            {!isLoading && allPost?.data?.length > loadedPosts?.length && (
              <TouchableOpacity
                style={{ marginBottom: 100, alignItems: "center" }}
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
      {isModalVisible ? (
        <CommentsModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          likesUser={likesUser}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Post_MAin: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 5,
    backgroundColor: "#E9E9E9",
    paddingVertical: 18,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  post_Footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  footerimage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  Action_buttons: {
    backgroundColor: "#5853FF",
    borderRadius: 50,
    padding: 12,
  },
  Liked_buttons: {
    backgroundColor: "red",
    borderRadius: 50,
    padding: 12,
  },
  save_bookmark_buttons: {
    borderRadius: 50,
    padding: 12,
  },
  action_button_icons: {
    height: 20,
    width: 20,
  },
  Post_data: {
    textAlign: "center",
    justifyContent: "center",
    width: "75%",
  },
  Action_Button_gap: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "17%",
  },
  Post_image: {
    width: "100%",
    height: 200,
    // resizeMode: "contain",
    borderRadius: 10,
  },
  Post_Data_Text_Head: {
    color: "#5853FF",
    fontSize: 23,
    fontWeight: "600",
  },
  Foter_data_Of_post: {
    marginTop: 10,
  },
  Fotter_text_description: {
    color: "black",
    fontSize: 17,
    marginTop: 8,
  },
  Post_userName: {
    marginLeft: 6,
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  View_gaping: {
    height: 80,
  },
  action_buton_text: {
    fontSize: 15,
    fontWeight: "600",
  },
  Post_video: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default UserPosts;

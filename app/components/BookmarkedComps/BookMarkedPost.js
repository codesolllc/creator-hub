import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import CommentsModal from "../CreatorComps/CommentsModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLikePostMutation } from "../../Redux/Reducers/PostReducer";
import {
  useBookMarkPostMutation,
  useGetUserBookMarksQuery,
} from "../../Redux/Reducers/BookMarkedReducer";
import FontAwesome5 from "react-native-vector-icons/Ionicons";

const BookMarkedPost = ({ navigation }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const BookmarkedPosts = useGetUserBookMarksQuery(userId, { skip: !userId });
  const [bookMarkPost] = useBookMarkPostMutation();

  const [likePost] = useLikePostMutation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const Simulation = () => {
    // Simulate loading with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      setLoadedPosts(BookmarkedPosts?.data?.savePosts?.slice(0, 5));
    }, 2000);
  };

  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate loading with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      setLoadedPosts((prevPosts) => {
        const remainingPosts = BookmarkedPosts?.data?.savePosts?.slice(
          prevPosts.length
        );
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
  }, [BookmarkedPosts]);

  const handleLikes = async (postId) => {
    try {
      const res = await likePost({
        _user_id: userId,
        Post_Id: postId,
      });
      if (!res.error) {
        alert("Liked");
        BookmarkedPosts.refetch();
      }
    } catch (error) {
      console.log("failed to liked", error.message);
    }
  };

  const onBookmark = async (postid) => {
    try {
      console.log("postid :", postid, " UserID:", userId);
      const res = await bookMarkPost({
        userID: userId,
        postID: postid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      BookmarkedPosts.refetch();
      setRefreshing(false);
    }, 2000);
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.Post_MAin}>
      <View style={styles.Action_Button_gap}>
        <TouchableOpacity onPress={toggleModal} style={styles.Action_buttons}>
          <Image
            style={styles.action_button_icons}
            source={require("../../assets/Creator/rename.png")}
          />
        </TouchableOpacity>
        <Text style={styles.action_buton_text}>
          {item?.postID.comments?.length}
        </Text>
        <TouchableOpacity
          style={
            item?.likes?.some((item) => item?.userID?._id === userId)
              ? styles.Liked_buttons
              : styles.Action_buttons
          }
          onPress={() => handleLikes(item?.postID?._id)}
        >
          {item?.likes?.some((item) => item?.userID?._id === userId) ? (
            <Image
              style={styles.action_button_icons}
              source={require("../../assets/Creator/like.png")}
            />
          ) : (
            <Image
              style={styles.action_button_icons}
              source={require("../../assets/Creator/like.png")}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.action_buton_text}>
          {item?.postID.likes?.length}
        </Text>
        <TouchableOpacity
          onPress={() => onBookmark(item.postID._id)}
          style={styles.save_bookmark_buttons}
        >
          {item?.postID?.bookmark === false ? (
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
        <Text style={styles.action_buton_text}></Text>
        {item?.image && item?.video ? (
          <View style={styles.View_gaping}></View>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => navigateToSinglePost(item.postID)}
        style={styles.Post_data}
      >
        {item?.postID?.image ? (
          <Image style={styles.Post_image} source={{ uri: item?.postID?.image }} />
        ) : item?.postID?.video ? (
          <Video
            source={{ uri: item?.postID?.video }}
            style={styles.Post_video}
            useNativeControls={false}
            resizeMode="contain"
            // isLooping={false}
            // posterSource={{ uri: item?.video }}
            isLooping={true}
            shouldPlay={true}
            isMuted={true}
            />
        ) : (
          <Image
            source={require("../../assets/SinglePost/contentpostrandom.gif")}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.Foter_data_Of_post}>
          <Text style={styles.Post_Data_Text_Head}>{item?.postID.title}</Text>
          <Text style={styles.Fotter_text_description}>
            {item?.postID.description.substring(0, 70)}
          </Text>
          <View style={styles.post_Footer}>
            <Image
              style={styles.footerimage}
              source={{ uri: item?.postID.authorID?.profile_Image }}
            />
            <Text style={styles.Post_userName}>
              {item?.postID.authorID?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      {BookmarkedPosts?.data?.savePosts?.length === 0 ? (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
      You Haven't Bookmarked Yet!
        </Text>
      ) : (
        <FlatList
          data={loadedPosts}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item._id}
          renderItem={renderPostItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <>
              {isLoading && (
                <View style={{ alignItems: "center", marginBottom: 100 }}>
                  <Text>Loading</Text>
                </View>
              )}
              {!isLoading &&
                BookmarkedPosts?.data?.savePosts?.length >
                  loadedPosts?.length && (
                  <TouchableOpacity
                    style={{ marginBottom: 100 }}
                    onPress={loadMorePosts}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "blue",
                        fontSize: 18,
                        marginTop: 10,
                      }}
                    >
                      Load more posts...
                    </Text>
                  </TouchableOpacity>
                )}
            </>
          )}
        />
      )}
      <CommentsModal isVisible={isModalVisible} onClose={toggleModal} />
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
    marginVertical: 20,
  },
  post_Footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  footerimage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  Action_buttons: {
    backgroundColor: "#5853FF",
    borderRadius: 50,
    padding: 12,
  },
  save_bookmark_buttons: {
    borderRadius: 50,
    padding: 12,
  },
  Liked_buttons: {
    backgroundColor: "red",
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
    width: "17%",
    gap:10
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
    fontSize: 16,
    color: "gray",
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
    height: 200,
    borderRadius: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default BookMarkedPost;

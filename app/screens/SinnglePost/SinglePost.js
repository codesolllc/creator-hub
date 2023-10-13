import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdatePostModal from "../../components/UpdatePostModal/UpdatePostModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useCreateCommentMutation } from "../../Redux/Reducers/CommentsReducer";
import PostComments from "../../components/PostComments/PostComments";
import BackgroundImage from "../../components/extras/BackgroundImage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  useDeletePostMutation,
  useGetSinglePostQuery,
} from "../../Redux/Reducers/PostReducer";

const SinglePost = ({ route, navigation }) => {
  const { post } = route.params;
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewImage, setViewImage] = useState(false);

  // api queries & mutations.
  const [deletePost] = useDeletePostMutation();
  const [createComment] = useCreateCommentMutation();
  const singlePost = useGetSinglePostQuery(post?._id, {
    skip: !post?._id,
    pollingInterval: 5000,
  });
  // handle modelals
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  // handle app refresher
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      singlePost.refetch();
      setRefreshing(false);
    }, 2000);
  };

  // handle api's functions
  const DeletePost = async () => {
    try {
      const res = await deletePost({
        _author_id: userId,
        Post_Id: post._id,
      });
      if (!res.error) {
        navigation.goBack();
      } else {
        console.log("Failed To Delete Post");
      }
    } catch (error) {
      console.log(error, "unable");
    }
  };

  const handleCommentSubmit = async () => {
    if (comment) {
      try {
        const res = await createComment({
          userId,
          postId: post._id,
          data: {
            comments: comment,
          },
        });
        if (!res.error) {
          singlePost.refetch(post?._id);
          setComment("");
        }
      } catch (error) {
        alert("unable to post comment! try later!");
      }
    } else {
      alert("Comment field empty!");
    }
  };

  useEffect(() => {
    (async function () {
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
    })();
  }, []);

  return (
    <>
      <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.postContainer}>
              <TouchableOpacity
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 20,
                  marginBottom: 10,
                }}
                onPress={() =>
                  navigation.navigate("CreatorProfile", {
                    item: singlePost?.data?.authorID,
                  })
                }
              >
                <Image
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                  source={{
                    uri: singlePost?.data?.authorID?.profile_Image,
                  }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {singlePost?.data?.authorID?.name}
                </Text>
              </TouchableOpacity>
              {singlePost?.data?.image ? (
                <TouchableOpacity onPress={() => setViewImage(true)}>
                  <Image
                    source={{ uri: singlePost?.data?.image }}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : singlePost?.data?.video ? (
                <TouchableOpacity onPress={() => setViewImage(true)}>
                  <Video
                    source={{ uri: singlePost?.data?.video }}
                    style={styles.Post_video}
                    useNativeControls={true}
                    resizeMode="contain"
                    shouldPlay={true}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  source={require("../../assets/SinglePost/contentpostrandom.gif")}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              )}

              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={styles.likesSharesContainer}>
                <View style={styles.IconText_HEdSoro}>
                  <AntDesign name="heart" size={22} color="red" />
                  <Text style={styles.likes}>
                    {singlePost?.data?.likes?.length} Likes
                  </Text>
                </View>
                <View style={styles.IconText_HEdSoro}>
                  <AntDesign name="mail" size={22} color="#593BFB" />
                  <Text style={styles.Comments_Tab}>
                    {singlePost?.data?.comments?.length} Comments
                  </Text>
                </View>
              </View>
              <View style={styles.likesSharesContainer}>
                <View style={styles.IconText_HEdSoro}></View>
                {post?.authorID === userId ? (
                  <View style={styles.IconText_HEdSoro}>
                    <TouchableOpacity onPress={toggleDeleteModal}>
                      <AntDesign name="delete" size={22} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleModal}>
                      <AntDesign name="edit" size={22} color="#593BFB" />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <Text style={styles.postContent}>
                {singlePost?.data?.description}
              </Text>
            </View>

            <View style={styles.commentFieldContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={handleCommentSubmit}
              >
                <Text style={styles.commentButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
            {singlePost?.data?.comments?.map((item) => (
              <PostComments
                key={item._id}
                item={item}
                postId={singlePost?.data?._id}
                userId={userId}
                refetch={singlePost}
              />
            ))}
          </ScrollView>
          <DeleteModal
            isVisible={isDeleteModalVisible}
            onClose={toggleDeleteModal}
            delFun={DeletePost}
          />
          <UpdatePostModal
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            post={post}
          />
        </View>
      </BackgroundImage>
      {viewImage ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 20 }}
            onPress={() => setViewImage(false)}
          >
            <Text style={{ color: "white", fontSize: 40 }}>X</Text>
          </TouchableOpacity>
          {singlePost?.data?.image ? (
            <Image
              source={{ uri: singlePost?.data?.image }}
              style={styles.postImageView}
              resizeMode="cover"
            />
          ) : singlePost?.data?.video ? (
            <Video
              source={{ uri: singlePost?.data?.video }}
              style={styles.Post_video}
              useNativeControls={true}
              resizeMode="contain"
              isLooping={true}
              posterSource={{ uri: singlePost?.data?.video }}
              playbackControlsTimeout={1}
              shouldPlay={true}
            />
          ) : (
            <Image
              source={require("../../assets/SinglePost/contentpostrandom.gif")}
              style={styles.postImageView}
              resizeMode="cover"
            />
          )}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  postImageView: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
    color: "#593BFB",
  },
  likesSharesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  postContent: {
    fontSize: 18,
    marginTop: 10,
  },
  commentsContainer: {
    marginBottom: 20,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentUserProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentUserName: {
    fontSize: 19,
    marginLeft: 10,
    fontWeight: "600",
  },
  commentText: {
    marginVertical: 9,
    fontSize: 17,
    fontWeight: "400",
  },
  replyContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginLeft: 20,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyUserProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  replyUserName: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "600",
  },
  replyText: {
    fontSize: 15,
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  replyInput: {
    fontSize: 14,
    paddingVertical: 4,
    marginRight: 8,
    width: "80%",
  },
  replyButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#593BFB",
    borderRadius: 14,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  replyButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  replyButton2: {
    paddingVertical: 4,
    paddingHorizontal: 18,
    backgroundColor: "#593BFB",
    borderRadius: 4,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  replyButtonText2: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  commentFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  commentButton: {
    marginLeft: 10,
    paddingVertical: 8,
  },
  commentButtonText: {
    fontSize: 16,
    color: "#593BFB",
  },
  likes: {
    fontSize: 17,
    marginLeft: 6,
    color: "black",
  },
  Comments_Tab: {
    fontSize: 17,
    marginLeft: 6,
    color: "black",
  },
  IconText_HEdSoro: {
    flexDirection: "row",
  },
  Post_video: {
    width: "100%",
    height: 300,
    // borderRadius: 10,
  },
});

export default SinglePost;

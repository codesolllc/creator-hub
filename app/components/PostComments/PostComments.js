import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import {
  useCreateCommentReplyMutation,
  useDeleteCommentMutation,
  useDeleteCommentReplyMutation,
} from "../../Redux/Reducers/CommentsReducer";
import DeleteModal from "../DeleteModal/DeleteModal";
import ReplyCommentsPost from "./ReplyComments";
const PostComments = ({ item, postId, userId, refetch }) => {
  const [editTooltip, setEditTooltip] = useState(false);
  const [reply, setReply] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteCommentModalVisible, setIsDeleteCommentModalVisible] =useState(false);
  const [replyPost] = useCreateCommentReplyMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [delteReply] = useDeleteCommentReplyMutation();
  const [replyId, setReplyId] = useState();


  const handleReplySubmit = async () => {
    if (reply) {
      try {
        const res = await replyPost({
          userId: userId,
          postId: postId,
          commentId: item._id,
          data: {
            comments: reply,
          },
        });
        if (!res.error) {
          setReply("");
          refetch.refetch();
        } else {
          setReply("");
        }
      } catch (error) {
        alert("Unable to post comment reply! try later");
      }
    } else {
      alert("Reply field empty!");
    }
  };

  const toggleDeleteModal = (id) => {
    setReplyId(id);
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };
  const toggleDeleteCommentModal = () => {
    setIsDeleteCommentModalVisible(!isDeleteCommentModalVisible);
  };

  const handleDelteReply = async () => {
    try {
      const res = await delteReply({
        userId: userId,
        postId: postId,
        commentId: item._id,
        replyId: replyId,
      });
      if (!res.error) {
        refetch.refetch();
        setIsDeleteModalVisible(false);
      } else {
        alert("Unable to Delete Reply! Try Again.");
      }
    } catch (error) {}
  };

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment({
        userId: userId,
        postId: postId,
        commentId: item._id,
      });
      if (!res.error) {
        refetch.refetch();
        setIsDeleteCommentModalVisible(false);
      } else {
        alert("Unable to Delete Comment! Try Again.");
      }
    } catch (error) {}
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: item.userID.profile_Image }}
            style={styles.commentUserProfileImage}
          />
          <Text style={styles.commentUserName}>{item.userID.name}</Text>
        </View>
        <View>
          {userId === item.userID?._id ? (
            <>
              <Text
                onPress={() => setEditTooltip(!editTooltip)}
                style={{ fontWeight: "bold", fontSize: 16 }}
              >
                :
              </Text>
              {editTooltip ? (
                <View style={styles.editForm}>
                  <TouchableOpacity onPress={toggleDeleteCommentModal}>
                    <Text style={{ textAlign: "center" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : null}
        </View>
      </View>
      
      <Text style={styles.commentText}>{item.comments}</Text>

      {item.replies &&
        item.replies.map((reply) => (
          <ReplyCommentsPost
            key={reply?._id}
            reply={reply}
            userId={userId}
            toggleDeleteModal={toggleDeleteModal}
          />
        ))}
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyInput}
          placeholder="Write a reply..."
          value={reply}
          onChangeText={setReply}
        />
        <TouchableOpacity
          style={styles.replyButton}
          onPress={handleReplySubmit}
        >
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={toggleDeleteModal}
        delFun={handleDelteReply}
      />
      <DeleteModal
        isVisible={isDeleteCommentModalVisible}
        onClose={toggleDeleteCommentModal}
        delFun={handleDeleteComment}
      />
    </View>
  );
};

export default PostComments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 20,
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
    justifyContent: "space-between",
    position: "relative",
  },
  editForm: {
    position: "absolute",
    right: 0,
    top: 25,
    width: 70,
    backgroundColor: "lightgray",
    zIndex: 100,
    padding: 3,
    borderRadius: 10,
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
    marginBottom: 20,
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 50,
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
    justifyContent: "space-between",
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
  delBtn: {
    fontSize: 15,
    color: "red",
    alignItems: "flex-end",
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  replyInput: {
    // flex: 1,
    fontSize: 14,
    paddingVertical: 4,
    marginRight: 8,
    width: "80%",
  },
  replyButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: "#593BFB",
    borderRadius: 14,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  replyButtonText: {
    color: "#fff",
    fontSize: 12,
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
    color: "#007BFF",
  },
  likes: {
    fontSize: 17,
    marginLeft: 6,
    color: "red",
  },
  Comments_Tab: {
    fontSize: 17,
    marginLeft: 6,
    color: "red",
  },
  IconText_HEdSoro: {
    flexDirection: "row",
  },
  Post_video: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

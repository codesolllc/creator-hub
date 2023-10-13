import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
const PostComments = ({ item }) => {
  const [reply, setReply] = useState("");

  const handleReplySubmit = () => {};

  return (
    <>
      <View key={reply._id} style={styles.replyContainer}>
        <View style={styles.replyHeader}>
          {/* <Image
                  source={reply.userProfileImage}
                  style={styles.replyUserProfileImage}
                /> */}
          <Text style={styles.replyUserName}>{reply.userName}</Text>
        </View>
        <Text style={styles.replyText}>{reply.text}</Text>
      </View>

      {/* reply field.... */}
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyInput}
          placeholder="Write a reply..."
          value={reply}
          onChangeText={setReply}
        />
        <TouchableOpacity
          style={styles.replyButton}
          onPress={() => handleReplySubmit(item.id)}
        >
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </>
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
    // flex: 1,
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

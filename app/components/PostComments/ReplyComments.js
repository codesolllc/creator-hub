import React from "react";
import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";

const ReplyCommentsPost = ({ reply, userId, toggleDeleteModal }) => {
  const [editReplyTooltip, setEditReplyTooltip] = useState(false);

  return (
    <View key={reply._id} style={styles.replyContainer}>
      <View style={styles.replyHeader}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: reply.userID.profile_Image }}
            style={styles.replyUserProfileImage}
          />
          <Text style={styles.replyUserName}>{reply.userID.name}</Text>
        </View>
        {userId === reply.userID?._id ? (
          <>
            <Text
              onPress={() => setEditReplyTooltip(!editReplyTooltip)}
              style={{ fontWeight: "bold", fontSize: 16 }}
            >
              :
            </Text>
            {editReplyTooltip ? (
              <View style={styles.editForm}>
                <TouchableOpacity onPress={() => toggleDeleteModal(reply._id)}>
                  <Text style={{ textAlign: "center" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        ) : null}
      </View>
      <Text style={styles.replyText}>{reply?.comments}</Text>
    </View>
  );
};

export default ReplyCommentsPost;

const styles = StyleSheet.create({
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
  replyContainer: {
    padding: 10,
    marginLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
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
    marginLeft: 38,
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
});

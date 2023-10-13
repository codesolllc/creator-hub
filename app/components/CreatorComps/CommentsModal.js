import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

const CommentsModal = ({ navigation, isVisible, onClose, likesUser }) => {
  const handleNavigateToProfile = (item) => {

    if (item.userID.usertype === "creator") {
      navigation.navigate("CreatorProfile", { item: item.userID });
      onClose();
    } else {
      navigation.navigate("SingleUserProfile", { item: item.userID });
      onClose();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={onClose}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.commentHeading}>Likes</Text>

        <FlatList
          data={likesUser}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigateToProfile(item)}>
              <View style={styles.commentContainer}>
                {/* Profile Picture */}
                <Image
                  source={{ uri: item.userID.profile_Image }} // Replace with the actual image source
                  style={styles.profileImage}
                />
                {/* Comment Text */}
                <View style={styles.commentTextContainer}>
                  <Text style={styles.userName}>{item.userID.name}</Text>
                  <Text style={styles.commentText}>{item.userID.usertype}</Text>
                  {/* <Text style={styles.commentTime}>{item.userID}</Text> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: 700,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  commentHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    paddingBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
  },
  commentText: {
    marginBottom: 5,
  },
  commentTime: {
    color: "gray",
    fontSize: 12,
  },
});

export default CommentsModal;

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ChatItem = ({ chat, navigation }) => {
  const NavigateToSingleChat = (chat) => {
    navigation.navigate("SingleChat", {
      chatData: chat,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => NavigateToSingleChat(chat)}
    >
      <View style={styles.chatItemContainer}>
        <Image
          source={{ uri: chat?.requests?.profile_Image }}
          style={styles.profileImage}
        />
        <View style={styles.chatDetails}>
          <Text style={styles?.userName}>{chat?.requests?.name}</Text>
        </View>
        {chat.newMessageCount > 0 && (
          <View style={styles.newMessageContainer}>
            <Text style={styles.newMessageCount}>{chat?.newMessageCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomBorder} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  latestMessage: {
    fontSize: 16,
    color: "#888",
  },
  newMessageContainer: {
    backgroundColor: "#593BFB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  newMessageCount: {
    color: "white",
    fontWeight: "bold",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E1E1E1",
  },
});

export default ChatItem;

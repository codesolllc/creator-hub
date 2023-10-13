import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  useGetChatsQuery,
  useSendTextMutation,
} from "../../Redux/Reducers/Chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleChat = ({ route }) => {
  const { chatData } = route.params; // Get the chatData prop from the route params


  const [newMessage, setNewMessage] = useState("");

  const [userId, setUserId] = useState("");

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
    getUserData();
  }, []);

  const getChats = useGetChatsQuery(
    {
      sentTo: chatData?.requests?._id,
      sentBy: userId,
    },
    {
      pollingInterval: 500,
    }
  );

  useEffect(() => {
    getUserData();
  }, [userId, chatData._id, chatData?.requests?._id, getChats.data]);

  const [sendText] = useSendTextMutation();

  const onSendHandler = async () => {
    if (newMessage) {
      try {
        const res = await sendText({
          reqID: chatData._id,
          message: newMessage,
        });
        if (!res.error) {
          // alert("Message Sen");
          setNewMessage("");
        } else {
          alert("Something Went Wrong");
        }
      } catch (error) {
        console.log(error);
      }
      
    }else{
      alert("Invalid message field!")
    }
  
  };

  const renderMessage = ({ item }) => {
    const messageStyle =
      item.SentBy._id === userId ? styles.userMessage : styles.otherMessage;
    return (
      <View key={item._id} style={[styles.messageContainer, messageStyle]}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getChats.data}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSendHandler}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#593BFB",
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "green",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SingleChat;

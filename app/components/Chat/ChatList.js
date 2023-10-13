import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet,
  RefreshControl,

} from "react-native";
import ChatItem from "./ChatItem";
import { useGetConnectionsQuery } from "../../Redux/Reducers/Request";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatList = ({ navigation }) => {

  const [userId, setUserId] = useState("");
  
  const [refreshing, setRefreshing] = useState(false);
 

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

  const getConnections = useGetConnectionsQuery(userId, {
    skip: !userId,
  });


  const onRefresh = () => {
    setRefreshing(true);
    getConnections.refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };


  return (
    <>
      <View style={styles.Header_coloumn}>
        <Text style={styles.measages_text}>Messages</Text>
        <Text style={styles.All_chats}>All chats</Text>
      </View>
      {getConnections?.isError ? (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Unable to load chat's
        </Text>
      ) : getConnections.isLoading ? (
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Loading...
        </Text>
      ) : (
        <FlatList
          data={getConnections?.data?.connections}
          keyExtractor={(item) => item?._id?.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <ChatItem navigation={navigation} chat={item} />
          )}
          contentContainerStyle={styles.chatListContainer}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  All_chats: {
    fontSize: 15,
    color: "gray",
  },
  measages_text: {
    fontSize: 17,
    fontWeight: "600",
  },
  Header_coloumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  chatListContainer: {
    paddingBottom: 16,
  },
});

export default ChatList;

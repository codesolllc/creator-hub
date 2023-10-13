import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { useGetGigsNotifsQuery } from "../../Redux/Reducers/Notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


function GigNotif({ navigation }) {
  const [userData, setUserData] = useState("");
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("email");
      const userdata = await AsyncStorage.getItem("userdata");
      if (value !== null && userdata !== null) {
        setUserData(JSON.parse(userdata));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const notifications = useGetGigsNotifsQuery(userData?.findUser?._id, {
    skip: !userData?.findUser?._id,
  });

  const NavigateFromNotification = (item) => {
    navigation.navigate("SingleGigShow", {
      item: item?.gigID,
    });
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.Margin_on_scroll}
      >
        {notifications?.isError ? (
          <Text
            style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          >
            Unablt to load notifications
          </Text>
        ) : notifications.isLoading ? (
          <Text
            style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          >
            Loading...
          </Text>
        ) : notifications?.data?.length === 0 ? (
          <Text
            style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          >
            No notification
          </Text>
        ) : (
          notifications?.data?.map((notification) => (
            <TouchableOpacity
              key={notification?._id}
              style={styles.tabItem}
              onPress={() => NavigateFromNotification(notification)}
            >
              <View style={styles.iconContainer}>
                <Image
                  style={styles.Notification_ProfilePic}
                  source={{ uri: notification?.userID?.profile_Image }}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>{notification?.title}</Text>
                <Text style={styles.tabTextContent}>
                  {notification?.message}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#333"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  Notification_ProfilePic: {
    height: 50,
    width: 50,
    marginRight: 20,
    borderRadius: 50,
  },

  HeadText: {
    position: "absolute",
    top: 70,
    fontSize: 20,
    fontWeight: "500",
  },
  text_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  Margin_on_scroll: {
    marginTop: 20,
    marginBottom: 20,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#f2f2f2",
    marginBottom: 8,
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,

    elevation: 5,
  },

  tabTextContainer: {
    flex: 1,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default GigNotif;

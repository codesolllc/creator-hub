import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BackgroundImage from "../../components/extras/BackgroundImage";
import GigNotif from "./GigNotif";
import PostNotif from "./PostNotif";
import ProductNotif from "./ProductNotif";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notification = ({ navigation }) => {
  const [tabname, setTabName] = useState("posts");
  const [user, setUser] = useState("");

  const handleTabsNavigation = () => {
    switch (tabname) {
      case "products":
        return <ProductNotif navigation={navigation} />;

      case "gigs":
        return <GigNotif navigation={navigation} />;

      default:
        return <PostNotif navigation={navigation} />;
    }
  };
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUser(findUser?.findUser?.usertype);
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
  return (
    <>
      <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
        <View style={{ flex: 1, marginTop: 50 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Notifications
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity onPress={() => setTabName("posts")}>
              <Text
                style={
                  tabname === "posts" ? styles.tab_item_active : styles.tab_item
                }
              >
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTabName("products")}>
              <Text
                style={
                  tabname === "products"
                    ? styles.tab_item_active
                    : styles.tab_item
                }
              >
                Products
              </Text>
            </TouchableOpacity>
            {user === "creator" ? (
              <TouchableOpacity onPress={() => setTabName("gigs")}>
                <Text
                  style={
                    tabname === "gigs"
                      ? styles.tab_item_active
                      : styles.tab_item
                  }
                >
                  Gigs
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View>{handleTabsNavigation()}</View>
        </View>
      </BackgroundImage>
    </>
  );
};

const styles = StyleSheet.create({
  Notification_ProfilePic: {
    height: 50,
    width: 50,
    marginRight: 20,
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
    marginTop: 100,
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
  tab_item: {
    fontSize: 15,
    fontWeight: "bold",
  },
  tab_item_active: {
    color: "#593BFB",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Notification;

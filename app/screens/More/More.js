import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BackgroundImage from "../../components/extras/BackgroundImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const More = ({ navigation }) => {
  const [usertype, setUsertype] = React.useState(null);

  const NavigateToMarketPlace = () => {
    navigation.navigate("Buy");
  };

  const NavigateToChats = () => {
    navigation.navigate("Chats");
  };
  
  const NavigateToChatsRequsts = () => {
    navigation.navigate("ChatsRequests");
  };

  const NavigateToNotifications = () => {
    navigation.navigate("Notification");
  };

  const NavigateToMyNetwork = () => {
    navigation.navigate("MyNetwork");
  };

  const NavigateToMyProfile = () => {
    navigation.navigate("MyProfile");
  };

  const NavigateToGigs = () => {
    navigation.navigate("GigsListings");
  };
  const NavigateToProposals = () => {
    navigation.navigate("Proposals");
  };

  const NavigateToUserProfile = () => {
    navigation.navigate("UserProfile");
  };

  const NavigateToBookMarked = () => {
    navigation.navigate("BookMarked");
  };

  const NavigateToVarification = () => {
    navigation.navigate("VarificationApply");
  };
  const NavigateToQuotationPage = () => {
    navigation.navigate("QuotationListPage");
  };

  const NavigateToAcceptedProposals = () => {
    navigation.navigate("AcceptedQuotation");
  };
  const NavigateToAcceptedQuotationCreator = () => {
    navigation.navigate("AcceptedQuotationCreator");
  };
  const NavigateToMyQuotations = () => {
    navigation.navigate("MyQuotations");
  };

  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUser(findUser.findUser);
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

  React.useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("usertype");
        if (value !== "") {
          setUsertype(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
      }
    })();
    getUserData();
  }, []);

  return (
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Text style={styles.HeadText}>All shorcuts</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.Margin_on_scroll}
        >
          {usertype === "creator" ? (
            <TouchableOpacity
              onPress={NavigateToMyProfile}
              style={styles.tabItemPrimary}
            >
              <View style={styles.iconContainer}>
                <Image
                  style={styles.ProfilePic}
                  source={{ uri: user?.profile_Image }}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabTextPrimary}>My Profile</Text>
                <Text style={styles.tabTextSecondary}>{user?.name}</Text>
                <Text style={styles.tabText}>{user?.usertype}</Text>
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
          ) : null}

          {usertype === "user" ? (
            <TouchableOpacity
              onPress={NavigateToUserProfile}
              style={styles.tabItemPrimary}
            >
              <View style={styles.iconContainer}>
                <Image
                  style={styles.ProfilePic}
                  source={{ uri: user?.profile_Image }}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabTextPrimary}>My Profile</Text>
                <Text style={styles.tabTextSecondary}>{user?.name}</Text>
                <Text style={styles.tabText}>{user?.usertype}</Text>
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
          ) : null}

          {usertype === "user" ? (
            <TouchableOpacity
              onPress={NavigateToBookMarked}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="list-alt"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>Bookmarked Posts!</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#333"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={NavigateToMarketPlace}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer_First}>
              <FontAwesome5
                name="leaf"
                type="font-awesome"
                color="#333"
                size={30}
              />
            </View>
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>Buy from Marketplace</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                name="chevron-right"
                type="font-awesome"
                color="#333"
                size={25}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={NavigateToChats} style={styles.tabItem}>
            <View style={styles.iconContainer_First}>
              <FontAwesome5
                name="comment"
                type="font-awesome"
                color="#333"
                size={30}
              />
            </View>
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>Chats</Text>
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

          <TouchableOpacity
            onPress={NavigateToChatsRequsts}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer_First}>
              <FontAwesome5
                name="rocket"
                type="font-awesome"
                color="#333"
                size={30}
              />
            </View>
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>Chats Requests</Text>
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

          <TouchableOpacity
            onPress={NavigateToNotifications}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer_First}>
              <FontAwesome5
                name="globe"
                type="font-awesome"
                color="#333"
                size={30}
              />
            </View>
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>Notification's</Text>
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

          <TouchableOpacity
            onPress={NavigateToMyNetwork}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer_First}>
              <FontAwesome5
                name="cogs"
                type="font-awesome"
                color="#333"
                size={30}
              />
            </View>
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>My Network</Text>
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

          {usertype === "creator" ? (
            <TouchableOpacity onPress={NavigateToGigs} style={styles.tabItem}>
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="tasks"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>Gigs</Text>
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
          ) : null}
          {usertype === "creator" ? (
            <TouchableOpacity
              onPress={NavigateToProposals}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="file-contract"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>Work Proposals</Text>
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
          ) : null}
          {usertype === "creator" ? (
            <TouchableOpacity
              onPress={NavigateToMyQuotations}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="file-contract"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>My Quotation</Text>
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
          ) : null}
          {usertype === "user" ? (
            <TouchableOpacity
              onPress={NavigateToQuotationPage}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="file-contract"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>My Proposals</Text>
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
          ) : null}
          {usertype === "user" ? (
            <TouchableOpacity
              onPress={NavigateToAcceptedProposals}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="file-invoice-dollar"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>Accepted Quotations</Text>
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
          ) : null}
          {usertype === "creator" ? (
            <TouchableOpacity
              onPress={NavigateToAcceptedQuotationCreator}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="file-invoice-dollar"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>Accepted Quotations</Text>
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
          ) : null}
          {usertype === "creator" ? (
            <TouchableOpacity
              onPress={NavigateToVarification}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer_First}>
                <FontAwesome5
                  name="leaf"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
              </View>
              <View style={styles.tabTextContainer}>
                <Text style={styles.tabText}>Apply For Verification</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name="chevron-right"
                  type="font-awesome"
                  color="#333"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  ProfilePic: {
    height: 100,
    width: 100,
    marginRight: 10,
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
    marginTop: 100,
    marginBottom: 90,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#f2f2f2",
    marginBottom: 8,
    paddingHorizontal: 10,
    padding: 10,
    margin: 10,
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

  tabItemPrimary: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#a9a6ad",
    marginBottom: 8,
    paddingHorizontal: 10,
    padding: 10,
    margin: 10,
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
  tabTextSecondary: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5853FF",
  },
  tabTextPrimary: {
    fontSize: 27,
    fontWeight: "bold",
    color: "black",
  },
  iconContainer: {
    marginLeft: 10,
  },
  iconContainer_First: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default More;

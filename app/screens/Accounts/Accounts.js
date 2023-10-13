import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AccountDetailModal from "../../components/AccountDetailModal/AccountDetailModal";

const Accounts = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const clearAsyncStorage = () => {
    AsyncStorage.clear()
      .then((res) => {
        console.log(res, "clear successfully");
        navigation.navigate("Login");
      })
      .catch((err) => console.log(err, "unable to clear or logout"));
  };

  const EditProfile = () => {
    navigation.navigate("Edit_accounts", {
      item: user,
      // we ll edit this more accordingly
    });
  };

  const NavigateToCategorySelection = () => [
    navigation.navigate("categoryselection"),
  ];

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

  useEffect(() => {
    getUserData();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={2}
          source={{ uri: user?.banner_Img }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{ uri: user?.profile_Image }}
            />

            <Text style={styles.userNameText}>{user?.name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {user?.city} {user?.state}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                clearAsyncStorage();
              }}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={NavigateToCategorySelection}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Category Select
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                EditProfile();
              }}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.container2}
        contentContainerStyle={{ backgroundColor: "#f3f6f8" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{user?.state}</Text>
            <Text style={styles.userInfoSubTitle}>state</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{user?.city}</Text>
            <Text style={styles.userInfoSubTitle}>city</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{user?.zipcode}</Text>
            <Text style={styles.userInfoSubTitle}>zipcode</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={{
              padding: 10,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <Text
              style={{
                color: "#fff",

                textAlign: "center",
                padding: 10,
                backgroundColor: "#613499",
                borderRadius: 10,
                fontWeight: "bold",
              }}
            >
              Add Payment Method
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="mail"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>Email</Text>
          <Text style={styles.userInfoSubTitlez}>{user?.email}</Text>
        </View>

        <View style={styles.userInfoItemCard}>
          <FontAwesome5
            name="user"
            type="font-awesome"
            color="#333"
            size={30}
            style={styles.placeIconzuser}
          />
          <Text style={styles.userInfoTitle}>User Type</Text>
          <Text style={styles.userInfoSubTitlez}>{user?.usertype}</Text>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="info"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>About</Text>
          <Text style={styles.userInfoSubTitlez}>
            {user?.about === undefined
              ? "Edit your profile, add about"
              : user?.about}
          </Text>
        </View>
        <View style={styles.userInfoItemCard}>
          <Icon
            name="info"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>Detail</Text>
          <Text style={styles.userInfoSubTitlez}>
            {user?.desc === undefined
              ? "Edit your profile, add details"
              : user?.desc}
          </Text>
        </View>
      </ScrollView>

      <AccountDetailModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        userData={user}
        navigation={navigation}
      />
    </>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    width: "95%",
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  userBtn: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,

    elevation: 5,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoItemCard: {
    justifyContent: "center",
    backgroundColor: "white",
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
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  userInfoSubTitlez: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  containerz: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innercontainer: {
    alignItems: "center",
    flexDirection: "coloumn",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "300",
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container2: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
  },
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "red",
    fontSize: 26,
  },
  placeIconzuser: {
    color: "#613499",
    fontSize: 40,
    textAlign: "center",
  },
  placeIconz: {
    color: "#613499",
    fontSize: 46,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userCityText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  userImage: {
    padding: 16,
    ...Platform.select({
      ios: {
        borderColor: "#FFF",
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
      },
      android: {
        borderColor: "#FFF",
        borderRadius: 85,
        borderWidth: 3,
        height: 100,
        marginBottom: 15,
        width: 100,
      },
      default: { color: "black" },
    }),
  },

  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
});

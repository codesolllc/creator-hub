import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetUserQuery } from "../../../Redux/Reducers/UserReducer";
const windowHeight = Dimensions.get("window").height;
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchModal = ({ navigation, isVisible, onClose }) => {
  //  get all users...
  const allUsers = useGetUserQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  // States for filter modal fields..
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [zipcodeFilter, setZipcodeFilter] = useState("");

  const showAllUser = () => {
    setFilteredData("");
  };

  const handleFilter = () => {
    const filtered = allUsers.data.filter(
      (item) =>
        item.state.toLowerCase().includes(stateFilter.toLowerCase()) &&
        item.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
        item.zipcode.toLowerCase().includes(zipcodeFilter.toLowerCase())
    );
    setFilteredData(filtered);
    setModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = allUsers.data.filter((item) =>
      item?.name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Secondary Modal Functions
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigateToProfile = (item) => {
    if (item.usertype === "creator") {
      navigation.navigate("CreatorProfile", { item });
      onClose();
    } else {
      navigation.navigate("SingleUserProfile", { item });
      onClose();
    }
  };

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

  return (
    <>
      <Modal
        isVisible={isVisible}
        onRequestClose={onClose}
        onBackdropPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modalContainer}
        keyboardAvoidingViewEnabled={true}
      >
        <View style={styles.modalContent} behavior="padding">
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.commentHeading}>Search Users</Text>

          <View style={styles.inputContainern}>
            <TextInput
              style={styles.inputn}
              placeholder="Search here..."
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={showAllUser}>
              <MaterialIcons name="refresh" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Secondary Filter Modal Ends   */}
          {allUsers.isError ? (
            <Text>Failed To Load Users</Text>
          ) : (
            <FlatList
              data={
                filteredData === ""
                  ? allUsers?.data?.filter((item) => item._id !== userId)
                  : filteredData?.filter((item) => item._id !== userId)
              }
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleNavigateToProfile(item)}>
                  <View style={styles.commentContainer}>
                    {/* Profile Picture */}
                    <Image
                      source={{ uri: item?.profile_Image }}
                      style={styles.profileImage}
                    />
                    {/* Comment Text */}
                    <View style={styles.commentTextContainer}>
                      <Text style={styles.userName}>{item?.name}</Text>
                      <Text style={styles.commentTime}>{item?.usertype}</Text>
                      <Text style={styles.commentTime}>
                        {item?.state?.substring(0, 20)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          
        </View>
      </Modal>
      {/* Secondary Filter Modal Starts  */}
      <View style={styles.container2}>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer2}>
            <View style={styles.modalContent2}>
              <Text style={styles.modalText2}>Filter Your Search</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your State"
                  placeholderTextColor="white"
                  value={stateFilter}
                  onChangeText={setStateFilter}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your City"
                  placeholderTextColor="white"
                  value={cityFilter}
                  onChangeText={setCityFilter}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Zipcode"
                  placeholderTextColor="white"
                  value={zipcodeFilter}
                  onChangeText={setZipcodeFilter}
                />
              </View>

              <View style={styles.operation_btns}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#f03e59" }]}
                  onPress={handleFilter}
                >
                  <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#593BFB" }]}
                  onPress={toggleModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
    marginTop: 100,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: windowHeight - 200,
    flex: 1,
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
  inputContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  inputContainern: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
  },
  input: {
    height: 40,
    fontSize: 17,
    color: "white",
  },
  inputn: {
    color: "black",
    width: "90%",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText2: {
    color: "red",
    fontSize: 18,
  },
  modalContainer2: {
    borderRadius: 10,
    height: 350,
  },
  modalContent2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#846eff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "70%",
  },
  modalText2: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    fontWeight: "500",
  },
  closeButton2: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  closeButtonText2: {
    color: "white",
    fontSize: 18,
  },
  operation_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 7,
    borderRadius: 19,
    alignItems: "center",
    margin: 10,
    borderColor: "yellow",
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SearchModal;

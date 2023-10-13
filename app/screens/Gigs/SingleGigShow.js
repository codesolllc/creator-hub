import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import InteractiveButton from "../../components/extras/InteractiveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateGigModal from "../../components/UpdateGigModal/UpdateGigModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {
  useApplyForGigMutation,
  useDeleteGigMutation,
  useGetSingleGigQuery,
} from "../../Redux/Reducers/GigsReducer";

const SingleGigShow = ({ route, navigation }) => {
  const item = route.params.item;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const singleGig = useGetSingleGigQuery(item?._id);

  const [deleteGig] = useDeleteGigMutation();

  const [applyForGig] = useApplyForGigMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };
  

  const DeleteGig = async () => {
    try {
      const res = await deleteGig({
        authorID: userId,
        gigsId: item?._id,
      });
      if (!res.error) {
        navigation.goBack();
      } else {
        alert("Unable to Delete! Try Again");
      }
    } catch (error) {
      alert("Failed to Delete! Try Later");
    }
  };

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

  const applyGigHandler = async () => {
    try {
      const res = await applyForGig({
        creatorID: userId,
        gigID: item._id,
      });
      if (!res.error) {
        alert("Success");
      } else {
        alert(res.error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NavigateToSingleGigShow = (item) => {
    navigation.navigate("gigApplicants", {
      item: item,
    });
  };

  useEffect(() => {
    (async function () {
      try {
        const user = await AsyncStorage.getItem("usertype");
        setUserType(JSON.parse(user));
      } catch (error) {
        console.log(error, "unable to get user type!");
      }
    })();
    getUserData();
  }, []);


  return (
    <View style={styles.container}>
      {singleGig?.data?.image ? (
        <Image
          style={styles.gigImage}
          source={{ uri: singleGig?.data?.image }}
        />
      ) : (
        <Image
          style={styles.gigImage}
          source={require("../../assets/SinglePost/contentpostrandom.gif")}
        />
      )}
      <ScrollView style={styles.detailsContainer}>
        <View>
          <Text style={styles.gigTitle}>{singleGig?.data?.title}</Text>
          <Text style={styles.gigDescription}>
            {singleGig?.data?.description}
          </Text>
          <Text style={styles.userPrice}>Price: {singleGig?.data?.price}</Text>
        </View>
      </ScrollView>
      {userType === "user" ? (
        <>
          <View>
            <TouchableOpacity
              style={[
                styles.viewApplicantbutton,
                { backgroundColor: "#593BFB" },
              ]}
              // onPress={() => navigation.navigate("gigApplicants")}
              onPress={() => NavigateToSingleGigShow(item._id)}
            >
              <Text style={styles.buttonText}>View Applicants</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.operation_btns}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#593BFB" }]}
              onPress={toggleModal}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#f03e59" }]}
              onPress={toggleDeleteModal}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      {userType === "creator" ? (
        <View style={styles.button_position}>
          <InteractiveButton
            onPress={applyGigHandler}
            title="Apply For This Gig"
            backcolor="#593BFB"
          />
        </View>
      ) : null}

      <UpdateGigModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        data={singleGig?.data}
        userId={userId}
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={toggleDeleteModal}
        delFun={DeleteGig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  gigImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 20,
  },
  detailsContainer: {
    flex: 0.8,
    paddingHorizontal: 10,
  },
  gigTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  gigDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userContent: {
    fontSize: 16,
  },
  userPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  button_position: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  operation_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 11,
    borderRadius: 19,
    alignItems: "center",
    margin: 10,
    borderColor: "yellow",
    width: "45%",
  },
  viewApplicantbutton: {
    padding: 11,
    borderRadius: 19,
    alignItems: "center",
    // margin: 10,
    borderColor: "yellow",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SingleGigShow;

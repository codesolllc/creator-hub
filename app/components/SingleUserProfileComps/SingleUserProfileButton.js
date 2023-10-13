import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import {
  useAcceptReqMutation,
  useCancelReqMutation,
  useRejectReqMutation,
  useRemoveFriendMutation,
  useSendReqMutation,
  useValidateReqQuery,
} from "../../Redux/Reducers/Request";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const SingleUserProfileButton = ({ navigation, route }) => {
  const [sendReq] = useSendReqMutation();
  const [cancelReq] = useCancelReqMutation();
  const [rejectReq] = useRejectReqMutation();
  const [acceptReq] = useAcceptReqMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const { item } = route.params;
  const sentTo = item._id;

  const [userID, setUserID] = useState("");

  const validateReq = useValidateReqQuery(
    { userID: userID, sentTo: item._id },
    {
      skip: !userID || !sentTo,
      pollingInterval: 1000,
    }
  );

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userdata");
    try {
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUserID(findUser.findUser._id);
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
  }, [validateReq?.data?.validator]);

  const onSendReq = async () => {
    try {
      const res = await sendReq({
        user_ID: item._id,
        sentTo: userID,
      });

      if (!res.error) {
        alert("Request Sent Successfully");
      }
    } catch (error) {
      console.log(error, "adadwa");
    }
  };

  const onCancelReq = async () => {
    try {
      const res = await cancelReq({
        userID: item._id,
        sentTo: userID,
      });

      if (!res.error) {
        alert("Request Cancelled Successfully");
      }
    } catch (error) {
      console.log(error, "adadwa");
    }
  };

  const onUnfriend = async () => {
    try {
      const res = await removeFriend({
        userID: userID,
        reqID: item._id,
      });
      if (!res.error) {
        alert("Unfriend Successfully");
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reqRejectHandler = async (reqID) => {
    try {
      const res = await rejectReq({
        requestID: reqID,
      });

      if (!res.error) {
        alert("Rejected");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptReqHandler = async (requestID) => {
    try {
      const res = await acceptReq({
        user_ID: userID,
        sentTo: sentTo,
      });
      if (!res.error) {
        alert("Accepted Successfully");
      } else {
        alert(res.error.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {validateReq?.data?.validator === false ? (
          <TouchableOpacity
            style={item._id !== userID ? styles.buttonContainer : styles.dNone}
            onPress={onSendReq}
          >
            <Icon
              name="star"
              underlayColor="transparent"
              iconStyle={styles.placeIconz}
            />
            <Text style={styles.buttonText}>Send Request</Text>
          </TouchableOpacity>
        ) : validateReq?.data?.validator === true &&
          validateReq?.data?.validate_request?.user_ID !== userID &&
          validateReq?.data?.validate_request?.status[0] === "pending" ? (
          <TouchableOpacity
            style={item._id !== userID ? styles.buttonContainer : styles.dNone}
            onPress={onCancelReq}
          >
            <Icon
              name="star"
              underlayColor="transparent"
              iconStyle={styles.placeIconz}
            />
            <Text style={styles.buttonText}>Cancel Request</Text>
          </TouchableOpacity>
        ) : // new
        validateReq?.data?.validate_request?.user_ID === userID &&
          validateReq?.data?.validate_request?.status[0] === "pending" ? (
          <>
            <TouchableOpacity
              style={
                item._id !== userID ? styles.buttonContainer : styles.dNone
              }
              onPress={() =>
                acceptReqHandler(validateReq?.data?.validate_request?._id)
              }
            >
              <Icon
                name="star"
                underlayColor="transparent"
                iconStyle={styles.placeIconz}
              />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                item._id !== userID ? styles.buttonContainer : styles.dNone
              }
              onPress={() =>
                reqRejectHandler(validateReq?.data?.validate_request?._id)
              }
            >
              <Icon
                name="star"
                underlayColor="transparent"
                iconStyle={styles.placeIconz}
              />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : // old
        validateReq?.data?.validator === true &&
          validateReq?.data?.validate_request?.status[0] === "accepted" ? (
          <>
            <TouchableOpacity
              style={
                item._id !== userID ? styles.buttonContainer : styles.dNone
              }
              onPress={onUnfriend}
            >
              <Icon
                name="star"
                underlayColor="transparent"
                iconStyle={styles.placeIconz}
              />
              <Text style={styles.buttonText}>Unfriend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                item._id !== userID ? styles.buttonContainer : styles.dNone
              }
              onPress={() => navigation.navigate("Chats")}
            >
              <Icon
                name="star"
                underlayColor="transparent"
                iconStyle={styles.placeIconz}
              />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#593BFB" />
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainerz}
          onPress={() =>
            navigation.navigate("hireCreator", { CreatorID: item._id })
          }
        >
          <Text style={styles.buttonTextz}>Hire Now!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
    color: "gray",
  },
  buttonContainerz: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#593BFB",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextz: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
  },
  placeIconz: {
    color: "#593BFB",
    fontSize: 26,
    marginRight: 7,
  },
  dNone: {
    display: "none",
  },
});
export default SingleUserProfileButton;

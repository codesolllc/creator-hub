import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundImage from "../../components/extras/BackgroundImage";
import {
  useAcceptReqMutation,
  useGetRequestsQuery,
  useRejectReqMutation,
} from "../../Redux/Reducers/Request";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatsRequests = () => {
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

  const getRequests = useGetRequestsQuery(userId, {
    skip: !userId,
  });

  const [rejectReq] = useRejectReqMutation();
  const [acceptReq] = useAcceptReqMutation();

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
        user_ID: userId,
        sentTo: requestID,
      });
      if (!res.error) {
        alert("Accepted Successfully");
      } else {
        alert(JSON.stringify(res.error.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getRequests.refetch();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      <View style={styles.Primary_container}>
        <Text style={styles.Main_heading_text}>Requests</Text>
      </View>
      <ScrollView
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
      {getRequests?.data?.requests?.length !== 0 ? (
    
          <View style={styles.Secondary_container}>
            {getRequests?.data?.requests.map((request) => (
              <View style={styles.card} key={request._id}>
                <View style={styles.body_card}>
                  <Image
                    style={styles.image_Sizing}
                    source={{ uri: request.requests.profile_Image }}
                  />
                  <Text style={styles.User_name}>{request.requests.name} </Text>
                  <Text style={styles.user_type}>
                    {request.requests.usertype}
                  </Text>
                </View>
                <View style={styles.fotter}>
                  <TouchableOpacity
                    onPress={() => acceptReqHandler(request.requests._id)}
                    style={styles.button_Accept}
                  >
                    <Text style={styles.Button_text}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => reqRejectHandler(request._id)}
                    style={styles.button_Reject}
                  >
                    <Text style={styles.Button_text}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
       
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataTxt}>No Requests Yet!</Text>
        </View>
      )}
      </ScrollView>
    </BackgroundImage>
  );
};

export default ChatsRequests;

const styles = StyleSheet.create({
  Primary_container: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Main_heading_text: {
    fontWeight: "600",
    color: "#593BFB",
    fontSize: 20,
  },
  Secondary_container: {
    flex: 0.9,
    justifyContent: "center",
  },
  body_card: {
    alignItems: "center",
  },
  card: {
    borderColor: "gray",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fotter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  User_name: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 10,
  },
  user_type: {
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 10,
    color: "gray",
  },
  image_Sizing: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  button_Accept: {
    borderRadius: 20,
    backgroundColor: "#593BFB",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  button_Reject: {
    borderRadius: 20,
    backgroundColor: "#f03e59",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  Button_text: {
    color: "#fff",
    fontWeight: "500",
  },
  noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataTxt: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
});

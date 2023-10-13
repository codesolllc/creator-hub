import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDeclineQuotationMutation } from "../../Redux/Reducers/HireReducer";

const SingleQuotation = ({ route, navigation }) => {
  const item = route.params.item;
  const [userId, setUserId] = useState("");
  const [declineQuotation] = useDeclineQuotationMutation();

  const handleDeclineQuotation = async () => {
    try {
      const res = await declineQuotation({
        qutationID: item?._id,
        userID: userId,
      });
      if (!res.error) {
        alert("Decline Quotation Successfully!");
        navigation.goBack();
      } else {
        alert("Unable to decline Quotation, try again or later");
      }
    } catch (error) {
      alert("Something went wrong, try again or later");
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {item?.document_or_picture ? (
        <Image
          style={styles.gigImage}
          source={{ uri: item?.document_or_picture }}
        />
      ) : (
        <Image
          style={styles.gigImage}
          source={require("../../assets/SinglePost/contentpostrandom.gif")}
        />
      )}
      <ScrollView style={styles.detailsContainer}>
        <View>
          <Text style={styles.gigTitle}>Quotation Details</Text>
          <Text style={styles.gigDescription}>{item?.message}</Text>
          <Text style={styles.userPrice}>Price: {item?.amount}</Text>
        </View>
      </ScrollView>

      <View style={styles.operation_btns}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#593BFB" }]}
          onPress={() => navigation.navigate("QuotationCheckout", { item })}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f03e59" }]}
          onPress={handleDeclineQuotation}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
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

export default SingleQuotation;

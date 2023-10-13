import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import InteractiveButton from "../../components/extras/InteractiveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleProposal = ({ route, navigation }) => {
  const item = route.params.item;
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

  const downloadDocs = async (doc) => {
    const url = doc;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.detailsContainer}>
        <View>
          <Text style={styles.gigTitle}>Proposal Details</Text>
          <Text style={styles.gigDescription}>{item?.work_detail}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.userPrice}>Price: {item?.desired_amount}</Text>
            {item?.document_or_picture !== undefined ? (
              <TouchableOpacity
                onPress={() => downloadDocs(item?.document_or_picture)}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: "#593BFB",
                    borderRadius: 10,
                    color: "#fff",
                  }}
                >
                  <Text style={{ color: "#fff" }}>Download Document</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>

      <View style={styles.button_position}>
        <InteractiveButton
          onPress={() =>
            navigation.navigate("Quotation", { userId: userId, item: item })
          }
          title="Send Quotation"
          backcolor="#593BFB"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 60,
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

export default SingleProposal;

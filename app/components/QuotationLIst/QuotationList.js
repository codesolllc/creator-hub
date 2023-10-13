import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useGetProposalsByUserIDQuery } from "../../Redux/Reducers/HireReducer";

const { width, height } = Dimensions.get("window");

const QuotationList = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const getUserProposals = useGetProposalsByUserIDQuery(userId);
  const NavigateToSingleGigShow = (item) => {
    navigation.navigate("ProposalsQuotations", {
      item: item,
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      getUserProposals.refetch();
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    (async function () {
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
    })();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.Main_container}>
        {getUserProposals.isLoading ? (
          <Text>Loading...</Text>
        ) : getUserProposals.isError ? (
          <Text>Unable to Proposals</Text>
        ) : getUserProposals?.data?.allproposals?.length === 0 ? (
          <Text style={{ textAlign: "center", flex: 1 }}>
            No Proposals Yet!
          </Text>
        ) : (
          getUserProposals?.data?.allproposals?.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => NavigateToSingleGigShow(item)}
            >
              <View style={styles.gigItemCard}>
                <View>
                  <Image
                    style={styles.gig_images}
                    source={{ uri: item?.CreatorID?.profile_Image }}
                  />
                </View>

                <View style={styles.mainDetails_user}>
                  <Text style={styles.id_styles}>
                    <Text
                      style={{
                        fontSize: width * 0.03,
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      Proposal ID#{" "}
                    </Text>
                    {item._id?.slice(-10)}
                  </Text>

                  <Text style={styles.user_name}>{item?.CreatorID?.name}</Text>
                  <Text style={styles.userInfoTitle}>
                    {item?.work_detail?.length > 20
                      ? item?.work_detail?.substring(0, 25) + "..."
                      : item?.work_detail}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    ${item?.desired_amount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Main_container: {
    alignItems: "center",
    marginTop: height * 0.02, // Adjust the marginTop based on screen height
    marginBottom: height * 0.08, // Adjust the marginTop based on screen height
  },
  gigItemCard: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: width * 0.04, // Adjust the padding based on screen width
    marginBottom: height * 0.02, // Adjust the marginBottom based on screen height
    borderRadius: width * 0.06, // Adjust the borderRadius based on screen width
    shadowColor: "grey",
    width: width * 0.9, // Adjust the width based on screen width
    height: height * 0.15, // Adjust the height based on screen height
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,
    elevation: 5,
  },
  gig_images: {
    height: width * 0.12, // Adjust the height based on screen width
    width: width * 0.12, // Adjust the width based on screen width
    borderRadius: width * 0.03, // Adjust the borderRadius based on screen width
  },
  user_name: {
    fontSize: width * 0.04, // Adjust the fontSize based on screen width
    fontWeight: "500",
    color: "black",
  },
  mainDetails_user: {
    marginRight: width * 0.1, // Adjust the marginRight based on screen width
  },
  id_styles: {
    fontSize: width * 0.03,
    fontWeight: "500",
    color: "#593BFB",
  },
});

export default QuotationList;

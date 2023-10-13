import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl
} from "react-native";
import React from "react";
import { useGetAppliedApplicantsQuery } from "../../Redux/Reducers/GigsReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

const GigApplicants = ({ route, navigation }) => {
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const item = route.params.item;

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

  const getAppliedApplicants = useGetAppliedApplicantsQuery(
    { userID: userId, gigID: item },
    {
      skip: !userId || !item,
    }
  );

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      getAppliedApplicants.refetch();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.contanier_list}>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 30,
          textAlign: "center",
          padding: 10,
          color: "#593BFB",
        }}
      >
        Applicant's
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {getAppliedApplicants.isError ? (
          <Text style={styles.user_name}>Unable to load! try again..</Text>
        ) : getAppliedApplicants.isLoading ? (
          <Text style={styles.user_name}>Loading...</Text>
        ) : (
          getAppliedApplicants?.data?.find_gig_applicants?.map((item) => (
            <View style={styles.gigItemCard} key={item._id}>
              <View style={styles.Applicant}>
                <View style={styles.image_user}>
                  <Image
                    style={styles.gig_images}
                    source={{
                      uri: item.applicant_id.profile_Image,
                    }}
                  />
                </View>

                <View style={styles.mainDetails_user}>
                  <Text style={styles.user_name}>
                    {item?.applicant_id.name}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CreatorProfile", {
                      item: item?.applicant_id,
                    })
                  }
                >
                  <Text style={styles.viewprofile_btn}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contanier_list: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  gigItemCard: {
    marginVertical: 5,
    backgroundColor: "#593BFB",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,
    // elevation: 5,
  },
  Applicant: {
    backgroundColor: "#593BFB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  gig_images: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 50,
    // elevation: 10,
  },
  user_name: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  viewprofile_btn: {
    color: "#ff6257",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default GigApplicants;

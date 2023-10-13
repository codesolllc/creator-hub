import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import ReviewModal from "./ReviewModal";
import { useGetCreatorRatingsQuery } from "../../Redux/Reducers/RatingsReducer";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileHeader = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const creatorRating = useGetCreatorRatingsQuery(item?._id);
  const [userType, setUserType] = useState("");

  const ratingsArray =
    creatorRating?.data?.all_creator_Ratings?.map((item) => item.ratings) || [];
  const totalRating = ratingsArray.reduce((acc, ratings) => acc + ratings, 0);
  const averageRating = totalRating / (ratingsArray.length || 1);

  useEffect(() => {
    (async function () {
      try {
        const user = await AsyncStorage.getItem("usertype");
        setUserType(JSON.parse(user));
      } catch (error) {
        console.log(error, "unable to get user type!");
      }
    })();
  }, []);


  return (
    <View style={styles.container}>
      <Image
        style={styles.Profile_picture_main}
        source={{ uri: item?.profile_Image }}
      />
      <Text style={styles.Header_heading}>{item?.name}</Text>
      <Text style={styles.Sub_Heading}>{item?.about?.substring(0, 20)}...</Text>
      <Text style={styles.Part_Full_Time}>
        {averageRating >= 1 && averageRating <= 5
          ? "⭐".repeat(averageRating)
          : "No rating!"}
      </Text>

      <View style={styles.Time_rating_container}>
        <Text style={styles.Part_Full_Time}>Full Time</Text>
        <Text style={styles.Rating_number}>{averageRating}</Text>
        {userType === "user" ? (
          <TouchableOpacity
            style={styles.button_reviews}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.button_review_text}>Give Review</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ReviewModal
        creatorId={item?._id}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  Profile_picture_main: {
    height: 150,
    width: 150,
    borderRadius: 50,
  },
  Header_heading: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  Sub_Heading: {
    fontSize: 15,
    fontWeight: "500",
    color: "gray",
    marginTop: 3,
  },
  Time_rating_container: {
    flexDirection: "row",
    marginTop: 5,
  },
  Part_Full_Time: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
  },
  Rating_number: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
    color: "#593BFB",
  },
  button_reviews: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button_review_text: {
    color: "#593BFB",
    fontWeight: "600",
  },
});

export default ProfileHeader;

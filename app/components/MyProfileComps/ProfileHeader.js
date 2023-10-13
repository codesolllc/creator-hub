import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetCreatorRatingsQuery } from "../../Redux/Reducers/RatingsReducer";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const creatorRating = useGetCreatorRatingsQuery(user?._id, {skip:!user?._id});

  const ratingsArray =
    creatorRating?.data?.all_creator_Ratings?.map((item) => item.ratings) || [];
  const totalRating = ratingsArray.reduce((acc, ratings) => acc + ratings, 0);
  const averageRating = totalRating / (ratingsArray.length || 1);

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

  return (
    <View style={styles.container}>
      <Image
        style={styles.Profile_picture_main}
        source={{ uri: user?.profile_Image }}
      />
      <Text style={styles.Header_heading}>{user?.name}</Text>
      <Text style={styles.Sub_Heading}>{user?.about?.substring(0, 20)}...</Text>
      <Text style={styles.Part_Full_Time}>
        {averageRating >= 1 && averageRating <= 5
          ? "⭐".repeat(averageRating)
          : "No rating!"}
      </Text>
      <View style={styles.Time_rating_container}>
        <Text style={styles.Part_Full_Time}>Full Time</Text>
        <Text style={styles.Rating_number}>{averageRating}</Text>
      </View>
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

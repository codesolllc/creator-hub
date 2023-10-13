import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
// import StarRating from 'react-native-star-rating';
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { useGetCreatorReviewsQuery } from "../../Redux/Reducers/ReviewReducer";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetCreatorRatingsQuery } from "../../Redux/Reducers/RatingsReducer";

const Review = () => {
  const [userId, setUserId] = useState("");
  const creatorReviews = useGetCreatorReviewsQuery(userId, {skip:!userId});
  const creatorRating = useGetCreatorRatingsQuery(userId, {skip:!userId});

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

  const ratingsArray =
    creatorRating?.data?.all_creator_Ratings?.map((item) => item.ratings) || [];
  const totalRating = ratingsArray.reduce((acc, ratings) => acc + ratings, 0);
  const averageRating = totalRating / (ratingsArray.length || 1);

  return (
    <View style={styles.Main_container}>
      <View style={styles.Main_Inner}>
        <Text style={styles.Heading_Reviews}>Review:</Text>

        <View style={styles.Secondary_review_section}>
          <View>
            <Text style={{ ...styles.reviews_numbers, fontWeight: "bold" }}>
              {averageRating} Avg. rating
            </Text>
            {/* <StarRating
        maxStars={5}
        rating={3.5}
        starSize={14}
        fullStarColor="#EDA135"
      /> */}
            <Text style={styles.reviews_numbers}>
              {creatorReviews.data?.all_creator_reviews?.length} Reviews
            </Text>
          </View>

          <View>
            {creatorRating?.data?.all_creator_Ratings?.map((item) => (
              <View key={item._id} style={styles.Progress_bars_ratings}>
                {/* <StarRating
            maxStars={1}
            rating={1}
            starSize={14}
            fullStarColor="#EDA135"
          /> */}
                <Text style={styles.Rating_text_secondary}>
                  {item?.ratings}
                </Text>
                <View>
                  <Progress.Bar progress={item?.ratings / 5} color="#EDA135" />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{marginTop: 20}}>
          {creatorReviews.isError ? (
            <Text style={styles.tabTextContent}>Unable to load review!</Text>
          ) : creatorReviews.isLoading ? (
            <Text style={styles.tabTextContent}>Loading...</Text>
          ) : creatorReviews.data?.all_creator_reviews?.length === 0 ? (
            <Text style={styles.tabTextContent}>No reviews</Text>
          ) : (
            creatorReviews.data?.all_creator_reviews.map((reviews) => (
              <TouchableOpacity key={reviews._id} style={styles.tabItem}>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.Notification_ProfilePic}
                    source={{ uri: reviews?.user_id?.profile_Image }}
                  />
                </View>
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabText}>{reviews?.user_id?.name}</Text>
                  <Text style={styles.tabTextContent}>
                    {reviews.review.length > 70
                      ? reviews.review.substring(0, 70) + "..."
                      : reviews.review}
                  </Text>
                  <Text style={styles.tabTextContent}>
                    {reviews?.createdAt?.split("T")?.[0]}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon
                    name="chevron-right"
                    type="font-awesome"
                    color="#333"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_container: {
    alignItems: "center",
    marginTop: 20,
  },
  Main_Inner: {
    width: "90%",
  },
  Heading_Reviews: {
    color: "#593BFB",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  Secondary_review_section: {
    flexDirection: "row",
    backgroundColor: "#593BFB",
    borderRadius: 10,
    padding: 30,
    justifyContent: "space-between",
  },
  Rating_Number: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  reviews_numbers: {
    color: "#fff",
  },
  Progress_bars_ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  Rating_text_secondary: {
    color: "#fff",
    marginHorizontal: 10,
    fontSize: 16,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#f2f2f2",
    marginBottom: 8,
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,

    elevation: 5,
  },
  iconContainer: {
    marginLeft: 10,
  },
  Notification_ProfilePic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  tabTextContainer: {
    flex: 1,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Review;

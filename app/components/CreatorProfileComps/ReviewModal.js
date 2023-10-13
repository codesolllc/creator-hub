import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useGiveCreatorReviewsMutation } from "../../Redux/Reducers/ReviewReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGiveCreatorRatingsMutation } from "../../Redux/Reducers/RatingsReducer";

const ReviewModal = ({ isVisible, onClose, creatorId }) => {
  const [userId, setUserId] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [giveCreatorReview] = useGiveCreatorReviewsMutation();
  const [giveCreatorRatings] = useGiveCreatorRatingsMutation();

  const giveRating = async () => {
    try {
      const ratingResponse = await giveCreatorRatings({
        userID: userId,
        creatorID: creatorId,
        data: {
          ratings: Number(rating),
        },
      });

      if (!ratingResponse.error) {
        alert("Rating post successfully!");
        onClose();
      } else {
        alert(ratingResponse.error.data.message);
      }
    } catch (error) {
      alert("Failed to Give Rating & Rating!");
    }
  };

  const giveReview = async () => {
    if (review && rating) {
      if (rating >= 1 && rating <= 5) {
        try {
          const reviewRating = await giveCreatorReview({
            userID: userId,
            creatorID: creatorId,
            data: {
              review,
            },
          });

          if (!reviewRating.error) {
            alert("Review post successfully!");
            giveRating();
          } else {
            alert("Unable to post review! try again");
          }
        } catch (error) {
          alert("Failed to Give Rating & Rating!");
        }
      } else {
        alert("Rating must be in 1 to 5");
      }
    } else {
      alert("All Feild Required");
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.main_Text_heading}>
            Give Review to this Creator!
          </Text>

          <TextInput
            style={styles.review_text_field}
            placeholder="Write your review here..."
            multiline={true}
            onChangeText={setReview}
          />
          <TextInput
            style={styles.review_text_field}
            placeholder="Give rating under 1 to 5"
            multiline={true}
            onChangeText={setRating}
            keyboardType="numeric"
            maxLength={1}
          />

          <View style={styles.fotter}>
            <TouchableOpacity style={styles.submitButton} onPress={giveReview}>
              <Text style={styles.Button_text_close}>Post</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.Button_text_close}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  review_text_field: {
    width: "100%",
  },
  fotter: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    borderRadius: 20,
    backgroundColor: "#f03e59",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  submitButton: {
    borderRadius: 20,
    backgroundColor: "#593BFB",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  main_Text_heading: {
    color: "#593BFB",
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
  },
  Button_text_close: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ReviewModal;

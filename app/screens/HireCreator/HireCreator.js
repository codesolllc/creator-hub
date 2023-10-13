import * as DocumentPicker from "expo-document-picker";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundImage from "../../components/extras/BackgroundImage";
import InteractiveButton from "../../components/extras/InteractiveButton";
import DottedBorderButton from "../../components/extras/DottedBorderButton";
import * as ImagePicker from "expo-image-picker";
import { useSendProposalsMutation } from "../../Redux/Reducers/HireReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HireCreator = ({ route, navigation }) => {
  const { CreatorID } = route.params;
  const [userId, setUserId] = useState("");
  const [amount, onChangeAmount] = useState("");
  const [workDetail, onChangeWordDetail] = useState("");
  const [pickedImage, setPickedImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [sendProposals] = useSendProposalsMutation();
  const goBack = () => {
    navigation.goBack();
  };

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setPickedImage(result.assets[0].uri);
      const resultSplit = result.assets[0].uri.split("/");
      const name = resultSplit[resultSplit.length - 1];
      setImageName(name);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      setImageName("Unable to Upload Try Again!!");
    } else {
      setPickedImage(result.assets[0].uri);
      const resultSplit = result.assets[0].uri.split("/");
      const name = resultSplit[resultSplit.length - 1];
      setImageName(name);
    }
  };

  const handleSendProposal = async () => {
    if (amount && workDetail) {
      try {
        const formData = new FormData();
        formData.append("CreatorID", CreatorID);
        formData.append("desired_amount", amount);
        formData.append("work_detail", workDetail);

        if (pickedImage) {
          const imageUriParts = pickedImage.split(".");
          const imageType = imageUriParts[imageUriParts.length - 1];
          formData.append("document_or_picture", {
            uri: pickedImage,
            name: `hiredoc.${imageType}`,
            type: `image/${imageType}`,
          });
        }

        const res = await sendProposals({
          userID: userId,
          data: formData,
        });
        if (!res.error) {
          alert("Send Proposal Successfully!");
          goBack();
        } else {
          alert("Unable to send proposal! try again or later!");
        }
      } catch (error) {
        alert("Something went wrong! try again or later!");
      }
    } else {
      alert("All Fields Required");
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
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      {/* Add back button */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Proposal
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.label}>Expected Price For Work</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={onChangeAmount}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Detail of Work</Text>
            <TextInput
              style={styles.inputTextArea}
              value={workDetail}
              multiline={true}
              maxLength={500}
              onChangeText={onChangeWordDetail}
            />

            <View
              style={{ marginTop: 10, marginBottom: 10, alignItems: "center" }}
            >
              <Text style={{ marginBottom: 10 }}>
                {"("}Optional{")"}
              </Text>
              <DottedBorderButton
                title="Attach document"
                onPress={pickDocument}
              />
              <Text style={{ marginTop: 10 }}>{imageName}</Text>
            </View>

            <View
              style={{ marginTop: 10, marginBottom: 190, alignItems: "center" }}
            >
              <InteractiveButton
                title="Send Proposal"
                backcolor="#613499"
                textColor="white"
                onPress={handleSendProposal}
              />
              <InteractiveButton
                title="Cancel"
                backcolor="#3e78d6"
                textColor="white"
                onPress={goBack}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  inputTextArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
    minHeight: 100,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1,
  },
});

export default HireCreator;

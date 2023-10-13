import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import BackgroundImage from "../../components/extras/BackgroundImage";
import InteractiveButton from "../../components/extras/InteractiveButton";
import DottedBorderButton from "../../components/extras/DottedBorderButton";
import * as ImagePicker from "expo-image-picker";
import { useSendQuotationMutation } from "../../Redux/Reducers/HireReducer";

const Quotation = ({ route, navigation }) => {
  const { userId, item } = route.params;
  const [sendQuotation] = useSendQuotationMutation();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const handleSendQuotation = async () => {
    if (amount && message) {
      try {
        const res = await sendQuotation({
          proposalID: item?._id,
          creatorID: userId,
          data: {
            userID: item?.userID,
            amount,
            message,
          },
        });
        if (!res.error) {
          alert("Quotation Send Successfully!");
          goBack();
        } else {
          alert("Unable to send quotation! try again or later!");
        }
      } catch (error) {
        alert("Something went wrong! try again or later!");
      }
    } else {
      alert("All Feilds Required!");
    }
  };

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
        Quatation Form
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={styles.label}>Amount*</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.label}>Any Message</Text>
            <TextInput
              style={styles.inputTextArea}
              multiline={true}
              value={message}
              onChangeText={setMessage}
            />

            <View
              style={{ marginTop: 10, marginBottom: 190, alignItems: "center" }}
            >
              <InteractiveButton
                title="Send Quotation"
                backcolor="#613499"
                textColor="white"
                onPress={handleSendQuotation}
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

export default Quotation;

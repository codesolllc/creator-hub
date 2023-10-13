import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import BASE_URL from "../../Config";

const AccountDetailModal = ({ isVisible, onClose, userData , navigation}) => {
  const [cardId, setCardId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [card_exp_month, setCard_exp_month] = useState("");
  const [card_exp_year, setCard_exp_year] = useState("");
  const [card_cvc, setCard_cvc] = useState("");
  const [alreadyActive, setAlreadyActive] = useState(false);

  const handleCardDetail = async () => {
    if (cardNumber && card_exp_month && card_exp_year && card_cvc) {
      const response = await fetch(
        `${BASE_URL}/usercards/add_card/${userData?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            card_number: cardNumber,
            card_exp_month: card_exp_month,
            card_exp_year: card_exp_year,
            card_cvc: card_cvc,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(`Active Payment Method Successfully!`);
        setCardNumber("");
        setCard_cvc("");
        setCard_exp_year("");
        setCard_exp_month("");
        onClose();
        navigation.navigate("Btabs");
      } else {
        console.log("failed to active payment method error:", data.message);
        alert(data.message);
       
      }
    } else {
      alert("All Fields Required");
    }
  };

  const handleUpdateCardDetail = async () => {

    if (cardNumber && card_exp_month && card_exp_year && card_cvc) {
      const response = await fetch(
        `${BASE_URL}/usercards/update_card/${cardId}/${userData?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            card_number: cardNumber,
            card_exp_month: card_exp_month,
            card_exp_year: card_exp_year,
            card_cvc: card_cvc,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(`Update Payment Method Successfully!`);
        onClose();
        navigation.navigate("Btabs");

      } else {
        console.log("failed to active payment method error:", data.message);
        alert(data.message);
      }
    } else {
      alert("All Fields Required");
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          `${BASE_URL}/usercards/get_user_card/${userData?._id}`
        );
        const data = await res.json();
        if (res.status === 200) {
          setAlreadyActive(true);
          setCardId(data?.findcard?._id);
          setCardNumber(data?.findcard?.card_number);
          setCard_cvc(data?.findcard?.card_cvc);
          setCard_exp_year(data?.findcard?.card_exp_year);
          setCard_exp_month(data?.findcard?.card_exp_month);
        }
      } catch (error) {
        console.log(error, "unable to get details");
        setAlreadyActive(false);
      }
    })();
  }, [userData?._id]);
 
  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={onClose}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      {alreadyActive ? (
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.modal_title}>✔ Card Details</Text>
          <View style={styles.checkout_form_container}>
            <ScrollView>
              <Text style={styles.input_lable}>Card Number</Text>
              <TextInput
                style={styles.input_field}
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="**** **** **** ****"
                maxLength={16}
              />
              <Text style={styles.input_lable}>CVC</Text>
              <TextInput
                style={styles.input_field}
                value={card_cvc}
                onChangeText={setCard_cvc}
                placeholder="***"
                maxLength={3}
              />
              <View style={styles.row_fields}>
                <View style={{ width: "47%" }}>
                  <Text style={styles.input_lable}>Valid Until</Text>
                  <TextInput
                    style={styles.input_field}
                    placeholder="Month"
                    value={card_exp_month}
                    onChangeText={setCard_exp_month}
                    maxLength={2}
                  />
                </View>
                <View style={{ width: "47%" }}>
                  <Text style={styles.input_lable}>Year</Text>

                  <TextInput
                    style={styles.input_field}
                    placeholder="Year"
                    value={card_exp_year}
                    onChangeText={setCard_exp_year}
                    maxLength={4}
                  />
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.cart_container}>
            <View style={styles.button_container}>
              <TouchableOpacity
                style={{
                  width: "100%",
                }}
                onPress={handleUpdateCardDetail}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    width: "100%",
                    marginTop: 18,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Update Card
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.modal_title}>✔ Card Details</Text>
          <View style={styles.checkout_form_container}>
            <ScrollView>
              <Text style={styles.input_lable}>Card Number</Text>
              <TextInput
                style={styles.input_field}
                onChangeText={setCardNumber}
                placeholder="**** **** **** ****"
                maxLength={16}
              />
              <Text style={styles.input_lable}>CVC</Text>
              <TextInput
                style={styles.input_field}
                onChangeText={setCard_cvc}
                placeholder="***"
                maxLength={3}
              />
              <View style={styles.row_fields}>
                <View style={{ width: "47%" }}>
                  <Text style={styles.input_lable}>Valid Until</Text>
                  <TextInput
                    style={styles.input_field}
                    placeholder="Month"
                    onChangeText={setCard_exp_month}
                    maxLength={2}
                  />
                </View>
                <View style={{ width: "47%" }}>
                  <Text style={styles.input_lable}>Year</Text>

                  <TextInput
                    style={styles.input_field}
                    placeholder="Year"
                    onChangeText={setCard_exp_year}
                    maxLength={4}
                  />
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.cart_container}>
            <View style={styles.button_container}>
              <TouchableOpacity
                style={{
                  width: "100%",
                }}
                onPress={handleCardDetail}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    width: "100%",
                    marginTop: 18,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#593BFB",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modal_title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  checkout_form_container: {
    marginTop: 40,
  },
  input_lable: {
    fontSize: 15,
    marginBottom: 10,
    color: "#fff",
  },
  input_field: {
    fontSize: 17,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#5f5f61",
  },
  row_fields: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  pick_image: {
    width: "100%",
    height: 40,
    textAlign: "center",
    color: "#593BFB",
    borderRadius: 10,
    lineHeight: 40,
    marginTop: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#593BFB",
  },
  row_fields: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AccountDetailModal;

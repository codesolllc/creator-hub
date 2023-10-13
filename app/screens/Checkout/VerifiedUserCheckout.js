import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView } from "react-native";
import BackgroundImage from "../../components/extras/BackgroundImage";
import InteractiveButton from "../../components/extras/InteractiveButton";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../Config";

const VerifiedUserCheckout = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [card_exp_month, setCard_exp_month] = useState("");
  const [card_exp_year, setCard_exp_year] = useState("");
  const [card_cvc, setCard_cvc] = useState("");

  const [userData, setUserData] = useState({});

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("email");
      const userdata = await AsyncStorage.getItem("userdata");
      if (value !== null && userdata !== null) {
        setUserData(JSON.parse(userdata));
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleJobPayment = async () => {
    try {
      if (
        cardNumber !== "" &&
        card_cvc !== "" &&
        card_exp_month !== "" &&
        card_exp_year !== ""
      ) {
        const response = await fetch(
          `${BASE_URL}/api/create-payment-intent/${userData.findUser._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userData.findUser._id,
              email: userData.findUser.email,
              card_number: cardNumber,
              card_exp_month: card_exp_month,
              card_exp_year: card_exp_year,
              card_cvc: card_cvc,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Verification Applicaion Sent successful:", data.message);
          alert(`Verification Applicaion Sent successfully`);
          navigation.navigate("verifythankyou");
        } else {
          console.log("Subscription failed:", data.message);
          alert(data.message);
        }
      } else {
        alert("All Fields Are Required");
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle general error, e.g., display a generic error message
    }
  };

  useEffect(() => {
    getData();
    (async function () {
      try {
        const res = await fetch(
          `${BASE_URL}/usercards/get_user_card/${userData?.findUser?._id}`
        );
        const data = await res.json();
        if (res.status === 200) {
          setCardNumber(data?.findcard?.card_number);
          setCard_cvc(data?.findcard?.card_cvc);
          setCard_exp_year(data?.findcard?.card_exp_year);
          setCard_exp_month(data?.findcard?.card_exp_month);
        }
      } catch (error) {
        console.log(error, "unable to get details");
      }
    })();
  }, [userData?.findUser?._id]);

  return (
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      <View style={styles.container}>
        <Text style={styles.checkout_title}>Verify User Checkout</Text>

        <View style={styles.checkout_price_box}>
          <Text style={styles.total_price_title}>Verification Charges</Text>
          <Text style={styles.total_price}>$ 1000.00</Text>
        </View>

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
                <TextInput
                  style={styles.input_field}
                  placeholder="Year"
                  value={card_exp_year}

                  onChangeText={setCard_exp_year}
                  maxLength={4}
                />
              </View>
              <View style={{ width: "47%" }}>
                <Text style={styles.input_lable}>CVV</Text>
                <TextInput
                  style={styles.input_field}
                  value={card_cvc}

                  onChangeText={setCard_cvc}
                  placeholder="***"
                  maxLength={3}
                />
              </View>
            </View>

            {/* <Text style={styles.input_lable}>Card Holder</Text>
            <TextInput style={styles.input_field} placeholder="Your Name" /> */}
          </ScrollView>
        </View>

        <View style={styles.cart_container}>
          <View style={styles.button_container}>
            <InteractiveButton
              title="Proceed to confirm"
              backcolor="#593BFB"
              onPress={handleJobPayment}
            />
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default VerifiedUserCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 40,
    padding: 20,
  },
  checkout_title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  checkout_price_box: {
    flex: 0.2,
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  total_price_title: {
    fontSize: 18,
    color: "#593BFB",
  },
  total_price: {
    fontSize: 40,
    fontWeight: "600",
    color: "#593BFB",
  },
  checkout_form_container: {
    flex: 0.6,
    marginTop: 40,
  },
  input_lable: {
    fontSize: 15,
    marginBottom: 10,
    color: "#5f5f61",
  },
  input_field: {
    fontSize: 17,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  row_fields: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cart_container: {
    flex: 0.2,
  },
  button_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

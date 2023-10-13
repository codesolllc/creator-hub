import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import BackgroundImage from "../../components/extras/BackgroundImage";
import InteractiveButton from "../../components/extras/InteractiveButton";

const HiringCheckout = ({ navigation }) => {


    const handlePay = ()=> {
        navigation.navigate("thankyou")
    }


    
  return (
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      <View style={styles.container}>
        <Text style={styles.checkout_title}>Checkout</Text>

        <View style={styles.checkout_price_box}>
          <Text style={styles.total_price_title}>Total Price</Text>
          <Text style={styles.total_price}>$ 1,2200.00</Text>
        </View>

        <View style={styles.checkout_form_container}>
          <ScrollView>
            <Text style={styles.input_lable}>Card Number</Text>
            <TextInput
              style={styles.input_field}
              placeholder="**** **** **** ****"
            />

            <View style={styles.row_fields}>
              <View style={{ width: "47%" }}>
                <Text style={styles.input_lable}>Valid Until</Text>
                <TextInput
                  style={styles.input_field}
                  placeholder="Month / Year"
                />
              </View>
              <View style={{ width: "47%" }}>
                <Text style={styles.input_lable}>CVV</Text>
                <TextInput style={styles.input_field} placeholder="***" />
              </View>
            </View>

            <Text style={styles.input_lable}>Card Holder</Text>
            <TextInput style={styles.input_field} placeholder="Your Name" />
          </ScrollView>
        </View>

        <View style={styles.cart_container}>
          <View style={styles.button_container}>
            <InteractiveButton
              title="Proceed to confirm"
              backcolor="#593BFB"
              onPress={handlePay}
            />
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default HiringCheckout;

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

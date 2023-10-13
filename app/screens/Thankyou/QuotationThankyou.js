import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BackgroundImage from "../../components/extras/BackgroundImage";
import InteractiveButton from "../../components/extras/InteractiveButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const QuotationThankyou = ({ route, navigation }) => {
    const {item} = route.params;
    
  return (
    <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
      <View style={styles.container}>
        <View style={styles.thankyou_container}>
          <FontAwesome5 name="check-circle" color="#593BFB" size={80} />
          <Text style={styles.thankyou}> Thankyou! </Text>
        
          <Text style={styles.thankyou_decs}>
            Your payment for {" "}
            <Text style={styles.highlighted}>Quotation</Text>, amounting to{" "}
            <Text style={styles.highlighted}>${item?.amount}</Text>, has been successfully
            processed.
          </Text>
        </View>

        <View style={styles.cart_container}>
          <View style={styles.button_container}>
            <InteractiveButton
              title="Done"
              backcolor="#593BFB"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
};

export default QuotationThankyou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    top: 30,
  },
  thankyou_container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  thankyou: {
    fontSize: 50,
    color: "#593BFB",
    textAlign: "center",
    marginTop: 20,
  },
  thankyou_decs: {
    fontSize: 18,
    color: "#5f5f61",
    textAlign: "center",
    padding: 20,
  },
  highlighted: {
    fontWeight: "bold",
    color: "#48484a",
  },
  cart_container: {
    flex: 0.2,
    width: "100%",
  },
  button_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

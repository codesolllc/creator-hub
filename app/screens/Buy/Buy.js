import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import BuyButtonNavigation from "../../components/BuyComps/BuyButtonNavigation/BuyButtonNavigation";
import CategoriesBuy from "../../components/BuyComps/CategoriesBuy/CategoriesBuy";
import NewListedProducts from "../../components/BuyComps/NewListedProducts/NewListedProducts";
import Gears from "../../components/BuyComps/NewGears/Gears";
import NewListedProductsRent from "../../components/BuyComps/NewListedProducts/NewLIstedProdductsRent";

const Buy = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.button_conatiner}>
        <Text
          style={{
            color: "black",
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            paddingBottom: 10,
          }}
        >
          Marketplace
        </Text>
        <BuyButtonNavigation navigation={navigation} />
      </View>
      <View style={styles.Scrolling_Container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Browse Categories</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("productcategories", {
                  productCatType: "all",
                })
              }
            >
              <Text style={styles.readmoretext}>See All...</Text>
            </TouchableOpacity>
          </View>
          <CategoriesBuy navigation={navigation} type={"all"} />
          {/* buy products... */}
          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Buy Products</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("productcategories", {
                  productCatType: "buy",
                })
              }
            >
              <Text style={styles.readmoretext}>See All...</Text>
            </TouchableOpacity>
          </View>
          <NewListedProducts navigation={navigation} />
          {/* rental products... */}
          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Rental Products</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("productcategories", {
                  productCatType: "rental",
                })
              }
            >
              <Text style={styles.readmoretext}>See All...</Text>
            </TouchableOpacity>
          </View>
          <NewListedProductsRent navigation={navigation} />

          <View style={styles.subHeadingcontainer}>
            <Text style={styles.subheadingtext}>Sell Product</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SoldProdcutListing")}
            >
              <Text style={styles.readmoretext}>See All...</Text>
            </TouchableOpacity>
          </View>
          <Gears navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Scrolling_Container: {
    marginTop: 160,
  },
  button_conatiner: {
    position: "absolute",
    top: 50,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  subheadingtext: {
    fontSize: 25,
    fontWeight: "600",
  },
  subHeadingcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  readmoretext: {
    color: "gray",
    fontSize: 20,
    marginTop: 5,
  },
});

export default Buy;

import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useGetAllProductCategoriesQuery } from "../../../Redux/Reducers/Product_CategoryReducer";

const CategoriesBuy = ({ navigation, type }) => {
  const windowWidth = Dimensions.get("window").width;
  const productCategories = useGetAllProductCategoriesQuery();

  const handleProductListingNavigation = (item) => {
    navigation.navigate("productListing", {
      singleCat: item,
      productCatType: type,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {productCategories?.isError ? (
          <Text style={styles.text}>Unable to load categories</Text>
        ) : productCategories?.isLoading ? (
          <Text style={styles.text}>Loading...</Text>
        ) : productCategories?.data?.length === 0 ? (
          <Text style={{ textAlign: "center", flex: 1 }}>
            No categories yet!
          </Text>
        ) : (

          productCategories?.data?.categories
            ?.slice(0, 3)
            ?.map((item, index) => (
              <TouchableOpacity
                key={item?._id}
                onPress={() => handleProductListingNavigation(item)}
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: item?.category_image }}
                    style={styles.images}
                  />
                  <Text style={styles.text}>{item?.category_name}</Text>
                </View>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  images: {
    resizeMode: "contain",
    height: 150,
    width: 150,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    textAlign: "center",
  },
});

export default CategoriesBuy;

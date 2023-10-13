import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useGetAllProductCategoriesQuery } from "../../Redux/Reducers/Product_CategoryReducer";

const ProductCatogories = ({ route, navigation }) => {
  const productCatType = route.params.productCatType;
  const productCategories = useGetAllProductCategoriesQuery();

  const NavigateToUserListingCards = (item) => {
    navigation.navigate("productListing", { singleCat: item, productCatType });
  };


  console.log(productCatType, 'type here is done');

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => NavigateToUserListingCards(item)}
      >
        <Image
          source={{ uri: item?.category_image }}
          style={styles.images}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          {item?.category_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.categories_heading}>
        <View style={styles.Category_container_Main}>
          <Text style={styles.category_Heading_Text}>All Categories</Text>
        </View>
      </View>
      <View style={styles.container}>
        {productCategories?.isError ? (
          <Text style={styles.text}>Unable to load categories</Text>
        ) : productCategories?.isLoading ? (
          <Text style={styles.text}>Loading...</Text>
        ) : productCategories?.data?.length === 0 ? (
          <Text style={{ textAlign: "center", flex: 1 }}>
            No product categories!
          </Text>
        ) : (
          productCategories?.data && (
            <FlatList
              data={productCategories?.data?.categories}
              keyExtractor={(item) => item?._id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  category_Heading_Text: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
    marginTop: 30,
  },
  Category_container_Main: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  categories_heading: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#593BFB",
  },
  container: {
    padding: 20,
    marginTop: 90,
  },
  categoryItem: {
    marginBottom: 20,
    alignItems: "center",
  },
  images: {
    width: "100%",
    height: 100,
    borderRadius: 20,
  },
});

export default ProductCatogories;

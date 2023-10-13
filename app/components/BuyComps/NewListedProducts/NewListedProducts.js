import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useGetAllProductQuery } from "../../../Redux/Reducers/ProductReducer";

const NewListedProducts = ({ navigation }) => {
  const allProduct = useGetAllProductQuery();

  const NavigateToUserListingCards = (item) => {
    navigation.navigate("singleProduct", {
      singleProduct: item,
    });
  };

  return (
    <>
    <View
      style={{
        marginTop: 5,
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allProduct?.isError ? (
          <Text style={styles.text}>Unable to load categories</Text>
          ) : allProduct?.isLoading ? (
            <Text style={styles.text}>Loading...</Text>
            ) : allProduct?.length === 0 ? (
              <Text style={{ textAlign: "center", flex: 1 }}>
            No products available for buy!
          </Text>
        ) : (
          allProduct?.data
            ?.filter((item) => item.type[0] === "Buy")
            ?.slice(-3)
            ?.map((item) => (
              <View key={item?._id} style={styles.card}>
                <TouchableOpacity
                  onPress={() => NavigateToUserListingCards(item)}
                >
                  <Image
                    source={{ uri: item?.featured_image }}
                    style={styles.images}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {item.product_name}
                </Text>
              </View>
            ))
        )}
      </ScrollView>
    </View>



</>
  );
};

const styles = StyleSheet.create({
  images: {
    resizeMode: "contain",
    height: 170,
    width: 200,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth: 0.3,
    borderColor: "gray",
    borderRadius: 40,
    padding: 10,
    // ...Platform.select({
    //   android: {
    //     // elevation: 5,
    //   },
    // }),
  },
  card: {
    alignItems: "center",
    marginRight: 30,
  },
});

export default NewListedProducts;

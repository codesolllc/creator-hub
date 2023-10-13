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
import { useGetSoldProductQuery } from "../../../Redux/Reducers/ProductReducer";

const Gears = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const soldProduct = useGetSoldProductQuery();



  const imageWidth = windowWidth * 0.7; // Adjust the percentage as needed

  const NavigateToUserListingCards = (item) => {
    navigation.navigate("singleProduct", {
      singleProduct: item,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {soldProduct?.isError ? (
          <Text style={styles.text}>Unable to load sold products</Text>
        ) : soldProduct?.isLoading ? (
          <Text style={styles.text}>Loading...</Text>
        ) : soldProduct?.length === 0 ? (
          <Text style={{ textAlign: "center", flex: 1 }}>
            No product available!
          </Text>
        ) : (
          soldProduct?.data?.map((item) => (
            <TouchableOpacity
              onPress={() => NavigateToUserListingCards(item)}
              key={item?._id}
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: item?.featured_image }}
                  style={[styles.images, { width: imageWidth }]}
                />
                <Text style={styles.text}>{item.product_name}</Text>
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
    paddingHorizontal: 20,
  },
  images: {
    resizeMode: "contain",
    height: 170,
    borderRadius: 15,
    marginBottom: 10,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Gears;

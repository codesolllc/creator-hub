import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import {  useGetSoldProductQuery } from "../../Redux/Reducers/ProductReducer";

const SoldProdcutListing = ({ navigation }) => {

  const products = useGetSoldProductQuery();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      products.refetch();
      setRefreshing(false);
    }, 2000);
  };

  const handleNavigateSingleProduct = (item) => {
    navigation.navigate("singleProduct", {
      singleProduct: item,
    });
  };


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subheadingtext}>Sold Products</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.rowContainer}>
          {
            products.isError ? (
              <Text style={{ color: "black", textAlign: "center" }}>
                Unable to load products
              </Text>
            ) : products.isLoading ? (
              <Text style={{ color: "black", textAlign: "center" }}>
                Loading...
              </Text>
            ) : products?.data?.length === 0 ? (
              <Text style={{ textAlign: "center", flex: 1 }}>
                No product available for buy!
              </Text>
            ) : (
              products?.data?.map((item) => (
                <TouchableOpacity
                  key={item?._id}
                  style={{ ...styles.imageContainer, position: "relative" }}
                  onPress={() => handleNavigateSingleProduct(item)}
                >
                  <Image
                    source={{ uri: item?.featured_image }}
                    style={styles.image}
                  />
                  <View style={{ position: "absolute", right: 0 }}>
                    <Text
                      style={{
                        color: "white",
                        padding: 3,
                        backgroundColor: "#593BFB",
                        borderRadius: 5,
                      }}
                    >
                      {item.status?.[0]}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )
          }

        </View>
      </ScrollView>
    </View>
  );
};

export default SoldProdcutListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    top: 40,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    width: "45%", // Adjust the width as needed to fit two images per row
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  subheadingtext: {
    fontSize: 35,
    fontWeight: "600",
    textAlign: "center",
  },
});

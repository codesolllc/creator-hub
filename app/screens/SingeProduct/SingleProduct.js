import React, { useState } from "react";
import BackgroundImage from "../../components/extras/BackgroundImage";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import InteractiveButton from "../../components/extras/InteractiveButton";
import { useGetSingleProductQuery } from "../../Redux/Reducers/ProductReducer";

const SingleProduct = ({ route, navigation }) => {
  const singleProduct = route.params.singleProduct;
  const [viewImage, setViewImage] = useState(false);

  const product = useGetSingleProductQuery(singleProduct?._id);

  const handleCheckoutNavigation = () => {
    navigation.navigate("checkout", { item: singleProduct });
  };

  return (
    <>
      <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              ...styles.autherCon,
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
            onPress={() =>
              navigation.navigate("CreatorProfile", {
                item: product?.data?.single_product?.author_id,
              })
            }
          >
            <Image
              style={{ width: 60, height: 60, borderRadius: 50 }}
              source={{
                uri: product?.data?.single_product?.author_id?.profile_Image,
              }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {product?.data?.single_product?.author_id?.name}
            </Text>
          </TouchableOpacity>
          {/* produc image */}
          <TouchableOpacity
            style={styles.product_img_container}
            onPress={() => setViewImage(true)}
          >
            <Image
              source={{ uri: product?.data?.single_product?.featured_image }}
              style={styles.productimage}
            />
          </TouchableOpacity>
          {/* produc description */}
          <View style={styles.product_content_container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.product_details}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.product_title}>
                    {product?.data?.single_product?.product_name}
                  </Text>
                  <Text style={styles.product_title}>
                    $ {product?.data?.single_product?.price}
                  </Text>
                </View>
                <View>
                  <Text style={styles.product_decs}>
                    {product?.data?.single_product?.product_description}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* produc buy or rent */}
          <View style={styles.cart_container}>
            <View style={styles.button_container}>
              {singleProduct?.status?.[0] === "sold" ? null : singleProduct
                  ?.type?.[0] === "Buy" ? (
                <InteractiveButton
                  title="BUY"
                  backcolor="#593BFB"
                  onPress={() => handleCheckoutNavigation()}
                />
              ) : (
                <InteractiveButton
                  title="RENT"
                  backcolor="#593BFB"
                  onPress={() => handleCheckoutNavigation()}
                />
              )}
            </View>
          </View>
        </View>
      </BackgroundImage>
      {viewImage ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 20 }}
            onPress={() => setViewImage(false)}
          >
            <Text style={{ color: "white", fontSize: 40 }}>X</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 5,
              paddingVertical: 10,
              paddingLeft: 20,
              width: "100%",
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product?.data?.single_product?.product_images.length > 0 ? (
                product?.data?.single_product?.product_images.map(
                  (image, i) => (
                    <View
                      style={{
                        paddingLeft: 20,
                        width: 320,
                      }}
                      key={i}
                    >
                      <Image
                        source={{
                          uri: image,
                        }}
                        style={{
                          width: "100%",
                          height: 350,
                          borderRadius: 10,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  )
                )
              ) : (
                <Image
                  source={{
                    uri: product?.data?.single_product?.featured_image,
                  }}
                  style={styles.postImageView}
                  resizeMode="cover"
                />
              )}
            </ScrollView>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    top: 30,
    marginHorizontal: 10,
  },
  autherCon: {
    flex: 0.1,
  },
  product_select: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  product_img_container: {
    flex: 0.4,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  product_content_container: {
    flex: 0.3,
    top: 30,
  },
  product_details: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
  },
  product_title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#593BFB",
  },
  product_decs: {
    fontSize: 15,
    color: "#5f5f61",
  },
  cart_container: {
    flex: 0.2,
  },
  button_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postImageView: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    resizeMode: "cover",
  },
  operation_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 11,
    borderRadius: 19,
    alignItems: "center",
    margin: 10,
    borderColor: "yellow",
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

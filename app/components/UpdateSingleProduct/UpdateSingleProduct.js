import React, { useEffect, useState } from "react";
import BackgroundImage from "../../components/extras/BackgroundImage";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  useDeleteProductMutation,
  useGetSingleProductQuery,
} from "../../Redux/Reducers/ProductReducer";
import DeleteModal from "../DeleteModal/DeleteModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InteractiveButton from "../extras/InteractiveButton";

const UpdateSingleProduct = ({ route, navigation }) => {
  const [viewImage, setViewImage] = useState(false);

  const singleProduct = route.params.singleProduct;
  const [userId, setUserId] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const product = useGetSingleProductQuery(singleProduct?._id);
  const [deleteProduct] = useDeleteProductMutation();
  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const DeleteProduct = async () => {
    try {
      const res = await deleteProduct({
        authorID: userId,
        productId: singleProduct?._id,
      });
      if (!res.error) {
        alert("Product Delete!");
        navigation.goBack();
      } else {
        alert("Unable to Delete! try again.");
      }
    } catch (error) {
      alert("Failed to Delete! Try Later");
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUserId(findUser.findUser._id);
        } catch (parseError) {
          console.log("Error parsing user data:", parseError);
        }
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.log("Unable to get user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
        <View style={styles.container}>
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
            <View style={styles.operation_btns}>
              {product?.data?.single_product?.author_id?._id === userId ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#593BFB" }]}
                    onPress={() =>
                      navigation.navigate("updateSingleModal", {
                        singleProduct: product?.data?.single_product,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#f03e59" }]}
                    onPress={toggleDeleteModal}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <InteractiveButton
                    title="BUY"
                    backcolor="#593BFB"
                    onPress={null}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <DeleteModal
          isVisible={isDeleteModalVisible}
          onClose={toggleDeleteModal}
          delFun={DeleteProduct}
        />
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

export default UpdateSingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    top: 30,
  },
  product_select: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  product_img_container: {
    flex: 0.4,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  productimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  product_content_container: {
    flex: 0.4,
    top: 30,
    // alignItems: "center",
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

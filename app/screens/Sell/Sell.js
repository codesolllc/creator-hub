import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import InteractiveButton from "../../components/extras/InteractiveButton";
import BackgroundImage from "../../components/extras/BackgroundImage";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useCreateProductMutation } from "../../Redux/Reducers/ProductReducer";
import { useGetAllProductCategoriesQuery } from "../../Redux/Reducers/Product_CategoryReducer";
import DottedBorderButton from "../../components/extras/DottedBorderButton";

const Sell = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productFeaturedImage, setProductFeaturedImage] = useState("");
  const [productOtherImages, setProductOtherImages] = useState([]);
  const [selectDropDown, setSelectDropdown] = useState(false);
  const [userId, setUserId] = useState("");
  const [createProduct] = useCreateProductMutation();
  const productCategories = useGetAllProductCategoriesQuery();

  const pickProductFeaturedImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
    } else {
      setProductFeaturedImage(result.assets[0].uri);
    }
  };

  const pickProductImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (result.canceled) {
    } else {
      const uris = result.assets.map((img) => img.uri);
      setProductOtherImages(uris);
    }
  };

  const handleAddProduct = async () => {
    if (
      productName &&
      productCategory &&
      productFeaturedImage &&
      productOtherImages &&
      productPrice &&
      productDescription
    ) {
      try {
        const formData = new FormData();
        formData.append("product_name", productName);
        formData.append("product_description", productDescription);
        formData.append("price", productPrice);
        formData.append("product_category", productCategory?._id);
        formData.append("type", "Buy");
        formData.append("status", "unsold");
        // send featured image
        const imageUriParts = productFeaturedImage.split(".");
        const imageType = productFeaturedImage[imageUriParts.length - 1];
        const imageName = productFeaturedImage[imageUriParts.length - 2];

        formData.append("featured_image", {
          uri: productFeaturedImage,
          name: `${imageName}.${imageType}`,
          type: `image/${imageType}`,
        });

        // send product img...
        productOtherImages.forEach((img) => {
          const imageUriParts = img.split(".");
          const imageType = img[imageUriParts.length - 1];
          const imageName = img[imageUriParts.length - 2];

          formData.append("product_images", {
            uri: img,
            name: `${imageName}.${imageType}`,
            type: `image/${imageType}`,
          });
        });

        const res = await createProduct({
          authorID: userId,
          data: formData,
        });
        if (!res.error) {
          alert("Upload product successfully!");
          setProductName("");
          setProductPrice("");
          setProductCategory("");
          setProductDescription("");
          setProductFeaturedImage("");
          setProductOtherImages([]);
          navigation.navigate("Btabs");
        } else {
          alert("Failed to upload product");
          console.log(res.error, "error. ");
        }
      } catch (error) {
        console.log(error, "catch");
        alert("Failed to upload product");
      }
    } else {
      alert("All Feilds Required!");
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

  const handleDropDownValue = (val) => {
    setProductCategory(val);
    setSelectDropdown(false);
  };

  return (
    <BackgroundImage
      source={require("../../assets/Home/bg_img.png")}
    >
      {/* Add back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Enter Product Details:
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.label}>Product Name:</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />
          <Text style={styles.label}>Product Category:</Text>
          <TouchableOpacity onPress={() => setSelectDropdown(true)}>
            <Text style={styles.selectItem_text}>
              {productCategory ? productCategory?.category_name : "Select"}
            </Text>
          </TouchableOpacity>
          {/* dropdown */}
          {selectDropDown ? (
            <View style={styles.dropdown_box}>
              <View style={styles.dropdown_item_container}>
                {productCategories.isError ? (
                  <Text style={styles.dropdown_item}>
                    Failed to Disply Category!
                  </Text>
                ) : productCategories.isLoading ? (
                  <Text style={styles.dropdown_item}>Loading...</Text>
                ) : (
                  productCategories?.data?.categories?.map((item) => (
                    <TouchableOpacity
                      key={item?._id}
                      onPress={() => handleDropDownValue(item)}
                    >
                      <Text style={styles.dropdown_item}>
                        {item?.category_name}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          ) : null}

          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
          />
          <Text style={styles.label}>About Product:</Text>
          <TextInput
            style={styles.input}
            value={productDescription}
            onChangeText={setProductDescription}
          />

          <View style={{ marginTop: 30, alignItems: "center" }}>
            <DottedBorderButton
              title="Select Featured Image"
              onPress={pickProductFeaturedImage}
            />
            <Text>
              {productFeaturedImage !== "" ? "Selected Featured Image" : ""}
            </Text>
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <DottedBorderButton
              title="Select Multiple Images"
              onPress={pickProductImages}
            />
            <Text>
              {productOtherImages.length !== 0 ? "Selected Product Images" : ""}
            </Text>
          </View>
          <View
            style={{ marginTop: 10, marginBottom: 190, alignItems: "center" }}
          >
            <InteractiveButton
              title="Upload Product"
              backcolor="#613499"
              textColor="white"
              onPress={handleAddProduct}
            />
            <InteractiveButton
              title="Cancel"
              backcolor="#3e78d6"
              textColor="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 10,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1,
  },
  //   dropdown....
  dropdown_box: {
    position: "relative",
  },
  dropdown_item_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "lightgrey",
    zIndex: 5,
    borderRadius: 10,
  },
  dropdown_item: {
    padding: 5,
  },
  selectItem_text: {
    padding: 5,
  },
});

export default Sell;

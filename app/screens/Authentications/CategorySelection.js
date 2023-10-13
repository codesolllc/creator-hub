import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundImage from "../../components/extras/BackgroundImage";
import { useUpdateCategoryMutation } from "../../Redux/Reducers/UserReducer";
import { useGetUserCategoriesQuery } from "../../Redux/Reducers/UserCategoriesReducer";

const CategorySelection = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [email, setEmail] = useState("");
  const [userdata, setUserData] = useState("");

  const userCategories = useGetUserCategoriesQuery();


  const handleItemPress = (item) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("email");
      const userdata = await AsyncStorage.getItem("userdata");
      if (value !== null && userdata !== null) {
        setEmail(JSON.parse(value));
        setUserData(JSON.parse(userdata))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [category] = useUpdateCategoryMutation();

  const categoryPostingUpdate = async () => {
    try {
      const res = await category({
        email: email,
        category: selectedItems,
      });
      if (!res.error) {
        console.log("updated successfully");
        navigation.navigate("Btabs");
      } else {
        console.log(res.error.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedItems]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, []);


  const SkipStep = () => {
    navigation.navigate("Btabs");
  };

  return (
    <>
   <View style={styles.containerTop} />
    <BackgroundImage
      source={require("../../assets/Home/bg_img.png")}
    >
      <ScrollView>
        <View style={styles.container}>
          {userCategories?.data?.all_user_categories?.map((item) => (
            <View
              style={[
                styles.cardOut,
                { borderRadius: 40, overflow: "hidden" },
              ]}
              key={item._id}
            >
              <ImageBackground
                source={{ uri: item?.category_image }}
                style={styles.imageBackground}
              >
                <TouchableOpacity
                  style={[
                    styles.item,
                    selectedItems.includes(item._id) && styles.selectedItem,
                  ]}
                  onPress={() => handleItemPress(item._id)}
                >
                  <Text style={styles.itemText}>
                    {item?.user_category_name}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={categoryPostingUpdate}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={SkipStep}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </BackgroundImage>
    </>
  );
};

const styles = StyleSheet.create({
  containerSkip: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    top: 60,
    right: 10,
    zIndex: 100,
  },
  buttonText:{
    color:"#fff",
    fontWeight:"700",
    fontSize:16,
  },
  submitButton:{
    backgroundColor:"#593BFB",
    borderRadius:5,
    padding:10,
  },
  skipButton:{
    backgroundColor:"red",
    borderRadius:5,
    padding:10,
  },
  bottomButtonsContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    padding:10,
    backgroundColor:"black",
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 50,
  },
  Taglines: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
  },

  containerTop: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#593BFB",
    marginBottom: 100,
    height: 50,
    position: "absolute",
    width: "100%",
    zIndex: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  item: {
    width: "100%",
    height: 170,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  itemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  imageBackground: {
    height: 170,
    width: "100%",
  },
  cardOut: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 40,
  },
});

export default CategorySelection;

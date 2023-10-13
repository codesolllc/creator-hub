import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useGetUserCategoriesQuery } from "../../Redux/Reducers/UserCategoriesReducer";

const CategoryListing = ({ navigation }) => {

  const userCategories = useGetUserCategoriesQuery();


  const NavigateToUserListingCards = (item) => {
    navigation.navigate("UserListingCards", { item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => NavigateToUserListingCards(item)}
      >
        <Image
          source={{ uri: item.category_image }}
          style={styles.images}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          {item.user_category_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.categories_heading}>
        <View style={styles.Category_container_Main}>
          <Text style={styles.category_Heading_Text}>User Categories</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={userCategories?.data?.all_user_categories}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
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
    borderRadius: 20,
    height:200
  },
});

export default CategoryListing;;

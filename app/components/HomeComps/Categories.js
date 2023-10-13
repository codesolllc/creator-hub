import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useGetUserCategoriesQuery } from "../../Redux/Reducers/UserCategoriesReducer";

const Categories = ({ navigation }) => {
  const userCategories = useGetUserCategoriesQuery();

  const NavigateToUserListingCards = (item) => {
    navigation.navigate("UserListingCards", { item });
  };

  return (
    <View
      style={{
        marginTop: 5,
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {userCategories?.data?.length === 0 ? (
          <Text>Not Categories Yet!</Text>
        ) : (
          userCategories?.data?.all_user_categories
            ?.slice(0, 4)
            ?.map((item, index) => (
              <TouchableOpacity
                onPress={() => NavigateToUserListingCards(item)}
                key={index}
              >
                <View style={{ alignItems: "center", marginRight: 30 }}>
                  <Image
                    source={{ uri: item.category_image }}
                    style={styles.images}
                  />

                  <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    {item.user_category_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    resizeMode: "contain",
    height: 160,
    width: 160,
    borderRadius: 30,
  },
});

export default Categories;

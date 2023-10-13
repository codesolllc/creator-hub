import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import All from "../../components/MyProfileComps/SellingSubComps/All";
import Buying from "../../components/MyProfileComps/SellingSubComps/Buying";
import Rent from "../../components/MyProfileComps/SellingSubComps/Rent";
import { useGetUserProductQuery } from "../../Redux/Reducers/ProductReducer";

const Selling = ({ item, navigation }) => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const userProducts = useGetUserProductQuery(item._id);
  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return <All navigation={navigation} product={userProducts.data} from="my_profile" />;
      case 2:
        return <Buying navigation={navigation} product={userProducts.data} from="my_profile" />;
      case 3:
        return <Rent navigation={navigation} product={userProducts.data} from="my_profile" />;
      default:
        return null;
    }
  };

  return (
    <View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => setCurrentComponent(1)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 1 && styles.activeTab,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => setCurrentComponent(2)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 2 && styles.activeTab,
            ]}
          >
            Buying
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={() => setCurrentComponent(3)}
        >
          <Text
            style={[
              styles.tabButtonText,
              currentComponent === 3 && styles.activeTab,
            ]}
          >
            Rent
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.componentContainer}>
        {userProducts.isError ? (
          <Text style={{ textAlign: "center" }}>Something went wrong!</Text>
        ) : userProducts.isLoading ? (
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        ) : (
          renderComponent()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    marginLeft: 10,
  },
  activeTab: {
    color: "#593BFB",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  componentContainer: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  componentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Selling;

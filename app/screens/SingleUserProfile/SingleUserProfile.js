import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Allproducts from "../../components/SingleUserProfileComps/Allproducts";
import SingleUserProfileHeader from "../../components/SingleUserProfileComps/SingleUserProfileHeader";

const SingleUserProfile = ({ route, navigation }) => {
  const item = route.params.item;

  return (
    <ScrollView>
      <View style={styles.Primary_container}>
        <SingleUserProfileHeader navigation={navigation} route={route} item={item} />
      </View>
      <View style={styles.Secondary_container}>
        <Allproducts userID={item._id} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Primary_container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  Primary_heading: {
    color: "#593BFB",
    fontWeight: "600",
    fontSize: 25,
  },
  Secondary_container: {
    alignItems: "center",
  },
});

export default SingleUserProfile;

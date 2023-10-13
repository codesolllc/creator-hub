import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Allproducts from "../../components/UserProfile/Allproducts";
import UserProfileHeader from "../../components/UserProfile/UserProfileHeader";

const UserProfile = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.Primary_container}>
        <UserProfileHeader />
      </View>
      <View style={styles.Secondary_container}>
        <Allproducts navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Primary_container: {
    // flex:0.1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  Primary_heading: {
    color: "#593BFB",
    fontWeight: "600",
    fontSize: 25,
  },
  Secondary_container: {
    // flex:0.9,
    alignItems: "center",
  },
});

export default UserProfile;

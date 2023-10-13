import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import ProfileHeader from "../../components/CreatorProfileComps/ProfileHeader";
import ProfileButton from "../../components/CreatorProfileComps/ProfileButton";
import Review from "../../components/CreatorProfileComps/Review";

const CreatorProfileDetails = ({ route, navigation }) => {
  const { item } = route.params;
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
      <ProfileHeader item={item} />

      <ProfileButton navigation={navigation} route={route} />

      <View style={styles.Main_container_About}>
        <View style={styles.Main_Inner_About}>
          <Text style={styles.Heading_ABout}>About</Text>
          <Text style={styles.Text_Content}>{item?.about}</Text>
        </View>

        <View style={styles.Main_Inner_About}>
          <Text style={styles.Heading_ABout}>Description:</Text>
          <Text style={styles.Text_Content}>{item?.desc}</Text>
        </View>
      </View>

      <Review item={item} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  Main_container_About: {
    alignItems: "center",
    justifyContent: "center",
  },
  Main_Inner_About: {
    justifyContent: "center",
    width: "90%",
    marginTop: 20,
  },
  Heading_ABout: {
    color: "#593BFB",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "left",
  },
  Text_Content: {
    fontSize: 16,
    color: "gray",
    textAlign: "left",
  },
});

export default CreatorProfileDetails;

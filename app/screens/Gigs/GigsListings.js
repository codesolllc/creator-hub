import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserGigsList from "../../components/gigsUserComps/UserGigsList";

const GigsListings = ({ navigation }) => {
  return (
    <View style={styles.Parent_class}>
      <View style={styles.containers_text}>
        <Text style={styles.Gigs_Text}>Gigs Listings</Text>
      </View>
      <View style={styles.Gigs_margin}>
        <UserGigsList navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Parent_class: {
    flex: 1,
  },
  Gigs_margin: {
    flex: 0.9,
  },
  containers_text: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  Gigs_Text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#593BFB",
    marginTop: 20,
  },
});

export default GigsListings;

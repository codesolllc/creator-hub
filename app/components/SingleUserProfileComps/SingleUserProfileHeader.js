import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SingleUserProfileButton from "./SingleUserProfileButton";

const SingleUserProfileHeader = ({ route, item, navigation }) => {

  
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.Profile_picture_main}
          source={{ uri: item?.profile_Image }}
        />
        <Text style={styles.Header_heading}>{item?.name}</Text>
        <Text style={styles.Sub_Heading}>{item?.usertype}</Text>

        <SingleUserProfileButton navigation={navigation} route={route} />
      </View>
      <View style={{ width: "100%", marginBottom: 30 }}>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  Profile_picture_main: {
    height: 150,
    width: 150,
    borderRadius: 50,
  },
  Header_heading: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  Sub_Heading: {
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
    marginVertical: 6,
  },
  button_reviews: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button_review_text: {
    color: "#593BFB",
    fontWeight: "600",
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

export default SingleUserProfileHeader;

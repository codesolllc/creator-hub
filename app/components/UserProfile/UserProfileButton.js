import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const UserProfileButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Chats")}
      >
        <Icon
          name="star"
          underlayColor="transparent"
          iconStyle={styles.placeIconz}
        />
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.buttonContainerz}
        onPress={() => navigation.navigate("hireCreator")}
      >
        <Text style={styles.buttonTextz}>Hire Now!</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
    color: "gray",
  },
  buttonContainerz: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#593BFB",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextz: {
    fontSize: 20,
    fontWeight: "400",
    color: "#fff",
  },
  placeIconz: {
    color: "#593BFB",
    fontSize: 26,
    marginRight: 7,
  },
});
export default UserProfileButton;

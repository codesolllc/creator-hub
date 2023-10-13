import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import BackgroundImage from "../../components/extras/BackgroundImage";
import FontAwesome5 from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InteractiveButton from "../../components/extras/InteractiveButton";

const Verification = ({ navigation }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const userData = await AsyncStorage.getItem("userdata");
        if (userData) {
          try {
            const findUser = JSON.parse(userData);
            setUser(findUser.findUser);
          } catch (parseError) {
            console.log("Error parsing user data:", parseError);
          }
        } else {
          console.log("User data not found");
        }
      } catch (error) {
        console.log("Unable to get user data");
      }
    })();
  }, []);
  return (
    <>
      <BackgroundImage source={require("../../assets/Home/bg_img.png")}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#593BFB" }}
            >
              Apply For Verification
            </Text>
            <FontAwesome5
              name="check"
              type="Octicons"
              color="#593BFB"
              size={32}
            />
          </View>

          {/* user profile */}
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  marginTop: 30,
                  borderWidth: 5,
                  borderColor: "#593BFB",
                }}
                source={{ uri: user?.profile_Image }}
              />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 5,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  {user?.name}
                </Text>
                <FontAwesome5
                  name="verified"
                  type="MaterialIcons"
                  color="#267FFE"
                  size={32}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 80,
              width: "100%",
              alignItems: "center",
            }}
          >
            <InteractiveButton
              title="VERIFICATION"
              backcolor="#593BFB"
              onPress={() => navigation.navigate("verifyusercheckout")}
            />
          </View>
        </View>
      </BackgroundImage>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    top: 50,
  },
});

import Home from "../screens/Home/Home";
import Gigs from "../screens/Gigs/Gigs";
import More from "../screens/More/More";
import { Text, View } from "react-native";
import Creators from "../screens/Creator/Creator";
import React, { useState, useEffect } from "react";
import MyNetwork from "../screens/MyNetwork/MyNetwork";
import GigsListings from "../screens/Gigs/GigsListings";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreatorPosting from "../screens/CreatorsScreens/CreatorPosting";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BtabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const [usertype, setUserType] = useState("");

  const getData = async () => {
    try {
      const userTypeValue = await AsyncStorage.getItem("usertype");
      setUserType(JSON.parse(userTypeValue));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [usertype]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 50,
          position: "absolute",
          paddingHorizontal: 20,
          bottom: 10,
          left: 20,
          right: 20,
          height: 60,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.67,
          shadowRadius: 4.65,
          elevation: 6,
        },
        tabBarInactiveTintColor: "#005DFF",
        tabBarActiveTintColor: "#593BFB",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        style={{ paddingHorizontal: 30 }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color = "red", size }) => (
            <>
              <FontAwesome5 name="home" color={color} size={size} />
              <Text style={{ color: color }}>Home</Text>
            </>
          ),
          tabBarLabel: ({ focused }) => null,
        }}
      />
      {usertype === "user" && (
        <>
          <Tab.Screen
            name="Gigs"
            component={Gigs}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <>
                  <FontAwesome5
                    name="clipboard-list"
                    color={color}
                    size={size}
                  />
                  <Text style={{ color: color }}>Gigs</Text>
                </>
              ),
              tabBarLabel: ({ focused }) => null,
            }}
          />
          <Tab.Screen
            name="Creators"
            component={Creators}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#593BFB",
                    borderRadius: 50,
                    // width: 75,
                    padding: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.67,
                    shadowRadius: 0.65,
                    elevation: 6,
                    position: "relative",
                    bottom: 7,
                  }}
                >
                  <FontAwesome5 name="user-alt" color="#fff" size={20} />
                  <Text
                    style={{ color: "#fff", textAlign: "center", fontSize: 12 }}
                  >
                    Creators
                  </Text>
                </View>
              ),
              tabBarLabel: ({ focused }) => null,
            }}
          />
        </>
      )}
      {usertype === "creator" && (
        <>
          <Tab.Screen
            name="Jobs"
            component={GigsListings}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <>
                  <FontAwesome5 name="briefcase" color={color} size={size} />
                  <Text style={{ color: color }}>Job's</Text>
                </>
              ),
              tabBarLabel: ({ focused }) => null,
            }}
          />
          <Tab.Screen
            name="Create Posts"
            component={CreatorPosting}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#593BFB",
                    borderRadius: 50,
                    width: 62,
                    padding: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.67,
                    shadowRadius: 0.65,
                    elevation: 6,
                    position: "relative",
                    bottom: 7,
                  }}
                >
                  <FontAwesome5 name="window-restore" color="#fff" size={20} />
                  <Text
                    style={{ color: "#fff", textAlign: "center", fontSize: 12 }}
                  >
                    Posts
                  </Text>
                </View>
              ),
              tabBarLabel: ({ focused }) => null,
            }}
          />
        </>
      )}
      <Tab.Screen
        name="Network"
        component={MyNetwork}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <>
              <FontAwesome5 name="user-friends" color={color} size={size} />
              <Text style={{ color: color }}>Network</Text>
            </>
          ),
          tabBarLabel: ({ focused }) => null,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <>
              <FontAwesome5 name="th-list" color={color} size={size} />
              <Text style={{ color: color }}>More</Text>
            </>
          ),
          tabBarLabel: ({ focused }) => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default BtabNavigation;

import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";


const Videos = ({ navigation, posts }) => {
  const videoRef = useRef(null);

  const NavigateToProfileSingleContent = (post) => {
    navigation.navigate("SinglePost", { post });
  };

  return (
    <View>
      {posts?.length === 0 ? (
        <Text style={{ textAlign: "center", flex: 1 }}>
          No video post of this creator!
        </Text>
      ) : (
        posts
          ?.filter((post) => post.video)
          ?.map((post) => (
            <TouchableOpacity
              key={post._id}
              onPress={() => {
                NavigateToProfileSingleContent(post);
              }}
            >
              <View style={styles.Post_MAin}>
                <View style={styles.Post_data}>
                  <Video
                    ref={videoRef}
                    source={{ uri: post.video }}
                    style={styles.Post_video}
                    useNativeControls={false}
                    resizeMode="contain"
                    isLooping
                    shouldPlay
                    posterSource={{ uri: post.video }}
                  />
                  <View style={{ width: "100%" }}>
                    <Text style={styles.Post_Data_Text_Head}>{post.title}</Text>
                    <Text style={styles.Fotter_text_description}>
                      {post.description}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Post_MAin: {
    flexDirection: "row",
    // marginVertical:20,
    alignItems: "center",
    justifyContent: "center",
  },

  Post_data: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  Post_video: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  Post_Data_Text_Head: {
    color: "#5853FF",
    fontSize: 23,
    fontWeight: "600",
  },

  Fotter_text_description: {
    color: "black",
    fontSize: 17,
    marginTop: 8,
  },
});

export default Videos;

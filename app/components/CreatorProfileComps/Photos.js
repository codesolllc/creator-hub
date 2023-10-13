import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Photos = ({navigation, posts}) => {
  
  const NavigateToProfileSingleContent = (post) => {
    navigation.navigate("SinglePost", 
      {post}
    );
  }
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {posts?.length === 0 ? 
        <Text style={{textAlign: "center", flex: 1}}>No photo post of this creator!</Text>
       :

        posts?.filter(post => post.image)?.map((post) => (
          <TouchableOpacity
            key={post._id}
            style={styles.imageContainer}
            onPress={() => {NavigateToProfileSingleContent(post)}}
          >
            <Image source={{uri:post.image}} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
  },
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default Photos;
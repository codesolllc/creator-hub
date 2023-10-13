import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'


const Content = ({navigation, posts}) => {
  
  const NavigateToProfileSingleContent = (post) => {
    navigation.navigate("SinglePost", 
      {post}
    );
  }
  

  return (
    <View>
        {posts?.length === 0 ? 
        <Text style={{textAlign: "center", flex: 1}}>No content post of this creator!</Text>
       :
        posts?.filter(post => !post.image && !post.video)?.map((post) => (
      <TouchableOpacity 
      onPress={() =>
       {NavigateToProfileSingleContent(post)}} key={post._id}>
     <View style={styles.Post_MAin}>
        <View style={styles.Post_data}>
            <View style={styles.Foter_data_Of_post}>
            <Text style={styles.Post_Data_Text_Head}>{post.title}</Text>
            <Text style={styles.Fotter_text_description}>{post.description}</Text>
            </View>
        </View>
     </View>
     </TouchableOpacity>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Post_MAin: {
      flexDirection:"row",
      marginVertical:20,
      alignItems:"center",
      justifyContent: "center",
      },
 
  Post_data:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
     },
  Post_image: {
    width:"100%",
    borderRadius:10,
  },
  Post_Data_Text_Head: {
    color:"#5853FF",
    fontSize:23,
    fontWeight:"600",
  },
  Foter_data_Of_post:{
    marginTop:10,
    width:"100%",

  },
  Fotter_text_description:{
    color:"black",
    fontSize:17,
    marginTop:8,
  },


})

export default Content

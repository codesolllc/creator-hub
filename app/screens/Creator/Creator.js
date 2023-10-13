import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import UserPosts from '../../components/CreatorComps/UserPosts'

const Creator = ({navigation}) => {


  return (
    <>
    <View>
      <View style={styles.container}>
      <Text style={styles.Heading}>News Feed</Text>
      </View>
      <UserPosts navigation={navigation} />
    </View>
      </>
  )
}

const styles = StyleSheet.create({
  
  container: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#5853FF",
  },
  Heading:{
    fontSize:30,
    fontWeight:"500",
    marginTop:40,
    color: "#fff",
  },
});

export default Creator
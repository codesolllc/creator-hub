import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BookMarkedPost from '../../components/BookmarkedComps/BookMarkedPost'

const BookMarked = ({navigation}) => {

  return (
    <>
      <View style={styles.PrimaryContainer}>
      <Text style={styles.Heading}>Bookmarked Posts!</Text>
      </View>
      <View style={styles.Secondary_Container}>
      <BookMarkedPost navigation={navigation} />
    </View>
    
    </>
  )
}

const styles = StyleSheet.create({
    PrimaryContainer: {
        flex:0.1,
        alignItems:"center",
        zIndex: 10,
        paddingBottom:10,
      },
      Heading:{
        fontSize:30,
        fontWeight:"500",
        marginTop:50,
      },
      Secondary_Container:{
        flex:0.9,
      }
})

export default BookMarked
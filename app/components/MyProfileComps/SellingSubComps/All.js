import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import SingleProduct from '../../../screens/SingeProduct/SingleProduct';


const All = ({product, navigation, from}) => {

    const handleNavigation = (item)=>{
      if (from === "my_profile") {
      navigation.navigate('singleProduct', {singleProduct: item})
    }else{
      navigation.navigate('updateSingleProduct', {singleProduct: item})
      }
    }
 
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {product?.length === 0 ? 
        <Text style={{textAlign: "center", flex: 1}}>No selling product!</Text>
       :
          product?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              onPress={() => handleNavigation(item)}
            >
              <Image source={{ uri: item.featured_image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    imageContainer: {
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
      width: '45%', // Adjust the width as needed to fit two images per row
      aspectRatio: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
  });
  
  export default All;
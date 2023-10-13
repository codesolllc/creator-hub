import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const All = ({product, navigation}) => {


 
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {product?.length === 0 ?
          <View style={{flex:1}}>
          <Text style={{textAlign: "center"}}>NO PRODUCT</Text>
          </View>
          :
          product?.map((item, index) => (
            <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => navigation.navigate('updateSingleProduct', {singleProduct: item})}
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
      width: '45%', 
      aspectRatio: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
  });
  
  export default All;
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const TextButton = ({title, color, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{
        color: color,
        fontSize: 16,
        fontWeight: 'bold'
        }}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        marginHorizontal: 10,
    },


});


export default TextButton
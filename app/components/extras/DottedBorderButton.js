import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DottedBorderButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.buttonBorder} />
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.buttonBorder} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 5,
    borderRadius: 15,
    borderStyle: 'dotted',
    borderColor: 'black',
    width:"80%",
    height:100,
  },
  buttonBorder: {
   
  },
  buttonText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DottedBorderButton;

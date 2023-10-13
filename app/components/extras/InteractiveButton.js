import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const InteractiveButton = ({ onPress, title, backcolor }) => {
  return (
    <TouchableOpacity style={[styles.button , {backgroundColor:backcolor}]} onPress={onPress}>
      <Text style={styles.buttonText }>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 11,
    borderRadius: 19,
    alignItems: 'center',
    margin: 10,
    borderColor:"yellow",
    width:"80%",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InteractiveButton;

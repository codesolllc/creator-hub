import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const ReviewModal = ({ isVisible, onClose }) => {
    
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.main_Text_heading}>Give Review to this Creator!</Text>

          <TextInput style={styles.review_text_field} placeholder='Write your review here...' multiline={true} />
          
          <View style={styles.fotter}>

            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.Button_text_close}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.Button_text_close}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width:"90%",
  },
  review_text_field:{
    width:"100%"
  },
  fotter: {
    flexDirection: "row",
    width:"100%",
    justifyContent:"space-evenly",
    alignItems:"center",
    marginTop:10,
  },
  closeButton: {
    borderRadius:20,
    backgroundColor:"#f03e59",
    paddingHorizontal:30,
    paddingVertical:10,
  },
  submitButton: {
    borderRadius:20,
    backgroundColor:"#593BFB",
    paddingHorizontal:30,
    paddingVertical:10,
  },
  main_Text_heading:{
    color:"#593BFB",
    fontWeight:"500",
    fontSize:20,
    marginBottom:10,
  },
  Button_text_close:{
    color:"#fff",
    fontWeight:"600"
  },

});

export default ReviewModal;

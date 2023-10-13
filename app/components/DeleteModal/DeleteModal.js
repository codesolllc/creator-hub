import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

const DeleteModal = ({ isVisible, onClose, delFun }) => {
  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={onClose}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modal_title}>Are you sure to delete?</Text>

        <View style={styles.operation_btns}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#f03e59" }]}
            onPress={delFun}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#593BFB" }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  modal_title: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#5f5f61",
  },
  operation_btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 7,
    borderRadius: 19,
    alignItems: "center",
    margin: 10,
    borderColor: "yellow",
    width: "45%",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default DeleteModal;

import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import InteractiveButton from "../extras/InteractiveButton";
import { useUpdateGigMutation } from "../../Redux/Reducers/GigsReducer";

const UpdateGigModal = ({ isVisible, onClose, data, userId }) => {
  const [title, onChangeTitle] = useState(data?.title);
  const [desc, onChangeDesc] = useState(data?.description);
  const [price, onChangePrice] = useState(data?.price);
  const [pickedImage, setPickedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [updateGig] = useUpdateGigMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      setImageName("Unable to Upload Try Again!!");
    } else {
      setPickedImage(result.assets[0].uri);
      const resultSplit = result.assets[0].uri.split("/");
      const name = resultSplit[resultSplit.length - 1];
      setImageName(name);
    }
  };

  const handleUpdateGig = async () => {
    if (title && desc && price) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("price", price);
      if (pickedImage) {
        formData.append("image", pickedImage);
      }
      try {
        const res = await updateGig({
          authorID: userId,
          gigID: data?._id,
          data: formData,
        });
        if (!res.error) {
          alert("Update Gig Successfully!");
          onChangeTitle("");
          onChangeDesc("");
          onChangePrice("");
          setPickedImage(null);
          onClose();
        } else {
          alert("Failed to Upload Gig! Try Again");
        }
      } catch (error) {
        alert("API Failed! Try later");
      }
    } else {
      alert("All Fields Required");
    }
  };

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
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.modal_title}>Update Gig</Text>
        <View style={styles.checkout_form_container}>
          <ScrollView>
            <Text style={styles.input_lable}>Title</Text>
            <TextInput
              style={styles.input_field}
              value={title}
              onChangeText={onChangeTitle}
              maxLength={30}
            />
            <Text style={styles.input_lable}>Description</Text>
            <TextInput
              style={styles.input_field}
              value={desc}
              onChangeText={onChangeDesc}
              maxLength={100}
            />

            <Text style={styles.input_lable}>Price</Text>
            <TextInput
              style={styles.input_field}
              value={price?.toString()}
              onChangeText={onChangePrice}
              keyboardType="numeric"
              maxLength={20}
            />

            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.pick_image}>Pick Image</Text>
            </TouchableOpacity>
            <Text>{imageName}</Text>
          </ScrollView>
        </View>

        <View style={styles.cart_container}>
          <View style={styles.button_container}>
            <InteractiveButton
              title="Save Changes"
              backcolor="#593BFB"
              onPress={handleUpdateGig}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modal_title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#593BFB",
  },
  checkout_form_container: {
    marginTop: 40,
  },
  input_lable: {
    fontSize: 15,
    marginBottom: 10,
    color: "#5f5f61",
  },
  input_field: {
    fontSize: 17,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#5f5f61",
  },
  row_fields: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  pick_image: {
    width: "100%",
    height: 40,
    textAlign: "center",
    color: "#593BFB",
    borderRadius: 10,
    lineHeight: 40,
    marginTop: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#593BFB",
  },
});

export default UpdateGigModal;

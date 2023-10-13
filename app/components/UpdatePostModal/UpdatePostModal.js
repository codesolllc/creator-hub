import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import InteractiveButton from "../extras/InteractiveButton";
import * as ImagePicker from "expo-image-picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Video } from "expo-av";
import { useEditPostMutation } from "../../Redux/Reducers/PostReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdatePostModal = ({ isModalVisible, toggleModal, post }) => {
  const [pickedImage, setPickedImage] = useState(
    post.image === "" || post.image === undefined ? null : post.image
  );

  const [pickedVideo, setPickedVideo] = useState(
    post.video === undefined || post.video === "" ? null : post.video
  );

  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.description);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setPickedVideo(null);
    setPickedImagePath(null);
    if (result.canceled) {
      setPickedImage("Unable to Upload Try Again!!");
    } else {
      setPickedImage(result.assets[0].uri);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });
    setPickedImage(null);
    setPickedImagePath(null);
    if (!result.canceled) {
      setPickedVideo(result.assets[0].uri);
    }
  };

  const Remove_assets = () => {
    setPickedImage(null);
    setPickedVideo(null);
    setPickedImagePath(null);
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    setPickedImage(null);
    setPickedVideo(null);
    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
    }
  };

  const [editPost] = useEditPostMutation();

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userdata");
      if (userData) {
        try {
          const findUser = JSON.parse(userData);
          setUserId(findUser.findUser._id);
          setUserData(findUser.findUser);
        } catch (parseError) {
          console.log("Error parsing user data:", parseError);
        }
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.log("Unable to get user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handlePost = async () => {
    if (content && title) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", content);

        if (pickedImagePath && !pickedImage && !pickedVideo) {
          const imageUriParts = pickedImagePath.split(".");
          const imageType = imageUriParts[imageUriParts.length - 1];
          formData.append("image", {
            uri: pickedImagePath,
            name: `post_image.${imageType}`,
            type: `image/${imageType}`,
          });
        } else if (pickedImage && !pickedVideo && !pickedImagePath) {
          const imageUriParts = pickedImage.split(".");
          const imageType = imageUriParts[imageUriParts.length - 1];
          formData.append("image", {
            uri: pickedImage,
            name: `post_image.${imageType}`,
            type: `image/${imageType}`,
          });
        } else if (pickedImage && !pickedVideo && !pickedImagePath) {
          const imageUriParts = pickedImage.split(".");
          const imageType = imageUriParts[imageUriParts.length - 1];
          formData.append("image", {
            uri: pickedImage,
            name: `post_image.${imageType}`,
            type: `image/${imageType}`,
          });
        } else if (pickedVideo && !pickedImage && !pickedImagePath) {
          const videoUriParts = pickedVideo.split(".");
          const videoType = videoUriParts[videoUriParts.length - 1];
          formData.append("video", {
            uri: pickedVideo,
            name: `post_video.${videoType}`,
            type: `video/${videoType}`,
          });

        }

        const res = await editPost({
          _author_id: userId,
          Post_Id: post?._id,
          data: formData,
        });

        if (!res.error) {
          console.log("Upload post Success", res.data);
        } else {
          console.log("failed to upload");
        }
      } catch (error) {
        console.log("failed to upload catch error");
      }
    } else {
      alert("Content & Title Required at least");
    }

    toggleModal();
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.main_text_container}>
          <Text style={styles.text_main}>Post</Text>
          <TouchableOpacity
            style={styles.text_close_main}
            onPress={toggleModal}
          >
            <Text style={styles.text_close}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.profile_main_conatiner}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 0.5,
            }}
          >
            <Image
              style={styles.profile_image}
              source={require("../../assets/Auth/user_profile.png")}
            />
            <Text style={styles.Profile_name_text}>{userData?.name}</Text>
          </View>

          <View style={{ flex: 0.5, alignItems: "flex-end" }}>
            <InteractiveButton
              title="Update"
              backcolor="#593BFB"
              onPress={handlePost}
            />
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.text_input_conatainer}>
          <TextInput
            multiline={true}
            placeholderTextColor="gray"
            style={styles.Text_area_content}
            onChangeText={setTitle}
            value={title}
            placeholder="Write your post title..."
          />

          {pickedImage && pickedVideo === null ? (
            <Image
              source={
                pickImage === null ? { uri: post?.image } : { uri: pickedImage }
              }
              style={{ width: "100%", height: 200 }}
            />
          ) : pickedVideo && pickedImage === null ? (
            <Video
              source={{ uri: pickedVideo }}
              style={styles.Post_video}
              useNativeControls={true}
              resizeMode="contain"
              isLooping={true}
              posterSource={{ uri: pickedVideo }}
            />
          ) : pickedImagePath &&
            pickedVideo === null &&
            pickedImage === null ? (
            <Image
              source={{ uri: pickedImagePath }}
              style={{ width: "100%", height: 200 }}
            />
          ) : null}
          <View style={styles.divider} />
          <TextInput
            multiline={true}
            placeholderTextColor="gray"
            style={styles.Text_area_content}
            onChangeText={setContent}
            value={content}
            placeholder="Write your post content here...."
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.selections_Button_container}>
          <View style={styles.divider} />
          <TouchableOpacity onPress={openCamera}>
            <View style={styles.text_icon_container}>
              <FontAwesome5
                name="camera"
                type="font-awesome"
                color="#593BFB"
                size={30}
              />
              <Text style={styles.button_section_item_Text}>Take Photo</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.text_icon_container}>
              <FontAwesome5
                name="image"
                type="font-awesome"
                color="#593BFB"
                size={30}
              />
              <Text style={styles.button_section_item_Text}>Add Picture</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={pickVideo}>
            <View style={styles.text_icon_container}>
              <FontAwesome5
                name="video"
                type="font-awesome"
                color="#593BFB"
                size={30}
              />
              <Text style={styles.button_section_item_Text}>Add video</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={Remove_assets}>
            <View style={styles.text_icon_container}>
              <FontAwesome5
                name="times-circle"
                type="font-awesome"
                color="red"
                size={30}
              />
              <Text style={styles.button_section_item_Text}>
                Remove Video / Picture
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "white",
  },
  text_icon_container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  selections_Button_container: {
    marginTop: 50,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  button_section_item_Text: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  text_input_conatainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    minHeight: 200,
  },
  Text_area_content: {
    width: "100%",
    color: "black",
    fontSize: 18,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  profile_main_conatiner: {
    width: "100%",
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flexDirection: "row",
    alignItems: "center",
  },
  main_text_container: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    flexDirection: "row",
  },
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  Profile_name_text: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  text_main: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    width: "60%",
  },
  text_close: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
  text_close_main: {
    width: "30%",
    alignItems: "flex-end",
    marginRight: 20,
  },
  Post_video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
export default UpdatePostModal;

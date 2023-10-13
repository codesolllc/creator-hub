import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SearchModal from './HomeSearchSubComps/SearchModal';

const HomeSearch = ({navigation}) => {


  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
        <FontAwesome name="search" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleModal} style={styles.input}>
      <Text style={styles.Text_Search}>Search here...</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome name="map-marker" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome name="filter" size={30} color="black" />
      </TouchableOpacity>
    </View>
    <SearchModal isVisible={isModalVisible} onClose={toggleModal} navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 10,
    marginHorizontal:20,
    padding: 7
  },
  iconContainer: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 20,
    justifyContent:"center",
  },
  Text_Search:{
    fontSize:20,
  }
});

export default HomeSearch;

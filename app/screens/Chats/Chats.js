import React from 'react'
import { View, StyleSheet } from 'react-native'
import SearchBar from '../../components/Chat/SearchBar';
import ChatList from '../../components/Chat/ChatList';
import ChatHeader from '../../components/Chat/ChatHeader';

const Chats = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <ChatHeader navigation={navigation} />
      <SearchBar navigation={navigation} />
      <ChatList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Chats
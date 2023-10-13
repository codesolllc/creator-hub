import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ChatHeader = ({navigation}) => {
  
    const handleGoBack = () => {
        navigation.goBack();
      };

      const Notifications = () => {
        navigation.navigate('Notification')
      }

  return (
    <View style={styles.container}>
        <View style={styles.item_container}>
            <TouchableOpacity onPress={handleGoBack}>
                <FontAwesome5
                  name="arrow-left"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
                </TouchableOpacity>
           <Text style={styles.Chat_heading}>Chats</Text>
           <TouchableOpacity onPress={Notifications}>
                <FontAwesome5
                  name="globe"
                  type="font-awesome"
                  color="#333"
                  size={30}
                />
                 </TouchableOpacity>
        </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        padding:20,
    },
    item_container:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
    },
    Chat_heading:{
        fontWeight:"600",
        fontSize:20,
    },
})
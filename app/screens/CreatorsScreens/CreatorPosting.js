import { View, StyleSheet } from 'react-native'
import React from 'react'
import BackgroundImage from '../../components/extras/BackgroundImage';
import Postings from '../../components/postsComps/Postings';

import CreatorPostHeader from '../../components/CreatorsPostComps/CreatorPostHeader';



const CreatorPosting = ({navigation}) => {

  

  return (
    <>
    <BackgroundImage source={require('../../assets/wrapper/backgroundImage.png')}>
        <View style={styles.container}>
          <CreatorPostHeader navigation={navigation} />
          <Postings navigation={navigation} />
        </View>
          </BackgroundImage>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
      },
  });

export default CreatorPosting;
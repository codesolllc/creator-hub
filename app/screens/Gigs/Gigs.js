import { View, StyleSheet } from 'react-native';
import React from 'react';
import DottedBorderButton from '../../components/extras/DottedBorderButton';
import UserGigsList from '../../components/gigsUserComps/UserGigsList';
import GigsButtonNavigation from '../../components/gigsUserComps/GigsButtonNavigation';

const Gigs = ({ navigation }) => {

  const UploadGigScreen = () => {
    navigation.navigate("UploadGig");
  }

  return (
    <View>
      <View style={styles.Gigs_margin}>
      <UserGigsList navigation={navigation} />
      </View>
      
      <View style={styles.buttonContainer}>
      
      <View style={styles.Button_margin}>
        <GigsButtonNavigation navigation={navigation} />
        </View>
        
        <DottedBorderButton onPress={UploadGigScreen} title="Upload your Gig" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:100,
    alignItems: 'center',
  },
  Gigs_margin:{
    marginTop:300,
  },
  Button_margin:{
    marginBottom:30,
  },
});

export default Gigs;

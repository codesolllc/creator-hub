import { View, Text, useWindowDimensions, Image, StyleSheet } from 'react-native';
import React from 'react';

const Onboardingitem = ({ item }) => {
  const { width, height } = useWindowDimensions();

let AdjustedHeight = height -370;
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={item.image} style={[styles.image, { width, height:AdjustedHeight }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    height:  280,
  },
  image: {
    resizeMode: 'cover',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});

export default Onboardingitem;

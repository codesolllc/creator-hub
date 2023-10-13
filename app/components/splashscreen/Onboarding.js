import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, Dimensions } from 'react-native';
import slides from './splashesdata';
import Onboardingitem from './Onboardingitem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import InteractiveButton from "../extras/InteractiveButton";

const { width, height } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemschanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login');
    }
  };

  // const TestFuction = () => {
  //   navigation.navigate("Login");
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <Onboardingitem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemschanged}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        style={styles.flatlist}
      />
      <View style={styles.containerTop}>
        <Text style={styles.title}>Welcome To The</Text>
        <Text style={styles.titlelogo}>Creators Hub</Text>
        {/* <InteractiveButton onPress={TestFuction} title="testing" backcolor="red" /> */}
        <Text style={styles.description}>
          Our goal is to make your vision reality, on time and on budget
        </Text>
        <View style={styles.paginatorContainer}>
          <Paginator data={slides} scrollX={scrollX} />
        </View>
        <View style={styles.nextButtonContainer}>
          <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerTop: {
    position: 'absolute',
    height: height * 0.6,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: width * 0.3,
    borderTopRightRadius: width * 0.3,
    marginTop: height * 0.4,
  },
  flatlist: {
    height: height * 0.5, // Adjust the height of the FlatList to take 50% of the screen
  },
  title: {
    fontWeight: '700',
    fontSize: width * 0.08,
    marginTop: height * 0.05,
    color: 'black',
    textAlign: 'center',
  },
  titlelogo: {
    fontSize: width * 0.08,
    color: 'blue',
    textAlign: 'center',
  },
  description: {
    fontWeight: '400',
    color: 'black',
    fontSize: width * 0.05,
    textAlign: 'center',
    paddingHorizontal: width * 0.15,
    marginTop: height * 0.04,
  },
  paginatorContainer: {
    marginTop: height * 0.07, // Adjust the top margin of the Paginator container
  },
  nextButtonContainer: {
    marginTop: height * -0.03, // Adjust the top margin of the NextButton container
  },
});

export default Onboarding;

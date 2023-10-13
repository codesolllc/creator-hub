// import { View, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import Svg, { G, Circle } from 'react-native-svg';
// import { AntDesign } from '@expo/vector-icons';

// const NextButton = ({ percentage, scrollTo }) => {
//   const size = 128;
//   const strokeWidth = 2;
//   const center = size / 2;
//   const radius = size / 2 - strokeWidth / 2;
//   const circumference = 2 * Math.PI * radius;

//   const progressAnimation = useRef(new Animated.Value(0)).current;

//   const animation = (toValue) => {
//     return Animated.timing(progressAnimation, {
//       toValue,
//       duration: 250,
//       useNativeDriver: false, // Do not use native driver for SVG animations
//     }).start();
//   };

//   useEffect(() => {
//     animation(percentage);
//   }, [percentage]);

//   const strokeDashoffset = progressAnimation.interpolate({
//     inputRange: [0, 100],
//     outputRange: [circumference, 0],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={styles.container}>
//       <Svg width={size} height={size}>
//         <G rotation="-90" origin={center}>
//           <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
//           <AnimatedCircle
//             stroke="blue"
//             cx={center}
//             cy={center}
//             r={radius}
//             strokeWidth={strokeWidth}
//             strokeDasharray={circumference}
//             strokeDashoffset={strokeDashoffset}
//           />
//         </G>
//       </Svg>
//       <TouchableOpacity onPress={scrollTo} style={styles.button}>
//         <AntDesign name="arrowright" size={32} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   button: {
//     position: 'absolute',
//     backgroundColor: 'blue',
//     borderRadius: 100,
//     padding: 20,
//   },
// });

// export default NextButton;

// import React, { useRef, useState } from 'react';
// import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

// const AnimatedButton = ({onPress ,title}) => {

//   const scaleValue = useRef(new Animated.Value(1)).current;
//   const [isPressed, setIsPressed] = useState(false);

//   const handlePressIn = () => {
//     setIsPressed(true);
//     Animated.spring(scaleValue, {
//       toValue: 0.8,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     setIsPressed(false);
//     Animated.spring(scaleValue, {
//       toValue: 1,
//       friction: 3,
//       tension: 40,
//       useNativeDriver: true,
//     }).start();
//   };

//   const buttonStyle = {
//     transform: [{ scale: scaleValue }],
//     backgroundColor: isPressed ? '#5853FF' : '#3e78d6',
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//       onPress={onPress}
//     >
//       <Animated.View style={[styles.button, buttonStyle]}>
//         <Text style={styles.buttonText}>{title}</Text>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     width: 200,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//   },
// });

// export default AnimatedButton;

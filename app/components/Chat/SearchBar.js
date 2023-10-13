import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, TouchableOpacity, Keyboard, Dimensions, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.createRef();
  const { width: windowWidth } = Dimensions.get('window');
  const animatedWidth = new Animated.Value(windowWidth - 32);

  // const handleFocus = () => {
  //   setIsFocused(true);
  //   Animated.timing(animatedWidth, {
  //     toValue: windowWidth - 96, // Adjusted width when focused
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  //   Animated.timing(animatedWidth, {
  //     toValue: windowWidth - 32, // Adjusted width when blurred
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
  // };

  const handleClear = () => {
    inputRef.current.clear();
  };

  const handleContainerPress = () => {
    // Handle blur and close keyboard when tapping outside the search bar
    if (isFocused) {
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleContainerPress}>
      <View style={styles.searchBarContainer}>
        <Animated.View style={[styles.inputContainer, { width: animatedWidth }]}>
          <Icon name="search" size={32} color="black" style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            placeholder="Search"
            style={styles.searchInput}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
          />
          {isFocused && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Icon name="close" size={24} color="gray" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
  },
});

export default SearchBar;

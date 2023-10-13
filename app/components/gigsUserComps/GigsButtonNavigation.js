import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const GigsButtonNavigation = ({ navigation }) => {


    const navigationToBuy = () => {
        navigation.navigate("Buy")
    }
    const navigationToRental = () => {
        navigation.navigate("Rental")
    }
    const navigationToSell = () => {
        navigation.navigate("Sell")
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={navigationToBuy} style={styles.button}>
                <Text style={styles.buttonText}>Go to Marketplace</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={navigationToSell} style={styles.button}>
                <Text style={styles.buttonText}>Sell on Marketplace</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={navigationToRental} style={styles.button}>
                <Text style={styles.buttonText}>Rental</Text>
            </TouchableOpacity> */}
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:"center"
    },
    
    button: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        marginHorizontal: 10,
    },

    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center"
    },

});


export default GigsButtonNavigation
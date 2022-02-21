import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';

import AppLoading from 'expo-app-loading';
import {  
    useFonts,
    PlayfairDisplay_800ExtraBold,   
} from '@expo-google-fonts/playfair-display'
import { Cricket } from '../assets';
const Header = () => {
    let [fontsLoaded] = useFonts({PlayfairDisplay_800ExtraBold});
    if (!fontsLoaded) return <AppLoading />;
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>CricBuddy</Text>
            <Cricket height={50} width={50}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header : {
        backgroundColor : '#140e8a',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:60,
        marginTop:StatusBar.currentHeight,
        flexDirection : 'row'
    },
    headerText : {
        color: 'white',
        fontSize:30,
        justifyContent : 'center',
        fontFamily : 'PlayfairDisplay_800ExtraBold'
    }
});


export default Header;

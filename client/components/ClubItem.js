import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getClubById } from '../actions';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Ubuntu_400Regular,Ubuntu_500Medium
} from '@expo-google-fonts/ubuntu';

const ClubItem = ({id,navigation,setClubs}) => {

    const [club,setClub] = useState();

    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
        Ubuntu_500Medium
    });

    useEffect(async()=>{
        const data = await getClubById({id});
        setClub(data)
    },[id])
    const handleLeaveClub = async() => {

        const value = JSON.parse(await AsyncStorage.getItem('clubs'));
        const newValue = value.filter(item => item.id !== id);
        const jsonValue = JSON.stringify(newValue);
        await AsyncStorage.setItem('clubs', jsonValue);

        const newClubs =JSON.parse(await AsyncStorage.getItem('clubs'));
        setClubs(newClubs);
    }
    const handleLeaveAlert = () =>
    Alert.alert(
      "Leave Club",
      `Are you sure you want to leave ${club?.name} ? `,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => handleLeaveClub() }
      ]
    );

    if (!fontsLoaded) return <AppLoading />;
    return(
        <View style={styles.item}>
            <Text style={styles.text}>Club Name : {club?.name}</Text>
            <Text style={styles.text}>Club Nickname : {club?.nickname}</Text>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonEnter}>
                    <Button title="Enter the club" color="#6323b8" onPress={() => navigation.push('Club',  {id: id} )} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLeave}>
                    <Button title="Leave" color="#a80808" onPress={handleLeaveAlert} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    item : {
        backgroundColor : '#b7c0ed',
        margin:10,
        padding:10,
        borderRadius : 10,
        height : 120,
        width : '110%',
        justifyContent : 'center'
    },
    text : {
        fontFamily: 'Ubuntu_400Regular',
    },  
    buttonView : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    buttonEnter:{
        width:'50%',
        paddingTop : 10,
        // borderRadius : 10,
    },
    buttonLeave : {
        width:'30%',
        paddingTop : 10,
        // borderRadius : 10,
    }
})

export default ClubItem;

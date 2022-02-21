import React, { useEffect, useState } from 'react';
import { Button, Image , ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import JoinModal from '../components/JoinModal';
import ClubItem from '../components/ClubItem';
import { useIsFocused } from "@react-navigation/native";

import { Cricket } from '../assets';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Ubuntu_400Regular,Ubuntu_500Medium
} from '@expo-google-fonts/ubuntu';


const Home = ({navigation}) => {
    const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [clubs,setClubs] = useState();
    const isFocused = useIsFocused();

    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
        Ubuntu_500Medium
    });
    
    useEffect(async() => {
        const value =JSON.parse(await AsyncStorage.getItem('clubs'));
        setClubs(value);
    }, [joinModalVisible,isFocused]);
    
    if (!fontsLoaded) return <AppLoading />;

    return (
        <ScrollView style={styles.scrollView}>
            <Header/>
            
            <View style={styles.heroView}>
                <Image 
                    source={require('../assets/hero.jpg')}
                    style={styles.heroImage}
                />

            </View>
            <View style={styles.buttonView}>
                <JoinModal joinModalVisible={joinModalVisible} setJoinModalVisible={setJoinModalVisible} />
                <TouchableOpacity style={styles.button}>
                    <Button title="Join a Club" color="#364396" onPress={() => setJoinModalVisible(true)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Button title="Create a Club" color="#364396" onPress={() => navigation.push('CreateClub' )} />
                </TouchableOpacity>
            </View>
            <View style={styles.clubs}>
                <Text style={styles.clubText}>My Clubs</Text>
                <View>
                {
                    clubs?.map( item => <ClubItem key={item._id} id={item.id} navigation={navigation} setClubs={setClubs} /> )
                }
                {
                    clubs.length === 0 ? <Text style={styles.noClubs}>No clubs joined yet</Text> : null
                }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView : {
        backgroundColor : '#a9b0e8'
    },
    heroView : {
        marginBottom : 10,
    },
    heroImage :{
        height :300,
        width : '100%',
    },
    
    buttonView : {
        flexDirection:'row',
        justifyContent:'center'
    },  
    button:{
        width:'40%',
        margin:15,
    },
    clubs :{
        margin : 2,
        alignItems : 'center'
    },
    clubText : {
        fontFamily: 'Ubuntu_500Medium',
        marginLeft : 10,
        fontSize : 18
    },
    noClubs : {
        margin : 20,
        fontFamily: 'Ubuntu_400Regular',
        fontSize : 14
    }
});

export default Home;

import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { create , join } from '../actions';


const CreateClub = ({navigation}) => {
    const [name,setName]  = useState('');
    const [nickname,setNickname]  = useState('');
    const [password,setPassword]  = useState('');
    const [confirmPassword,setConfirmPassword]  = useState('');
    const [error,setError] = useState(false);
    const handleSubmit = async() => {
        if(name==="" || nickname==="" || password==="" || confirmPassword===""){
            Alert.alert("Error","Please fill all the fields",[{ text: "OK" }]);
            return;
        }
        if(password !== confirmPassword){
            Alert.alert("Error","Passwords don't match",[{ text: "OK" }]);
            return;
        }
        let data = await create({name,nickname,password,confirmPassword})
        
        if(!data){
            setError(true);
        }
        else{
            setError(false);
            let value = JSON.parse(await AsyncStorage.getItem('clubs'));
            value.push({id : data?._id});
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('clubs', jsonValue);
            navigation.navigate('Home');
        }    
    }
    return (
        <View style={styles.createClub}>

            <View style={styles.inputView}>
                <Text style={styles.text}>Club Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text=> setName(text)}
                    value={name}
                    placeholder="Club Name"
                    placeholderTextColor='white'
                />
            </View>
            
            <View style={styles.inputView}>
                <Text style={styles.text}>Club Nickname</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text=> setNickname(text)}
                    value={nickname}
                    placeholder="Nickname"
                    placeholderTextColor='white'
                />
            </View>
            
            <View style={styles.inputView}>
                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text=> setPassword(text)}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor='white'
                />
            </View>
            
            <View style={styles.inputView}>
                <Text style={styles.text}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text=> setConfirmPassword(text)}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor='white'
                />
            </View>
            
            <View style={styles.inputView}>
                {error ? <Text style={styles.error}>!!! Nickname already exists</Text> : null}
            </View>

            <TouchableOpacity style={styles.button}>
                <Button title="Create" color="#123456" onPress={handleSubmit} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    createClub : {
        justifyContent:'center',
        alignItems:'center',
    },  
    inputView :{
        width:'75%',
        marginTop:20,
    },
    text : {
        marginHorizontal : 5,
    },  
    input : {
        backgroundColor:'#081b96',
        color: 'white',
        alignItems:'center',
        height:40,
        padding:10,
        paddingHorizontal : 20,
        borderColor:'black',
        borderWidth:1,
        borderRadius : 20,
        marginVertical : 5,
    },
    error : {
        marginHorizontal : 5,
        color : 'red',
    },
    button:{
        margin:20,
        width:100,
    }
});

export default CreateClub;

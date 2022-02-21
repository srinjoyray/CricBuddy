import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View , Modal, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { join } from '../actions';

const JoinModal = ({joinModalVisible,setJoinModalVisible}) => {
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [error , setError] = useState('');
    
    const handleSubmit = async() => {

        const data = await join({nickname,password});
        // console.log(data);
        if(!data){
            setError('Invalid Credentials');
        }
        else{
            let value = JSON.parse(await AsyncStorage.getItem('clubs'));
            
            if(!value){
                value = [{id: data?._id }]
            }else{
                if(value.filter(item => item.id === data?._id).length === 0){
                    value.push({id : data?._id});
                }
            }
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('clubs', jsonValue)
            setError('');
            setNickname('');
            setPassword('');
            setJoinModalVisible(!joinModalVisible);
        }         
    }
    const handleClose = () => {
        setError('');
        setNickname('');
        setPassword('');
        setJoinModalVisible(!joinModalVisible);
    }

    return (
        <View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={joinModalVisible}
            onRequestClose={() => {
                setJoinModalVisible(!joinModalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputView}>
                            <Text>Club Nickname</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text=> setNickname(text)}
                                value={nickname}
                                placeholder="Nickname"
                                />
                        </View>
                        <View style={styles.inputView}>
                            <Text>Password</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text=> setPassword(text)}
                                value={password}
                                placeholder="Password"
                                secureTextEntry={true}
                                />
                        </View>
                    </View>
                    
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.button}>
                            <Button
                                title="Close"
                                onPress={handleClose}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Button
                                title="Submit"
                                onPress={handleSubmit}
                            />
                        </TouchableOpacity>
                    </View>

                    {error.length > 0 ? 
                        <View style={styles.error}>
                            <Text>{error}</Text>
                        </View>
                    :
                        <View></View>
                    }
                </View>
            </View>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputGroup : {
        flexDirection : 'row',
        margin : 10
    }, 
    inputView :{
        width:120,
        margin:5,
    },
    input : {
        backgroundColor:'cyan',
        alignItems:'center',
        height:40,
        padding:10,
        borderColor:'black',
        borderWidth:1
    },
    buttonGroup : {
        flexDirection : 'row',
    },  
    button:{
        margin:10,
        width:100,
    }
});

export default JoinModal;

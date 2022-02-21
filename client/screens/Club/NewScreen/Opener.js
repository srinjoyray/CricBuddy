import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { addOpeners, getPlayers } from '../../../actions';
import PlayerDropdown from '../../../components/PlayerDropdown';

const Opener = ({id,navigation,route}) => {
    const [striker , setStriker] = useState('');
    const [nonStriker , setNonStriker] = useState('');
    const [bowler , setBowler] = useState('');
    const [players, setPlayers] = useState('');

    useEffect(async()=>{
        const data = await getPlayers({id});
        setPlayers(data);

    },[]);

    const handleContinue = async() =>{
        if(typeof(striker) === 'string' || typeof(bowler) === 'string' || typeof(nonStriker) === 'string' ){
            Alert.alert(
                "Error","Please fill all the fields",[{ text: "OK" }]
            );
            return;
        }
        if(striker?._id === nonStriker?._id || striker?._id === bowler?._id || nonStriker?._id === bowler?._id){
            Alert.alert(
                "Error","Please choose different players",[{ text: "OK" }]
            );
            return;
        }
        await addOpeners({id , batsmanName1 : striker.name , batsmanId1 : striker._id , batsmanName2 : nonStriker.name , batsmanId2 : nonStriker._id , bowlerName : bowler.name , bowlerId : bowler._id});
        navigation.navigate('match', {bat1 : striker , bat2 : nonStriker , bowl : bowler});
    }

    return (
        <View style={styles.opener} >
            
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Striker</Text>
                <PlayerDropdown setPlayer={setStriker} items={players} />
               
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Non Striker</Text>
                <PlayerDropdown setPlayer={setNonStriker} items={players} />

            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Bowler</Text>
                <PlayerDropdown setPlayer={setBowler} items={players} />

            </View>

            <View style={styles.group}>
                <TouchableOpacity style={styles.button}>
                    <Button title="Continue" color="#123456" onPress={handleContinue} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Opener;

const styles = StyleSheet.create({
    opener : {
        margin : 15,
    },
    group : {
        margin : 10,
    },  
    groupTitle : {
        fontSize : 16,
        color: 'green',
    },
    input : {
        alignItems:'center',
        height:40,
        borderColor:'black',
        borderBottomWidth : 1,
        paddingBottom : 0,
        marginBottom : 0,
        fontSize : 12
    },
    button:{
        width:150,        
    }
})

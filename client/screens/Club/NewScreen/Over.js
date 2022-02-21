import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getPlayers, newOver } from '../../../actions';
import PlayerDropdown from '../../../components/PlayerDropdown';

const Over = ({id,route,navigation}) => {
    const {bowler,setBowler,batsmanList} = route.params
    const [players, setPlayers] = useState('');
  
    const [newBowler, setNewBowler] = useState('');
    useEffect(async()=>{
        const data = await getPlayers({id});
        setPlayers(data);
    },[]);
    const handleContinue = async() => {
        if(typeof(newBowler)==='string'){
            Alert.alert(
                "Error","Please fill all the fields",[{ text: "OK" }]
            );
            return;
        }
        // console.log(batsmanList);
        // console.log(newBowler,bowler?.name);
        let isCorrect = true;
        if(bowler?._id === newBowler?._id){
            isCorrect = false;
        }
        batsmanList?.map(item => {
            if(item?.batsmanId === newBowler?._id) isCorrect = false;
        })
        
        if(!isCorrect){
            Alert.alert(
                "Error","Please choose a different player",[{ text: "OK" }]
            );
        }
        else{
            setBowler(newBowler);
            await newOver({id, bowlerName : newBowler.name, bowlerId : newBowler._id });
            navigation.pop();
        }

    }
    return (
        <View style={styles.over}>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>New Bowler</Text>
                <PlayerDropdown setPlayer={setNewBowler} items={players} />
            </View>
            <View style={styles.group}>
                <TouchableOpacity style={styles.button}>
                    <Button title="Continue" color="#123456" onPress={handleContinue} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Over;

const styles = StyleSheet.create({
    over : {
        margin : 15,
    },
    group : {
        margin : 10,
    },  
    groupTitle : {
        fontSize : 16,
        color: 'green',
    },
    
    button:{
        width:150,        
    }
})
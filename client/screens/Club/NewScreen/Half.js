import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLive } from '../../../actions';

const Half = ({id,navigation}) => {
    const [live,setLive] = useState('');
    const [team1,setTeam1] = useState('');
    const [team2,setTeam2] = useState('');
    useEffect(async()=>{
        const data = await getLive({id});
        setLive(data);
        
        if(live?.batFirst === "home"){
            setTeam1(live?.homeTeam);
            setTeam2(live?.awayTeam);
        }
        else{
            setTeam1(live?.awayTeam);
            setTeam2(live?.homeTeam);
        }
    },[live]);
    
    const handleContinue = () => {
        navigation.navigate('opener');
    }

    return (
        <View style={styles.half}>
            <View style={styles.group}>
                <Text style={styles.text}>Innings Break</Text>
            </View>
            <View style={styles.group}>
                <Text style={styles.text}>{team1} scored {live?.firstInnings?.runs}/{live?.firstInnings?.wickets}</Text>
            </View>
            <View style={styles.group}>
                <Text style={styles.text}>{team2} require {live?.firstInnings?.runs+1} runs in {live?.overs*6} balls</Text>
                <Text style={styles.text}>Required run rate : {live?.overs ? (live?.firstInnings?.runs+1)/(live?.overs).toFixed(2) : 0}</Text>
            </View>
            <View style={styles.group}>
                <TouchableOpacity style={styles.button}>
                    <Button title="Continue" color="#123456"  onPress={handleContinue} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Half;
const styles = StyleSheet.create({
    half : {
        margin : 10,
        marginTop : '30%',
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'flex-end',
        alignContent : 'center'
    },
    group : {
        margin : 10,
    }, 
    text : {
        textAlign : 'center'
    },
    button:{
        width:150,        
    }
})
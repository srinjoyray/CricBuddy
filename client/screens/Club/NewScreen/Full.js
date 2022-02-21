import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLive, saveMatch } from '../../../actions';

const Full = ({id,navigation}) => {
    const [live,setLive] = useState('');

    useEffect(async()=>{
        const data = await getLive({id});
        setLive(data);

    },[]);

    const handleContinue = async() => {
        await saveMatch({id});
        navigation.navigate('start');
    }

    return (
        <View style={styles.full}>
            
            <View style={styles.group}>
                    <Text>{live?.batFirst==="home"? live?.homeTeam : live?.awayTeam}</Text>
                    <Text>{live?.firstInnings?.runs}/{live?.firstInnings?.wickets}({Math.floor(live?.firstInnings?.balls/6)}.{live?.firstInnings?.balls%6})</Text>
            </View>
            <View style={styles.group}>
                    <Text>{live?.batFirst==="away"? live?.homeTeam : live?.awayTeam}</Text>
                    <Text>{live?.secondInnings?.runs}/{live?.secondInnings?.wickets}({Math.floor(live?.secondInnings?.balls/6)}.{live?.secondInnings?.balls%6})</Text>
            </View>

            <View style={styles.group}>
                {   
                    live?.winner === "tied" ? 
                    <Text>Match Tied</Text>
                    :
                    live?.winner === "home" ? 
                    <Text> {live?.homeTeam} won the macth</Text>
                    :
                    <Text> {live?.awayTeam} won the macth</Text>
                }
            </View>
            
            <View style={styles.group}>
                <TouchableOpacity style={styles.button}>
                    <Button title="Continue" color="#123456"  onPress={handleContinue} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Full;

const styles = StyleSheet.create({
    full : {
        margin : 10,
        backgroundColor : 'white',
        padding : 5,
        marginTop : 100,
    },
    group : {
        margin : 5,
        alignItems : 'center',
    },
    
})
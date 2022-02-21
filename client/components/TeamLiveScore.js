import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getLive } from '../actions';

const TeamLiveScore = ({id,data}) => {
    const [live,setLive] = useState('');
    const [innings,setInnings] = useState('');
    const [teamName ,setTeamName] = useState('');
    useEffect(async() => {
        setLive(data);
      
        if(!live.isFirstInningsComplete)setInnings(live.firstInnings)
        else setInnings(live.secondInnings)
       
        let name=true;
        if(live?.toss==='away')name=!name;
        if(live?.optedFor==='ball')name=!name;
        if(live?.isFirstInningsComplete)name=!name;
        
        if(name)setTeamName(live?.homeTeam);
        else setTeamName(live?.awayTeam);

    },[{data}])
    return (
        <View style={styles.view}>
            <View style={styles.column}>
                    <View style={styles.left}>
                        <Text style={styles.name}>{teamName}</Text>
                        <View style={styles.score}>
                            <Text style={styles.runs}>{innings?.runs}-{innings?.wickets}</Text> 
                            <Text style={styles.balls}>({Math.floor(innings?.balls/6)}.{innings?.balls%6})</Text>
                        </View>
                    </View>
                    
                    {
                        !live?.isFirstInningsComplete ? 
                            <View style={styles.right}>
                                <View style={styles.crr}> 
                                    <Text style={styles.rightText}>CRR</Text>
                                    <Text style={styles.rightText}>{((innings?.runs*6)/Math.max(innings?.balls,1)).toFixed(2)}</Text>
                                </View>
                                <View style={styles.projected}>
                                    <Text style={styles.rightText}>Projected</Text>
                                    <Text style={styles.rightText}>{Math.round((innings?.runs*6*live?.overs)/(Math.max(innings?.balls,1)))}</Text>
                                </View>
                            </View>
                        :
                            <View style={styles.right}>
                                <View style={styles.crr}> 
                                    <Text style={styles.rightText}>CRR</Text>
                                    <Text style={styles.rightText}>{((innings?.runs*6)/Math.max(innings?.balls,1)).toFixed(2)}</Text>
                                </View>
                                <View style={styles.rrr}> 
                                    <Text style={styles.rightText}>RRR</Text>
                                    <Text style={styles.rightText}>{(((live?.firstInnings?.runs-innings?.runs+1)*6)/Math.max((live?.overs*6-innings?.balls),1)).toFixed(2)}</Text>
                                </View>
                            </View>
                    }
            </View>
                {
                    live?.isFirstInningsComplete && 
                    <View>
                        <Text>{live?.firstInnings?.runs-innings?.runs+1} required of {live?.overs*6-innings?.balls} balls</Text>
                    </View>
                }
        </View>
    );
};

export default TeamLiveScore;

const styles = StyleSheet.create({
    view : {
        backgroundColor : 'white',
        padding : 5,
        paddingHorizontal : 20,
    },
    column : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    left : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    name : {
        fontSize : 14,
    },  
    score: {
        flexDirection : 'row',
        alignItems : 'center'
    },
    runs: {
        fontSize : 26,
        fontWeight : 'bold'
    },
    balls : {
        fontSize : 18,
        marginLeft : 5,
    },
    right : {
        flexDirection:'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 10,
    },
    crr: {
        marginHorizontal : 10,
        fontSize : 14,
        alignItems : 'center',
    },
    projected :{
        marginHorizontal : 10,
        marginLeft : 20,
        alignItems : 'center',
    },
    rrr :{
        marginHorizontal : 10,
        marginLeft : 20,
        alignItems : 'center',
    },
    rightText : {
        fontSize : 13
    }
})
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getBatsmanLive, getBowlerLive } from '../actions';

const PlayerLiveScore = ({id,data,batsman1,batsman2,bowl,strike}) => {
    const [live,setLive] = useState('');
    const [striker , setStriker] = useState('');
    const [nonStriker , setNonStriker] = useState('');
    const [bowler , setBowler] = useState('');
    useEffect(async()=> {
        setLive(data);
        let response = await getBowlerLive({id , playerId : bowl?._id});
        setBowler(response);

        response = await getBatsmanLive({id,playerId : strike ? batsman1?._id : batsman2?._id});
        setStriker(response); 

        response = await getBatsmanLive({id,playerId : strike ? batsman2?._id : batsman1?._id});
        setNonStriker(response);

    },[data,batsman1,batsman2,bowl,strike]);
    // console.log(striker,bowler);
    return (
        <View style={styles.view}>
            <View style={styles.group}>
                <Text style={styles.nameGroup}>Batsman</Text>
                <Text style={styles.statsGroup}>R</Text>
                <Text style={styles.statsGroup}>B</Text>
                <Text style={styles.statsGroup}>4s</Text>
                <Text style={styles.statsGroup}>6s</Text>
                <Text style={[styles.statsGroup,styles.decimal]}>SR</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.group}>
                <Text style={styles.nameGroup}>{strike ? batsman1?.name : batsman2?.name}*</Text>
                <Text style={styles.statsGroup}>{striker?.runs}</Text>
                <Text style={styles.statsGroup}>{striker?.balls}</Text>
                <Text style={styles.statsGroup}>{striker?.four}</Text>
                <Text style={styles.statsGroup}>{striker?.six}</Text>
                <Text style={[styles.statsGroup,styles.decimal]}>{striker?.sr ? (striker?.sr).toFixed(2) : 0}</Text>
            </View>
            <View style={styles.group}>
                <Text style={styles.nameGroup}>{strike ? batsman2?.name : batsman1?.name}</Text>
                <Text style={styles.statsGroup}>{nonStriker?.runs}</Text>
                <Text style={styles.statsGroup}>{nonStriker?.balls}</Text>
                <Text style={styles.statsGroup}>{nonStriker?.four}</Text>
                <Text style={styles.statsGroup}>{nonStriker?.six}</Text>
                <Text style={[styles.statsGroup,styles.decimal]}>{nonStriker?.sr ? (nonStriker?.sr).toFixed(2) : 0}</Text>
            </View>
            <View style={styles.gap} />
            <View style={styles.group}>
                <Text style={styles.nameGroup}>Bowler</Text>
                <Text style={styles.statsGroup}>O</Text>
                <Text style={styles.statsGroup}>M</Text>
                <Text style={styles.statsGroup}>R</Text>
                <Text style={styles.statsGroup}>W</Text>
                <Text style={[styles.statsGroup,styles.decimal]}>Econ</Text>
            </View>
            <View style={styles.line} />
            
            <View style={styles.group}>
                <Text style={styles.nameGroup}>{bowl?.name}</Text>
                <Text style={styles.statsGroup}>{Math.floor(bowler?.balls/6)}.{bowler?.balls%6}</Text>
                <Text style={styles.statsGroup}>{bowler?.maidens}</Text>
                <Text style={styles.statsGroup}>{bowler?.runs}</Text>
                <Text style={styles.statsGroup}>{bowler?.wickets}</Text>
                <Text style={[styles.statsGroup,styles.decimal]}>{bowler?.economy ? (bowler?.economy).toFixed(2) : 0}</Text>
            </View>
        </View>
    );
};

export default PlayerLiveScore;

const styles = StyleSheet.create({
    view : {
        backgroundColor : 'white',
        marginTop : 10,
        padding : 5,
        paddingHorizontal : 20,
    },
    group : {
        flexDirection : 'row',
        marginVertical : 2
        // justifyContent : 'space-around'
    },
    line : {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        marginVertical : 2,
    },
    gap : {
        marginVertical : 5
    },
    nameGroup : {
        flex : 3,
    },
    statsGroup : {
        flex:2,
        textAlign : 'right'
    },
    decimal : {
        marginLeft : 10
    }
})
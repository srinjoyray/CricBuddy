import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native'
import { addBall, getLive, getPlayers, wicket } from '../../../actions';
import PlayerDropdown from '../../../components/PlayerDropdown';
import WicketDropdown from '../../../components/WicketDropdown';

const Wicket = ({id,route,navigation}) => {
    const {newBall,batsman1,batsman2,setBatsman1,setBatsman2,strike,batsmanList,bowlerList,bowler,setBowler,setBallDetails} = route.params ;
    // console.log(batsman1);
    // console.log(bowlerList,batsmanList);
    const isFocused = useIsFocused()

    const [type,setType]  = useState('');
    const [live,setLive] = useState('');
    const [players, setPlayers] = useState('');
    const [newBatsman, setNewBatsman] = useState('');
    const [allOut,setAllOut] = useState(false);

    useEffect(async()=>{
        let data = await getPlayers({id});
        setPlayers(data);
        data = await getLive({id});
        setLive(data);
    },[isFocused]);
    const handleContinue = async() =>{ 
        if(type==='' || (typeof(newBatsman)==='string' && !allOut)){
            Alert.alert(
                "Error","Please fill all the fields",[{ text: "OK" }]
                );
                return;
        }
        newBall.wicket = type;
        if(allOut)newBall.isAllOut = true;

        let isCorrect = true;
        if(batsman1?._id === newBatsman?._id || batsman2?._id === newBatsman?._id ){
            isCorrect = false;
        }
        batsmanList?.map(item => {
            if(item?.batsmanId === newBatsman?._id) isCorrect = false;
        })
        bowlerList?.map(item => {
            if(item?.bowlerId === newBatsman?._id) isCorrect = false;
        })

        if(!isCorrect){
            Alert.alert(
                "Error","Please choose a different player",[{ text: "OK" }]
            );
        }
        else{
            if((type==="runOutNonStriker" && strike) || (type!=="runOutNonStriker" && !strike)){
                await wicket({ id,outBatsmanId : batsman2._id, batsmanName : newBatsman.name, batsmanId : newBatsman._id })
                setBatsman2(newBatsman);
            }
            else{
                await wicket({ id,outBatsmanId : batsman1._id, batsmanName : newBatsman.name, batsmanId : newBatsman._id })
                setBatsman1(newBatsman);
            }
            if(allOut){ 
                await addBall(newBall);
                // console.log(live.isFirstInningsComplete);
                if(!live.isFirstInningsComplete)navigation.navigate('half');
                else navigation.navigate('full');
                return;
            }
            await addBall(newBall);

            let data = await getLive({id});
            setLive(data);

             // Over
            if(!live?.isFirstInningsComplete){
                if(live?.firstInnings?.balls % 6 == 0 && live?.firstInnings?.balls && live?.firstInnings?.balls!==live?.overs*6 && !live?.firstInnings?.overChange){
                    navigation.push('over' , {bowler , setBowler,batsmanList});
                }
            }else{
                if(live?.secondInnings?.balls % 6 == 0 && live?.secondInnings?.balls && live?.secondInnings?.balls!==live?.overs*6 && !live?.secondInnings?.overChange){
                    navigation.push('over', {bowler , setBowler,batsmanList});
                }
            }
            setBallDetails(prev => prev + 1);
            navigation.pop();
        }
    }

    return (
        <View style={styles.wicket}>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Mode of Dismissal</Text>
                <WicketDropdown setType={setType}/>
            </View>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>New Batsman</Text>
                <PlayerDropdown setPlayer={setNewBatsman} items={players} />
            </View>
            <View style={styles.group}>
                <CheckBox
                    containerStyle={styles.check}
                    textStyle={styles.checkText}
                    size={15}
                    title="All Out"
                    checked={allOut}
                    onPress={() => setAllOut(!allOut)}
                />
            </View>
            <View style={styles.group}>
                <TouchableOpacity style={styles.button}>
                    <Button title="Continue" color="#123456" onPress={handleContinue} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Wicket;

const styles = StyleSheet.create({
    wicket : {
        margin : 15,
    },
    group : {
        margin : 10,
    },  
    groupTitle : {
        fontSize : 16,
        color: 'green',
    },
    check : {
        height : 35,
        width : 100,
        paddingHorizontal : 0,
        paddingVertical : 5,
        paddingLeft : 3,
        margin : 0,
        marginVertical : 5,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
    },  
    checkText : {
        padding : 0,
        fontSize:10,
    },
    button:{
        width:150,        
    }
})
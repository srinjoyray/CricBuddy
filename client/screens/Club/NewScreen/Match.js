import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native'
import { addBall, getLive } from '../../../actions';
import PlayerLiveScore from '../../../components/PlayerLiveScore';
import TeamLiveScore from '../../../components/TeamLiveScore';

export const Match = ({id,navigation,route}) => {
    const isFocused = useIsFocused()
    const {bat1,bat2,bowl} = route.params ;

    const [live,setLive] = useState('');
    const [innings,setInnings] = useState('');

    const [batsmanList,setBatsmanList] = useState([]);
    const [bowlerList,setBowlerList] = useState([]);
    const [batsman1 , setBatsman1] = useState('');
    const [batsman2 , setBatsman2] = useState('');
    const [bowler , setBowler] = useState('');

    const [strike,setStrike] = useState(true);
    const [wicket , setWicket] = useState(false);
    const [extra , setExtra] = useState("none");
    const [ballDetails , setBallDetails] = useState(0);
    const swapBatsman = () => setStrike(!strike);
    const handleExtra = (val) => {
        if(extra === val) setExtra("none");
        else setExtra(val);
    }
    
    
    useEffect(async() => {

        const data = await getLive({id});
        setLive(data);
        // console.log(data);
        setBatsman1(bat1);
        setBatsman2(bat2);
        setBowler(bowl);
                
        if(!data.isFirstInningsComplete)setInnings(data.firstInnings)
        else setInnings(data.secondInnings)

        setBatsmanList(innings.batsmanList);
        setBowlerList(innings.bowlerList);
    },[]);
    
    useEffect(async()=>{
        const data = await getLive({id});
        setLive(data);
        
        if(data?.isMatchComplete){
            navigation.navigate('full');
        }

        setLive(data);
    },[isFocused])

    useEffect(async()=>{
        const data = await getLive({id});
        setLive(data);

        //Over
        if(!data?.isFirstInningsComplete){
            if(data?.firstInnings?.balls % 6 == 0 && data?.firstInnings?.balls && data?.firstInnings?.balls!==live?.overs*6 && !data?.firstInnings?.overChange){
                navigation.push('over' , {bowler , setBowler,batsmanList});
            }
        }else{
            if(data?.secondInnings?.balls % 6 == 0 && data?.secondInnings?.balls && data?.secondInnings?.balls!==live?.overs*6 && !data?.secondInnings?.overChange){
                navigation.push('over', {bowler , setBowler,batsmanList});
            }
        }
    },[ballDetails])

    const handleBall = async(runs) => {
        
        let newBall = {bowlerName : bowler?.name , bowlerId : bowler?._id , batsmanName : strike ? batsman1?.name : batsman2?.name  , batsmanId : strike ? batsman1?._id : batsman2?._id  , runs , type : extra , wicket : "none" , id , isAllOut : false}
        // console.log(newBall);

        setWicket(false);
        setExtra("none");
        
        let data = await getLive({id});
        setLive(data);

        

        if(wicket){
            await navigation.push('wicket',{newBall,batsman1,batsman2,setBatsman1,setBatsman2,strike,batsmanList,bowlerList,setBallDetails});
            return;
        }
        else{
            await addBall(newBall);
        }

        data = await getLive({id});
        setLive(data);

        // Swap Batsman
        if(!data?.isFirstInningsComplete){
            if(data?.firstInnings?.balls % 6 == 0 && !data?.firstInnings?.overChange){
                if(runs%2==0)swapBatsman();
            }
            else if(runs%2==1)swapBatsman();
        }else{
            if(data?.secondInnings?.balls % 6 == 0 && !data?.secondInnings?.overChange){
                if(runs%2==0)swapBatsman();
            }
            else if(runs%2==1)swapBatsman();
        }
        
        setBallDetails(prev => prev+1);

        // End of innings 
        
        if(data?.isFirstInningsComplete && data?.secondInnings?.balls === 0){
            navigation.navigate('half');
        }
        
        if(data?.isMatchComplete){
            navigation.navigate('full');
        }

    }

    return (
        <View style={styles.match}>
            <TeamLiveScore id={id} data={live} />
            <PlayerLiveScore id={id} data={live} batsman1={batsman1} batsman2={batsman2} bowl={bowler} strike={strike} />
            <View style={styles.addOn}>
                <View style={styles.extra}>
                    <CheckBox
                        containerStyle={styles.check}
                        textStyle={styles.checkText}
                        size={15}
                        title="Wide"
                        checked={extra==="wide"}
                        onPress={() => handleExtra("wide")}
                    />
                    <CheckBox
                        containerStyle={styles.check}
                        textStyle={styles.checkText}
                        size={15}
                        title="No Ball"
                        checked={extra==="no"}
                        onPress={() => handleExtra("no")}
                    />
                    <CheckBox
                        containerStyle={styles.check}
                        textStyle={styles.checkText}
                        size={15}
                        title="Bye"
                        checked={extra==="bye"}
                        onPress={() => handleExtra("bye")}
                    />
                    <CheckBox
                        containerStyle={styles.check}
                        textStyle={styles.checkText}
                        size={15}
                        title="Leg Bye"
                        checked={extra==="lb"}
                        onPress={() => handleExtra("lb")}
                    />
                </View>
                <View style={styles.wicket}>
                    <CheckBox
                        containerStyle={styles.check}
                        textStyle={styles.checkText}
                        size={15}
                        title="Wicket"
                        checked={wicket}
                        onPress={() => setWicket(!wicket)}
                    />
                    
                    <TouchableOpacity style={styles.button}>
                        <Button title="Swap Batsman" color="#123456" onPress={swapBatsman} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.runsView}>
                <Text style={styles.runs} onPress={()=>handleBall(0)}>0</Text>
                <Text style={styles.runs} onPress={()=>handleBall(1)}>1</Text>
                <Text style={styles.runs} onPress={()=>handleBall(2)}>2</Text>
                <Text style={styles.runs} onPress={()=>handleBall(3)}>3</Text>
                <Text style={styles.runs} onPress={()=>handleBall(4)}>4</Text>
                <Text style={styles.runs} onPress={()=>handleBall(5)}>5</Text>
                <Text style={styles.runs} onPress={()=>handleBall(6)}>6</Text>
                <TouchableOpacity style={[styles.button,styles.undo]}>
                    <Button title="Undo" color="#123456" onPress={swapBatsman} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    match : {
        margin : 10,
    },  
    addOn : {
        marginVertical : 10,
        backgroundColor : 'white' , 
    },  
    extra : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    }, 
    check : {
        height : 35,
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
    wicket : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },  
    button : {
        height : 35,
        padding : 0,
        marginRight : 5,
    },  
    runsView : {
        flexDirection : 'row',
        backgroundColor : 'white',
        padding : 5,
        display: 'flex' ,
        flexDirection : 'row',
        flexWrap : 'wrap',
    },
    runs : {
        backgroundColor : 'bisque',
        padding : 10 ,        
        paddingTop : 15,
        margin : 5,
        borderRadius : 50,
        width : 50,
        height : 50,
        textAlign : 'center',
        borderWidth : 2,
        borderColor : '#123456',
    },
    undo : {
        padding : 10 ,        
        margin : 5,
        marginLeft : 100,
        height : 60,
    }

})
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native'
import { deleteMatch, getClubById, startMatch } from '../../../actions';

const StartMatch = ({id,navigation}) => {
    const [club,setClub] = useState('');
    const [homeTeam , setHomeTeam] = useState("");
    const [awayTeam , setAwayTeam] = useState("");
    const [tossChecked, setTossChecked] = useState('home');
    const [optionChecked , setOptionChecked ] = useState('bat');
    const [overs, setOvers] = useState("");

    const isFocused = useIsFocused()

    useEffect(async()=>{
        setHomeTeam("");
        setAwayTeam("");
        setTossChecked('home');
        setOptionChecked('bat');
        setOvers("");
        const data = await getClubById({id});
        setClub(data);
    },[isFocused]);
    
    const handleStart = async() => {

        await startMatch({id, homeTeam : homeTeam , awayTeam : awayTeam ,toss : tossChecked,optedFor : optionChecked, overs : parseInt(overs)});
        navigation.navigate("opener");
    }

    const handleDelete = async() =>{
        await deleteMatch({id});
        const data = await getClubById({id});
        setClub(data);
    }
    const handleAlert = () => {
        Alert.alert(
            "Delete Match",
            "Are you sure you want to delete the match ?",
            [
              { text: "Cancel", style: "cancel"} ,
              { text: "OK", onPress: () => handleDelete() }
            ]
        );
    }
    return (
        
        <View>
            {
                !club?.isLive ? 
                <ScrollView>
                    <View style={styles.group}>
                        <Text style={styles.groupTitle}>Teams</Text>
                        <View style={[styles.teams,styles.groupItem]}>
                            <TextInput 
                                style={styles.input}
                                onChangeText={text=> setHomeTeam(text)}
                                value={homeTeam}
                                placeholder="Home Team"
                            />
                            <TextInput 
                                style={styles.input}
                                onChangeText={text=> setAwayTeam(text)}
                                value={awayTeam}
                                placeholder="Away Team"
                            />
                        </View>
                    </View>

                    <View style={styles.group}>
                        <Text style={styles.groupTitle}>Toss won by</Text>
                        <View style={[styles.groupItem,styles.toss]}>
                        <CheckBox
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxText}
                            title={homeTeam.length ? homeTeam : "Home Team"}
                            checked={tossChecked === "home"}
                            onPress={() => setTossChecked("home")}
                        />
                        <CheckBox
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxText}
                            title={awayTeam.length ? awayTeam : "Away Team"}
                            checked={tossChecked === "away"}
                            onPress={() => setTossChecked("away")}
                        />
                        </View>
                    </View>

                    <View style={styles.group}>
                        <Text style={styles.groupTitle}>Opted to</Text>
                        <View style={[styles.groupItem , styles.option]}>
                        <CheckBox
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxText}
                            title= "Bat"
                            checked={optionChecked === "bat"}
                            onPress={() => setOptionChecked("bat")}
                        />
                        <CheckBox
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxText}
                            title="Ball"
                            checked={optionChecked === "ball"}
                            onPress={() => setOptionChecked("ball")}
                        />
                        </View>
                    </View>

                    <View style={styles.group}>
                        <Text style={styles.groupTitle}>Overs</Text>
                        <View style={[styles.groupItem ]}>
                            <TextInput
                                style={styles.input}
                                onChangeText={text=> setOvers(text)}
                                value={overs.toString()}
                                placeholder="10"
                                keyboardType='numeric'
                            />
                        </View>
                    </View>

                    <View style={styles.group}>
                        <TouchableOpacity style={styles.button}>
                            <Button title="Start Match" color="#123456" onPress={handleStart} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                :
                <View style={styles.underway}>
                    <Text style={styles.underwayText}>Match Underway</Text>
                    <TouchableOpacity style={styles.button}>
                        <Button title="Delete Match" color="#123456" onPress={handleAlert} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default StartMatch;

const styles = StyleSheet.create({
    group : {
        margin : 15,
    },
    groupTitle : {
        fontSize : 16,
        color: 'green',
    },
    groupItem : {
        backgroundColor : 'white',
        borderRadius : 10,
        padding : 5,
        marginTop : 5,
        paddingBottom : 10
    },
    input : {
        alignItems:'center',
        height:40,
        borderColor:'black',
        borderBottomWidth : 1,
    },  
    toss : {
        flexDirection : 'row',
    },  
    option : {
        flexDirection : 'row',
    },  
    checkbox : {
        backgroundColor : 'white',
    },
    checkboxText : {
        fontSize : 12,
        fontWeight : 'normal',
    },
    button:{
        width:150,        
    },
    underway : {
        height : '100%',
        display :'flex',    
        justifyContent : 'center',
        alignItems : 'center',
    },
    underwayText :{
        fontSize : 18,
        margin : 10
    }
})
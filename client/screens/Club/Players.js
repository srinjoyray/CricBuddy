import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { addPlayer, deletePlayer, getPlayers } from '../../actions';



export const Players = ({id}) => {
    const [players,setPlayers] = useState('');
    const [newPlayer , setNewPlayer] = useState('');

    
    useEffect(async()=>{
        const data = await getPlayers({id});
        setPlayers(data);
    },[]);

    const handleAddPlayer = async() => {
        if(!newPlayer.length)return;
        await addPlayer({id,name : newPlayer});
        const data = await getPlayers({id});
        setPlayers(data);
        setNewPlayer('');
    }

    const handleDeletePlayer = async({playerId}) => {
        // console.log(playerId);
        await deletePlayer({id,playerId});
        const data = await getPlayers({id});
        setPlayers(data);
    }

    

    const deleteAlert = (item) =>
    Alert.alert(
      "Delete Player",
      `Are you sure you want to delete ${item?.name} ? `,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDeletePlayer({playerId : item?._id}) }
      ]
    );

   
    
    

    const displayPlayer = (item) =>{
        return(
            <View style={styles.displayPlayer} key={item._id}>
                <Text style={styles.name}>{item?.name}</Text>
                        
                <TouchableOpacity style={styles.icon} onPress={()=> deleteAlert(item)}>
                    <AntDesign name="delete" size={18} color="red" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={styles.playersView}>
            <View style={styles.addPlayer}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=> setNewPlayer(text)}
                    value={newPlayer}
                    placeholder="Add a player"
                />
                <TouchableOpacity style={styles.button}> 
                    <Button title="Add" onPress={handleAddPlayer} />
                </TouchableOpacity>
            </View>

            <View style={styles.playerList}>
                <Text style={styles.title}>Player List</Text>
                <Text style={styles.total}>No of players : {players?.length}</Text>
                    
                <View>
                    {
                        players?.length>0 && 
                        players?.map(item => displayPlayer(item))
                    }
                </View>
            
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    playersView : {
        margin : 10,

    },  
    addPlayer : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        height : 50,
        // borderColor : 'black',
        // borderWidth : 2,
    },
    input : {
        backgroundColor:'cyan',
        width : 250,
        height : '100%',
        borderColor:'black',
        borderWidth:1,
        textAlign : 'center',
        borderRadius: 20,
    } ,
    button : {
        width:'20%',
        height : '100%',
        marginLeft : 10,
        justifyContent : 'center',
    },
    playerList : {
        alignItems:'center',
        marginTop : 15,
    },
    title : {
        fontSize : 22,
        margin : 5,
        fontWeight : 'bold',
    },
    total : {
        fontSize : 14,
        marginBottom : 5,
    },
    displayPlayer : {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : 'space-evenly' ,
        width : '80%',
        height : 40,
        backgroundColor : '#65fccf',
        marginTop : 5,
        borderRadius : 15
    },
    name : {
        fontSize : 16,
        color : '#016963',
        width : 150,
    },
    icon : {
        marginHorizontal : 5,
        justifyContent : 'center',
        alignItems:'center',
        padding:2
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height : 100,

        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
})

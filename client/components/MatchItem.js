import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MatchItem = ({match}) => {
  
    return (
    <View style={styles.match}>
        <View style={styles.innings}>
            <Text>{match?.batFirst==="home" ? match?.homeTeam : match?.awayTeam}</Text>
            <View style={styles.score}>
                <Text style={styles.scoreText}>{match?.firstInnings?.runs}/{match?.firstInnings?.wickets}</Text>
                <Text style={styles.scoreText}>({Math.floor(match?.firstInnings?.balls/6)}.{match?.firstInnings?.balls%6})</Text>
            </View>
        </View>
        <View style={styles.innings}>
            <Text>{match?.batFirst==="away" ? match?.homeTeam : match?.awayTeam}</Text>
            <View style={styles.score}>
                <Text style={styles.scoreText}>{match?.secondInnings?.runs}/{match?.secondInnings?.wickets}</Text>
                <Text style={styles.scoreText}>({Math.floor(match?.secondInnings?.balls/6)}.{match?.secondInnings?.balls%6})</Text>
            </View>
        </View>
        <View style={styles.results}>
            { match?.winner === "tied" && <Text>Match Tied </Text> }
            {match?.winner === "home" && <Text>{match?.homeTeam} won the match</Text>}
            {match?.winner === "away" && <Text>{match?.awayTeam} won the match</Text>}
        </View>
    </View>
  )
}

export default MatchItem

const styles = StyleSheet.create({
    match : {
        backgroundColor : 'white' ,
        borderRadius : 20, 
        marginVertical : 10, 
        marginHorizontal : 10 ,
        padding : 20 ,
    } , 
    innings : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginVertical : 5,
    } , 
    score : {
        flexDirection : 'row'
    } , 
    scoreText : {
        marginHorizontal : 2
    },
    results : {
        marginVertical : 5,
        flexDirection : 'row' ,
        justifyContent :'center',
    },

})
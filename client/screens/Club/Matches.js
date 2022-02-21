import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMatches } from '../../actions';
import MatchItem from '../../components/MatchItem';

const Matches = ({id}) => {
    const [matches,setMatches] = useState('')
    useEffect(async()=>{
        const data = await getMatches({id});
        setMatches(data);
        
    },[]);
    return (
        <View style={styles.matches}>
            {
                matches && matches?.length>0 ? 
                    matches?.map(match => <MatchItem key={match?._id} match={match} />)
                :
                    <Text>No matches to show</Text>
            }    
        </View>
    );
};

export default Matches;

const styles = StyleSheet.create({
    matches : {
        margin : 10,
    }
})
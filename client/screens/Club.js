import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Matches from './Club/Matches';
import Statistics from './Club/Statistics';
import { Players } from './Club/Players';
import NewScreen from './Club/NewScreen';

const Tab = createBottomTabNavigator();

const Club = ({route}) => {
    const { id } = route.params;
    // console.log(id);
    return (
        <Tab.Navigator>
            <Tab.Screen name="New" options={{headerShown:false , tabBarIcon : () => <Ionicons name="add-circle" size={24} color="black" /> }}>
                { props => <NewScreen {...props} id={id} /> }
            </Tab.Screen>
            
            <Tab.Screen name="Players" options={{headerShown:false, tabBarIcon : () => <Ionicons name="people" size={24} color="black" />}}>
            { props => <Players {...props} id={id} /> }
            </Tab.Screen>

            <Tab.Screen name="Matches" options={{headerShown:false, tabBarIcon : () => <MaterialIcons name="sports-cricket" size={24} color="black" />}}>
                { props => <Matches {...props} id={id} /> }
            </Tab.Screen>

            <Tab.Screen name="Statistics" options={{headerShown:false , tabBarIcon : () => <Ionicons name="stats-chart" size={24} color="black" /> }}>
                { props => <Statistics {...props} id={id} /> }
            </Tab.Screen>

        </Tab.Navigator>
    );
};

export default Club;

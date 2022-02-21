import React from 'react'
import { Animated, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';
import BatsmanStatistics from './Statistics/BatsmanStatistics';
import BowlerStatistics from './Statistics/BowlerStatistics';

const Tab = createMaterialTopTabNavigator();
const Statistics = ({id}) => {
  const {width,height} = Dimensions.get('window')

  return (
    <NavigationContainer independent={true}>
     <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let label;
          label = route.name ; 
            return <Animated.Text >{label}</Animated.Text>
        },
        tabBarActiveTintColor: '#d40786',
        tabBarInactiveTintColor: 'grey',
        tabBarShowIcon:false,
        tabBarShowLabel:true,
        tabBarIndicatorStyle: {
           width: 0, height: 0, elevation: 0,      
        },
        tabBarItemStyle: { width: width*0.5,borderRightWidth:1,borderColor:'#95a69c' },
        tabBarStyle: { backgroundColor:'#d5e6dc',borderColor:'black' },
        
      })}
      
     >
       <Tab.Screen name="Batsman" >
          {props => <BatsmanStatistics {...props} id={id} /> }
       </Tab.Screen>
       <Tab.Screen name="Bowler">
         {props => <BowlerStatistics {...props} id={id} /> }
       </Tab.Screen>
     </Tab.Navigator>
   </NavigationContainer>
  )
}

export default Statistics
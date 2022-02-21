import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartMatch from './NewScreen/StartMatch';
import { Match } from './NewScreen/Match';
import Opener from './NewScreen/Opener';
import Wicket from './NewScreen/Wicket';
import Over from './NewScreen/Over';
import Half from './NewScreen/Half';
import Full from './NewScreen/Full';

const Stack = createNativeStackNavigator();

const NewScreen = ({id}) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="start" options={{headerShown:false}} >
                    { props => <StartMatch {...props} id={id} /> }
                </Stack.Screen>
                <Stack.Screen name="match" options={{headerShown:false}} >
                    { props => <Match {...props} id={id} /> }
                </Stack.Screen>
                <Stack.Screen name="opener" options={{headerShown:false}} >
                    { props => <Opener {...props} id={id} /> }
                </Stack.Screen>
                <Stack.Screen name="wicket" options={{headerShown:false}} >
                    { props => <Wicket {...props} id={id} /> }
                </Stack.Screen>
                <Stack.Screen name="over" options={{headerShown:false}} >
                    { props => <Over {...props} id={id} /> }
                </Stack.Screen>
                <Stack.Screen name="half" options={{headerShown:false}} >
                    { props => <Half {...props} id={id} /> }
                </Stack.Screen>
                <Stack.Screen name="full" options={{headerShown:false}} >
                    { props => <Full {...props} id={id} /> }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NewScreen;

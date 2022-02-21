import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import CreateClub from './screens/CreateClub';
import Club from './screens/Club';
const Stack = createNativeStackNavigator();

export default function App() {
  return (    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="CreateClub" component={CreateClub} />
        <Stack.Screen name="Club" component={Club}   />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}



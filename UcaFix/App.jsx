import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {MainScreen} from './screens/index'; // Adjust the path as needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main Screen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


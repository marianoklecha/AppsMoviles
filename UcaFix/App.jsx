import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MainScreen, InputClassroomScreen } from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="InputClassroomScreen" component={InputClassroomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


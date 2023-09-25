import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MainScreen, InputClassroomScreen,PedidosResueltos,LoginScreen,AdminOUser,PaginaInicio } from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name="AdminOUser" component={AdminOUser} options={{headerShown : false}}/>
        <Stack.Screen name="PaginaInicio" component={PaginaInicio} options={{headerShown : false}}/>

        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown : false}}/>
        <Stack.Screen name="InputClassroomScreen" component={InputClassroomScreen} options={{headerShown : false}}/>
        <Stack.Screen name="PedidosResultos" component={PedidosResueltos} options={{headerShown : false}}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MainScreen, InputClassroomScreen,LoginScreen,AdminOUser,PaginaInicio, FinalizarArreglo,ListaPedidos,QRlector } from './screens';



const Stack = createStackNavigator();

const App = () => {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ?
        <>
          <Stack.Screen name="PaginaInicio" options={{headerShown : false}}>
            {props => <PaginaInicio {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="MainScreen" options={{headerShown : false}}>
            {props => <MainScreen {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="InputClassroomScreen" options={{headerShown : false}}>
            {props => <InputClassroomScreen {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="PedidosResultos" options={{headerShown : false}}>
            {props => <PedidosResultos {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="FinalizarArreglo" options={{headerShown : false}}>
            {props => <FinalizarArreglo {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="ListaPedidos" options={{headerShown : false}}>
            {props => <ListaPedidos {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="QRlector" options={{headerShown : false}}>
            {props => <QRlector {...props} userId={loggedInUser}/>}
          </Stack.Screen>
        </>
        :
        <>
          <Stack.Screen name="LoginScreen" options={{headerShown : false}}>
            {props => <LoginScreen {...props} loginFn={setLoggedInUser}/>}
          </Stack.Screen>
        </>
        }

      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;


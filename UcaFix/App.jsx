import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MainScreen, InputClassroomScreen,LoginScreen,AdminOUser,QRpageAdmin,QRpageUser,HistorialDePedidos,ElegirEdificio,PaginaInicio, FinalizarArreglo,ListaPedidos, MainTabNavigator, UserProfile,PedidosResueltos,AdminProfile,AdminTabNavigator,MapaPedidos,InsertarPedido,AulaQR,EspacioComunQR,Camara,Escaner } from './screens';
import { PedidosPorAula } from './screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestMultiple,requestNotifications,PERMISSIONS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging'

messaging().getToken().then(t=>console.log(t))

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Mensaje en background:", remoteMessage)
})

requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then((statuses)=>{
  console.log('notifs permissions:',statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
})
const Tab= createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  console.log("### APP ###")
  console.log(loggedInUser)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ?
        <>
        {
          /*Acá conditionalRendering de si es admin o usuario*/

          /* esadmin? TabNavigatorAdmin*/
          /* => Adentro de este Tab poner una pantalla de StackNavigator
           con todo lo del admin y otra solita para el perfil*/

          /* sino: TabNavigatorUsuaeio */
          /* => Adentro de este Tab poner una pantalla de StackNavigator
          con todo lo del usuario y otra solita  para el perfil*/

        } 
          <Stack.Screen name="PaginaInicio" options={{headerShown : false}}>
            {props => <PaginaInicio {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="PedidosPorAula" options={{headerShown : false}}>
            {props => <PedidosPorAula {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="MainTabNavigator" options={{headerShown : false}}>
            {props => <MainTabNavigator {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="MainScreen" options={{headerShown : false}}>
            {props => <MainScreen {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="AdminTabNavigator" options={{headerShown : false}}>
            {props => <AdminTabNavigator {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="PisosEdificio" options={{headerShown : false}}>
            {props => <PisosEdificio {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="QRpageAdmin" options={{headerShown : false}}>
            {props => <QRpageAdmin {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="MapaPedidos" options={{headerShown : false}}>
            {props => <MapaPedidos {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="ElegirEdificio" options={{headerShown : false}}>
            {props => <ElegirEdificio {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="AdminProfile" options={{headerShown : false}}>
            {props => <AdminProfile {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="UserProfile" options={{headerShown : false}}>
            {props => <UserProfile {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="InputClassroomScreen" options={{headerShown : false}}>
            {props => <InputClassroomScreen {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="QRpageUser" options={{headerShown : false}}>
            {props => <QRpageUser {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="PedidosResueltos" options={{headerShown : false}}>
            {props => <PedidosResueltos {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="FinalizarArreglo" options={{headerShown : false}}>
            {props => <FinalizarArreglo {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="ListaPedidos" options={{headerShown : false}}>
            {props => <ListaPedidos {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="InsertarPedido" options={{headerShown : false}}>
            {props => <InsertarPedido {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="AulaQR" options={{headerShown : false}}>
            {props => <AulaQR {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="EspacioComunQR" options={{headerShown : false}}>
            {props => <EspacioComunQR {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="Camara" options={{headerShown : false}}>
            {props => <Camara {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="Escaner" options={{headerShown : false}}>
            {props => <Escaner {...props} userId={loggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="HistorialDePedidos" options={{headerShown : false}}>
            {props => <HistorialDePedidos {...props} userId={loggedInUser}/>}
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


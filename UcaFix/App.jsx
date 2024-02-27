import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MainScreen, InputClassroomScreen,LoginScreen,AdminOUser,QRpageAdmin,QRpageUser,HistorialDePedidos,ElegirEdificio,PaginaInicio, FinalizarArreglo,ListaPedidos, MainTabNavigator, UserProfile,PedidosResueltos,AdminProfile,AdminTabNavigator,MapaPedidos,InsertarPedido,AulaQR,EspacioComunQR,Camara,Escaner,PedidoFillWithQR } from './screens';
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
  React.useEffect(() => {
    const subscription = messaging().onMessage(async remoteMessage => {
      Alert.alert("Llego una notif", remoteMessage.notification.body)
    })
    return subscription
  })
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ?
        <>
        {
          loggedInUser.isAdmin ? 
          <>
            <Stack.Screen name="AdminTabNavigator" options={{headerShown : false}}>
              {props => <AdminTabNavigator {...props} userData={loggedInUser}/>}
            </Stack.Screen>
           <Stack.Screen name="PaginaInicio" options={{headerShown : false}}>
            {props => <PaginaInicio {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="PedidosPorAula" options={{headerShown : false}}>
              {props => <PedidosPorAula {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="QRpageAdmin" options={{headerShown : false}}>
              {props => <QRpageAdmin {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="MapaPedidos" options={{headerShown : false}}>
              {props => <MapaPedidos {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="AdminProfile" options={{headerShown : false}}>
              {props => <AdminProfile {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="PedidosResueltos" options={{headerShown : false}}>
              {props => <PedidosResueltos {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="FinalizarArreglo" options={{headerShown : false}}>
              {props => <FinalizarArreglo {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="ListaPedidos" options={{headerShown : false}}>
              {props => <ListaPedidos {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="HistorialDePedidos" options={{headerShown : false}}>
              {props => <HistorialDePedidos {...props} userData={loggedInUser}/>}
            </Stack.Screen>
          </>
          : 
          <>
            <Stack.Screen name="MainTabNavigator" options={{headerShown : false}}>
              {props => <MainTabNavigator {...props} userData={loggedInUser} route={props.route}/>}
            </Stack.Screen>
            <Stack.Screen name="MainScreen" options={{headerShown : false}}>
              {props => <MainScreen {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="UserProfile" options={{headerShown : false}}>
              {props => <UserProfile {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="InputClassroomScreen" options={{headerShown : false}}>
              {props => <InputClassroomScreen {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="QRpageUser" options={{headerShown : false}}>
              {props => <QRpageUser {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="Camara" options={{headerShown : false}}>
              {props => <Camara {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="Escaner" options={{headerShown : false}}>
              {props => <Escaner {...props} userData={loggedInUser}/>}
            </Stack.Screen>
            <Stack.Screen name="PedidoFillWithQR" options={{headerShown : false}}>
              {props => <PedidoFillWithQR {...props} userId={loggedInUser}/>}
            </Stack.Screen>
          </>
        } 
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


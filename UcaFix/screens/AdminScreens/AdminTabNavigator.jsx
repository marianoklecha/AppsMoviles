import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaginaInicio } from './PaginaInicio';
import { ListaPedidos } from './ListaPedidos';
import { AdminProfile } from './AdminProfile';
import { FinalizarArreglo } from './FinalizarArreglo';
import { MapaPedidos } from './MapaPedidos';
import { PisosEdificio } from './PisosEdificio';
import { QRpageAdmin } from './QRpageAdmin';
import { EstadisticasAula } from './EstadisticasAula';
import { HistorialDePedidos } from './HistorialDePedidos';
import { PedidosPorAula } from './PedidosPorAula';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav({ route }){
  const { userData } = route.params;

  return(
    <Stack.Navigator>
      <Stack.Screen name='PaginaInicio' component={PaginaInicio} options={{ headerShown: false }} 
      initialParams={{ userData }}/>
        <Stack.Screen name='ListaPedidos' component={ListaPedidos} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='AdminProfile' component={AdminProfile} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='FinalizarArreglo' component={FinalizarArreglo} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='MapaPedidos' component={MapaPedidos} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='PisosEdificio' component={PisosEdificio} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='QRpageAdmin' component={QRpageAdmin} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='HistorialDePedidos' component={HistorialDePedidos} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        <Stack.Screen name='PedidosPorAula' component={PedidosPorAula} options={{ headerShown: false }} 
        initialParams={{ userData }}/>
        
    </Stack.Navigator>
  );
}

function MyProfileTabNav({ route }){
  const { userData } = route.params;

  return(
    <Stack.Navigator>
      <Stack.Screen name="AdminProfile" component={AdminProfile} initialParams={{ userData }} options={{ headerShown: false }}/>
      <Stack.Screen name='PaginaInicio' component={PaginaInicio} initialParams={{ userData }} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function EstadisticaTabAula({ route }){
  const { userData } = route.params;
  
  return(
    <Stack.Navigator>
      <Stack.Screen name="EstadisticasAulas" component={EstadisticasAula} initialParams={{ userData }} options={{ headerShown: false }}/>
      <Stack.Screen name='PaginaInicio' component={PaginaInicio} initialParams={{ userData }} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export const AdminTabNavigator = (props) => {
  console.log("### AdminTab ###")
  const propsUserData = props.userData;
  console.log(propsUserData)
  return (
    
    <Tab.Navigator>
      <Tab.Screen name='Menu' component={TabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/home-page.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),}} initialParams={{ userData: propsUserData }}/>
      <Tab.Screen name="Perfil" component={MyProfileTabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/gender-neutral-user--v1.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ), }} initialParams={{ userData: propsUserData }}/>
      <Tab.Screen name="Estadisticas" component={EstadisticaTabAula} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <Image
          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuklEQVR4nO2TuwoCMRBFT6siPlB8YSF+3Db6hYJgI+Kj0ELRQvRLIoErhBBZs4tY7F4YCLOTc4bAQpnIGNXPYgotaANJXkFFFYIfdHeeVVAFFsAKqDv9FrDTvRswyiKoAUvn+1ZbW/hevWsa/JOgAazVfwIPnS34pPMZ6KfBQ4ImsFHPgqfAWNu+Zy/A4Bu4L3Df9g5MnLkecIyF+4LE2XAYmO0A3Ri4L7CZadti/MkFE5ic9T9BGfy8ANGeZ/uoTTYPAAAAAElFTkSuQmCC' }}
          style={{ width: size, height: size, tintColor: color }}
        />
      ), }} initialParams={{ userData: propsUserData }}/>
    </Tab.Navigator>
  );
}

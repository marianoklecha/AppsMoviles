import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaginaInicio } from './PaginaInicio';
import { ListaPedidos } from './ListaPedidos';
import { AdminProfile } from './AdminProfile';
import { FinalizarArreglo } from './FinalizarArreglo';
import { MapaPedidos } from './MapaPedidos';
import { ElegirEdificio } from './ElegirEdificio';
import { PisosEdificio } from './PisosEdificio';
import { QRpageAdmin } from './QRpageAdmin';
import { EstadisticasAula } from './EstadisticasAula';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabNav(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='PaginaInicio' component={PaginaInicio} options={{ headerShown: false }}/>
        <Stack.Screen name='ListaPedidos' component={ListaPedidos} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminProfile' component={AdminProfile} options={{ headerShown: false }}/>
        <Stack.Screen name='FinalizarArreglo' component={FinalizarArreglo} options={{ headerShown: false }}/>
        <Stack.Screen name='MapaPedidos' component={MapaPedidos} options={{ headerShown: false }}/>
        <Stack.Screen name='PisosEdificio' component={PisosEdificio} options={{ headerShown: false }}/>
        <Stack.Screen name='ElegirEdificio' component={ElegirEdificio} options={{ headerShown: false }}/>
        <Stack.Screen name='QRpageAdmin' component={QRpageAdmin} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyProfileTabNav(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="AdminProfile" component={AdminProfile} options={{ headerShown: false }}/>
      <Stack.Screen name='PaginaInicio' component={PaginaInicio} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
function EstadisticaTabAula(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="EstadisticasAulas" component={EstadisticasAula} options={{ headerShown: false }}/>
      <Stack.Screen name='PaginaInicio' component={PaginaInicio} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export const AdminTabNavigator = (props) => {
  return (
    
    <Tab.Navigator>
      <Tab.Screen name='Menu' component={TabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/home-page.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),}}/>
      <Tab.Screen name="Perfil" component={MyProfileTabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/gender-neutral-user--v1.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ), }}/>
      <Tab.Screen name="Estadisticas" component={EstadisticaTabAula} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <Image
          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuklEQVR4nO2TuwoCMRBFT6siPlB8YSF+3Db6hYJgI+Kj0ELRQvRLIoErhBBZs4tY7F4YCLOTc4bAQpnIGNXPYgotaANJXkFFFYIfdHeeVVAFFsAKqDv9FrDTvRswyiKoAUvn+1ZbW/hevWsa/JOgAazVfwIPnS34pPMZ6KfBQ4ImsFHPgqfAWNu+Zy/A4Bu4L3Df9g5MnLkecIyF+4LE2XAYmO0A3Ri4L7CZadti/MkFE5ic9T9BGfy8ANGeZ/uoTTYPAAAAAElFTkSuQmCC' }}
          style={{ width: size, height: size, tintColor: color }}
        />
      ), }}/>
    </Tab.Navigator>
  );
}

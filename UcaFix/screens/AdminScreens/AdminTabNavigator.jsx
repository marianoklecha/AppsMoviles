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
        <Stack.Screen name='ElegirEdificio' component={ElegirEdificio} options={{ headerShown: false }}/>

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
    </Tab.Navigator>
  );
}

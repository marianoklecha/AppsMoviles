import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen } from './MainScreen';
import { PedidosResueltos } from './PedidosResueltos';
import { InputClassroomScreen } from './InputClassroomScreen';
import { UserProfile } from './UserProfile';
import { QRpageUser } from './QRpageUser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabNav(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name='InputClassroomScreen' component={InputClassroomScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }}/>
        <Stack.Screen name='PedidosResueltos' component={PedidosResueltos} options={{ headerShown: false }}/>
        <Stack.Screen name='QRpageUser' component={QRpageUser} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyProfileTabNav(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export const MainTabNavigator = (props) => {
  const Username = props.route.params.name;
  console.log(Username)
  return (
    
    <Tab.Navigator>
      <Tab.Screen name='Menu' component={TabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/home-page.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),}}initialParams={{ name: Username }}/>
      <Tab.Screen name="Perfil" component={MyProfileTabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
              <Image
                source={{ uri: 'https://img.icons8.com/fluency/48/gender-neutral-user--v1.png' }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ), }}/>
    </Tab.Navigator>
  );
}

import React from 'react';
import { Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen } from './MainScreen';
import { PedidosResueltos } from './PedidosResueltos';
import { InputClassroomScreen } from './InputClassroomScreen';
import { UserProfile } from './UserProfile';
import { QRpageUser } from './QRpageUser';
import { InsertarPedido } from './scannerSelectQR/InsertarPedido';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav({ route }) {
  const { userData } = route.params;
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='MainScreen' component={MainScreen} options={{ headerShown: false }}
        initialParams={{ userData }}
      />
      <Stack.Screen 
        name='InputClassroomScreen' component={InputClassroomScreen} options={{ headerShown: false }}
        initialParams={{ userData }}
      />
      <Stack.Screen 
        name='UserProfile' component={UserProfile} options={{ headerShown: false }}
        initialParams={{ userData }}
      />
      <Stack.Screen 
        name='PedidosResueltos' component={PedidosResueltos} options={{ headerShown: false }}
        initialParams={{ userData }}
      />
      <Stack.Screen 
        name='QRpageUser' component={QRpageUser} options={{ headerShown: false }}
        initialParams={{ userData }}
      />
      <Stack.Screen 
        name='InsertarPedido' component={InsertarPedido} options={{ headerShown: false }}
        initialParams={{ userData }}
      />
    </Stack.Navigator>
  );
}

function MyProfileTabNav({ route }){
  const { userData } = route.params;
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile} initialParams={{ userData }} options={{ headerShown: false }}/>
      <Stack.Screen name='MainScreen' component={MainScreen} initialParams={{ userData }} options={{ headerShown: false }}/>
      <Stack.Screen name='PedidosResueltos' component={PedidosResueltos} initialParams={{ userData }} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export const MainTabNavigator = (props) => {
  console.log("### Maintab ###")
  const propsUserData = props.userData;
  console.log(propsUserData)

  return (
    <Tab.Navigator>
      <Tab.Screen name='Menu' component={TabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <Image
          source={{ uri: 'https://img.icons8.com/fluency/48/home-page.png' }}
          style={{ width: size, height: size, tintColor: color }}
        />
        ),}} initialParams={{ userData: propsUserData }}
      />

      <Tab.Screen name="Perfil" component={MyProfileTabNav} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
        <Image
          source={{ uri: 'https://img.icons8.com/fluency/48/gender-neutral-user--v1.png' }}
          style={{ width: size, height: size, tintColor: color }}
        />
        ), }} initialParams={{ userData: propsUserData }}
      />
    </Tab.Navigator>
  );
}

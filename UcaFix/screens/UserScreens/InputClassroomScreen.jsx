import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, Easing, TextInput, TouchableOpacity, Image, View } from 'react-native';

import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import styles from '../styles'; 
import { Aula } from './Aula';
import { EspacioComun } from './EspacioComun';
import { ScrollView } from 'react-native-gesture-handler';


const Stack = createStackNavigator();


const config = {
  animation: "timing",
  config:{
    duration: 1,
    easing: Easing.linear
  }
}
export function InputClassroomScreen(props) {
  const [aula, setAula] = useState('');
  const [motivo, setMotivo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setVisible] = useState(true); // Estado para controlar la visibilidad
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png',
          }}
        />
        <Text style={styles.title}>UCA FIX</Text>
      </View>

      <View style = {styles.topBar}>
        <TouchableOpacity  style={visible ? styles.topBarButton1 : styles.topBarButton2} onPress={() => setVisible(true)}>
            <Text 
            style={visible ? styles.topBarButtonText1 : styles.topBarButtonText2}
            >            Aulas            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={visible ? styles.topBarButton2 : styles.topBarButton1} onPress={() => setVisible(false)}>
            <Text style={visible ? styles.topBarButtonText2 : styles.topBarButtonText1}
            >Espacios comunes</Text>
        </TouchableOpacity>
      </View>
      
      <Stack.Navigator
  screenOptions={{
    headerShown: false, // Ocultar la barra de navegación si lo deseas
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              translateX: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -layouts.screen.width],
                  })
                : 0,
            },
          ],
        },
      };
    },
    transitionSpec: {
      open: {
        animation: "spring",
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        },
      },
      close: {
        animation: "spring",
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        },
      },
    },
  }}
>
      
        {visible ?
        <>
          <Stack.Screen name="Aula" options={{headerShown : false}}>
            {props => <Aula {...props}/>}
          </Stack.Screen>

        </>
        :
        <>
          <Stack.Screen name="EspacioComun" options={{headerShown : false}}>
            {props => <EspacioComun {...props} />}
          </Stack.Screen>

        </>
        }
                   
       

      </Stack.Navigator>

      

      {!isKeyboardVisible }
    </View>
  );
}



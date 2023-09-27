import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, Easing, TextInput, TouchableOpacity, Image, View } from 'react-native';

import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import Footer from '../Footer';
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

      
      

      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
        
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          transitionSpec:{
            open: config,
            close: config
          }
        }}
      >
                   
        <Stack.Screen name="Aula" component={Aula} options={{headerShown : false}}/>
        <Stack.Screen name="EspacioComun" component={EspacioComun} options={{headerShown : false}}/>

      </Stack.Navigator>

      

      {!isKeyboardVisible && <Footer />}
    </View>
  );
}



import React, { useEffect, useState } from 'react';
import { Keyboard, Animated, Text, Easing, TouchableOpacity, Image, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import styles from '../../styles';
import { AulaQR } from './AulaQR';
import { EspacioComunQR } from './EspacioComunQR';

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.visible ? 50 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [props.visible]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 50],
              outputRange: [50, 0],
            }),
          },
        ],
        flex: 1,
        display: props.visible ? 'flex' : 'none',
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export function InsertarPedido(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setVisible] = useState(true);
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
        <TouchableOpacity  style={visible ? styles.topBarButton1 : styles.topBarButton2} 
        onPress={() => { if (!visible) { setVisible(true) }}}>
            <Text 
            style={visible ? styles.topBarButtonText1 : styles.topBarButtonText2}
            >            Aulas            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={visible ? styles.topBarButton2 : styles.topBarButton1} 
        onPress={() => { if (visible) { setVisible(false)}}}>
            <Text style={visible ? styles.topBarButtonText2 : styles.topBarButtonText1}
            >Espacios comunes</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FadeInView visible={visible}>
          <AulaQR {...props}></AulaQR>
        </FadeInView>

        <FadeInView visible={!visible}>
          <EspacioComunQR {...props}></EspacioComunQR>
        </FadeInView>
      </View>

      
    </View>
     );
    }
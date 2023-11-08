import React, { useEffect, useState } from 'react';
import { Keyboard, Animated, Text, Easing, TouchableOpacity, Image, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Footer from '../Footer';
import styles from '../styles'; 
import { MapaPedidos } from './MapaPedidos';

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

export function PisosEdificio(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
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
        <TouchableOpacity  style={visible1 ? styles.topBarButton1 : styles.topBarButton2} 
        onPress={() => { setVisible1(true) ,setVisible2(false) ,setVisible3(false), setVisible4(false)}}>
            <Text 
            style={visible1 ? styles.topBarButtonText1 : styles.topBarButtonText2}
            >  Piso 1 </Text>
        </TouchableOpacity>

        <TouchableOpacity style={visible2 ? styles.topBarButton1 : styles.topBarButton2} 
        onPress={() => { setVisible1(false) ,setVisible2(true) ,setVisible3(false), setVisible4(false)}}>
            <Text style={visible2 ? styles.topBarButtonText1 : styles.topBarButtonText2}
            > Piso 2  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={visible3 ? styles.topBarButton1 : styles.topBarButton2} 
        onPress={() => { setVisible1(false) ,setVisible2(false) ,setVisible3(true), setVisible4(false)}}>
            <Text style={visible3 ? styles.topBarButtonText1 : styles.topBarButtonText2}
            >  Piso 3  </Text>
        </TouchableOpacity>

        <TouchableOpacity style={visible4 ? styles.topBarButton1 : styles.topBarButton2} 
        onPress={() => { setVisible1(false) ,setVisible2(false) ,setVisible3(false), setVisible4(true)}}>
            <Text style={visible4 ? styles.topBarButtonText1 : styles.topBarButtonText2}
            >  Piso 4 </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FadeInView visible={visible1}>
          <MapaPedidos {...props}></MapaPedidos>
        </FadeInView>

        <FadeInView visible={visible2}>
          <MapaPedidos {...props}></MapaPedidos>
        </FadeInView>

        <FadeInView visible={visible3}>
          <MapaPedidos {...props}></MapaPedidos>
        </FadeInView>

        <FadeInView visible={visible4}>
          <MapaPedidos {...props}></MapaPedidos>
        </FadeInView>
      </View>

      
    </View>
     );
    }
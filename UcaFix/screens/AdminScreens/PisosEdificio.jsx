import React, { useEffect, useState } from 'react';
import { Keyboard, Animated, Text, Easing, TouchableOpacity, Image, View } from 'react-native';
import { Platform, StyleSheet, TextInput, Alert, Modal, ActivityIndicator } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from '../Footer';
import styles from '../styles'; 
import { MapaPedidos } from './MapaPedidos';

const API_URL = "http://localhost:3000";

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
  const [edificioId, setEdificioId] = useState(0);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [edificios, setEdificios] = useState([]);
  
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

  useEffect(() => {
    fetchEdificios();
  }, []);

  useEffect(() => {
    let edificioId = null;
    for (const edificio of edificios) {
      if (edificio.nombre === selectedEdificio) {
        edificioId = edificio.id;
        break;
      }
    }
    setEdificioId(edificioId);
  }, [selectedEdificio]); // Log when imageSource changes

  const fetchEdificios = async () => {
    try {
      const response = await fetch(API_URL + "/edificios/getEdificios");
      if (response.ok) {
        const data = await response.json();
        setEdificios(data);
      } else {
        Alert.alert("Error", "Failed to fetch Edificios");
      }
    } catch (error) {
      console.error("Error fetching Edificios: ", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };
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

      
      
      <SelectList
            search={false}
            setSelected={setSelectedEdificio}
            boxStyles={{ paddingVertical: "6%", borderRadius: 10, backgroundColor: "#F9F9F9", borderWidth: 0, color: "#8D8D8D", marginHorizontal: "3.5%",textAlign:"center"  }}
            inputStyles={{ borderRadius: 6, color: "#8D8D8D",fontWeight: '500',textAlign:"center" }}
            dropdownStyles={{ borderRadius: 6, borderWidth: 0, backgroundColor: "#F9F9F9", color: "#8D8D8D", marginHorizontal: "3.5%", marginBottom:"4%",textAlign:"center"  }}
            dropdownItemStyles={{ borderRadius: 6, backgroundColor: "#E6E6E6", marginHorizontal: "5%", marginTop: "2%", color: "#8D8D8D",textAlign:"center"  }}
            dropdownTextStyles={{ padding: 4, color: "#8D8D8D",fontWeight: '500',textAlign:"center"  }}
            data={edificios.map(edificio => ({ key: edificio.id.toString(), value: edificio.nombre, id: edificio.id }))}
            defaultOption={{ key: '1', value: 'Seleccione un edificio' }}
            save="value"
            value={selectedEdificio}
          />

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
          <MapaPedidos {...props} selectedFloor = {1} edificioId = {edificioId} navigation={props.navigation} ></MapaPedidos>
        </FadeInView>

        <FadeInView visible={visible2}>
          <MapaPedidos {...props}  selectedFloor = {2} edificioId = {edificioId} navigation={props.navigation} ></MapaPedidos>
        </FadeInView>

        <FadeInView visible={visible3}>
          <MapaPedidos {...props}  selectedFloor = {3} edificioId = {edificioId} navigation={props.navigation} ></MapaPedidos>
        </FadeInView>

        <FadeInView visible={visible4}>
          <MapaPedidos {...props}  selectedFloor = {4} edificioId = {edificioId} navigation={props.navigation} ></MapaPedidos>
        </FadeInView>
      </View>

      
    </View>
     );
    }
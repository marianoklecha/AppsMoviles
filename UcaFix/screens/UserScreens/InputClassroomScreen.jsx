import React, { useEffect, useState } from 'react';
import { Keyboard, Animated, Text, TouchableOpacity, Image, View } from 'react-native';
import styles from '../styles'; 
import { Aula } from './Aula';
import { EspacioComun } from './EspacioComun';
import { Camara } from './Camara';

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

export function InputClassroomScreen(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [imageSource, setImageSource] = useState("");

  useEffect(() => {
    console.log("Updated image source INPUTCLASSROOM:", imageSource);
  }, [imageSource]); 

  const toggleCamera = (input) => {
    setCameraVisible(input);
  };

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

      <View style={{ flex: 1}}>
        <FadeInView visible={visible}>
          <Aula {...props} onPressCameraButton={toggleCamera} imageSource={imageSource}></Aula>
        </FadeInView>

        <FadeInView visible={!visible}>
          <EspacioComun {...props} onPressCameraButton={toggleCamera} imageSource={imageSource}></EspacioComun>
        </FadeInView>
      </View>

      {cameraVisible && <Camara setImageSource={setImageSource} onPressCameraButton={toggleCamera}/>}
    </View>
  );
}
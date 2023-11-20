import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Modal
} from 'react-native';

export function QRpageAdmin(props) {
    const onTap = (nextScreen) => {
      props.navigation.navigate(nextScreen);
    };
    const UserName = props;
    console.log(UserName)
    return (
      
      
      // 
      <View style={styles.back}>

        <View style={styles.TitleContainer} >
        <Image
              style={styles.UcaLogo}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'
              }}
            />
            <Text style={[styles.title]}>UCA FIX</Text>
            
        </View>
        
        <SafeAreaView style={styles.container}>

          

          <TouchableOpacity
              style={[styles.button]}
              onPress={() => props.navigation.navigate('ListaPedidos')}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJElEQVR4nO1bXW7DIAz2Uw81de9rD7Z212qSiyztruFpEpWiFOofDIXMn+SHEGzDh21I0gI4HA6HwxHDDgC+AOAHALBTuQHAOcxFjHMDE7CSk4aAW1B+g36xX0SCGBikd6jngU4AeARgJDKOADAzCs9fn8NCb4r0GRP3RwN/xVJgFlTf74i9tdwxLNouBv6KEYBMg+t+1LV0HNbjfYATADxGU7mbWnGOjAb+qHYSXIOpnH6W4xzJ9Ue1k7AmINd+swQMiepdigCpv2aK4KTM2c3uAsNqBbl6pcZb7SC0RuyEiC0fhA7BEWcwH4IVX8rFwF8xAqxR2o8TAMYRMC3uLas6hVSuSwf4zM5Yg4Ahkatce1TOU6BOlNx5sAfMBfW8z7VH2ZGOtxoBSKwI1542RZoh4I5cAnL1pPrZRfDfEDAkihcWFukJshgBKUif9yXCPUG+lAAKuaFM9XMC4MVFcIqEY6xI5rwD1NSKakVwIHKXe4JLXefWCjMCrMElwMp+ecWtE3DM/FZH7d+SkF/XoCpPg7PRKyoLAjiRYk4AMg1y9bUp4ASA7i0zG8hkXvutTpoC2okVJwCFOak5L1y2RIAVqF1h3U/tgJN7sZV6BQFN7wJTZIVy2rrbBTCiZ9nW5bdBNGirngIHw2+DuW2Wu8UDShexWnACwCMAMOfn8nvoF+9hDleN8klQ7VuXTw0Bu0DCPRJ6lGuYvOovMw6Hw+GAjeMXigB8L7yz2Z0AAAAASUVORK5CYII=',
                }}
              />
            </TouchableOpacity>

          </SafeAreaView>


          
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    back:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
  
    },
    container: {
      marginTop:'10%',
      justifyContent: 'center',
      marginHorizontal: '10%',
      //backgroundColor: '#021B6F'
    },
    button: {
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: 'white',
      
    },
    buttonSesion: {
      borderRadius: 6,
      
      padding:'3%',
      marginHorizontal: 50
    },
    buttonTextSesion: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      textAlign:"center",
      padding:'2%',
      
    },
    buttonText: {
      marginTop: 10,
      marginLeft: 20,
      fontSize: 20,
      color: "white",
      fontWeight: "bold"
    },
    tinyLogo: {
      width: 300,
      height: 300,
    },
    text :{
      fontSize: 25,
      marginBottom:20,
      color: 'black',
    },
    title :{
      fontSize: 55,
      marginTop:20,
      color: 'black',
      fontWeight: 'bold',
      marginBottom:'2%'
  
    },
    TitleContainer:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#3FA7D6',
      marginTop: '15%'
    },
    UcaLogo:{
      width: 50,
      height: 50,
      marginTop:15,
    },
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',  // Align items to the right
      backgroundColor: '#2F61AF',
      padding:'2%',
      
    }
  });
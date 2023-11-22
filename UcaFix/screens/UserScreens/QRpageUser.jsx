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

export function QRpageUser(props) {
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
          <Text style={[styles.text]}>Escanea!</Text> 
          <Image
              style={styles.qr}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2Uyw7EIAhF/f+fvrMZZ9G0w+tiLHISFyYoPQUZo2kaK3Cu7fKhmoiWa7w1cTTfeSIQPsy6Z+c7V8S61z5W9o85RwTOUrN+xKRFJNgVkXBXxBoffSN0EeuynmflSxd52rPzpRFtnW14hQgWrlTKiWS2FlrkD8zxq20jKM+fLTKxJNbguQ87i0QqrsLSCp7SlxG5A8L56P3LQIsE+tbTSt77Yc1XTkQLOx6sx1xWBMG5zmolRFurnMjEK+KNv9IiSGotKf6J7d7IchEJ2rj80iJX0sahErDH7+tFmqYZPz5tSUDqAOA2MAAAAABJRU5ErkJggg==',
              }}
            />
            <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('InsertarPedido')}>
            <Text style={styles.buttonText}>Escanear</Text>
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
      padding: 12,
      marginBottom: 30,
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: '#2F61AF',
    },
    buttonSesion: {
      borderRadius: 6,
      backgroundColor: '#A4A4A4',
      
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
      width: 50,
      height: 50,
      tintColor: 'black'
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
      
    },
    buttonText: {
      flex:1,
      marginTop: 10,
      marginLeft: 20,
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      alignContent:"center",
    },
    qr:{
      width: 200,
      height: 200,
      marginTop:15,
      marginLeft:40,
      alignItems: 'center',
    },
    button: {
      padding: 12,
      marginBottom: 30,
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: '#2F61AF',
    },
  });
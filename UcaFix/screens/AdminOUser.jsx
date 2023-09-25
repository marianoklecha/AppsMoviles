import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';


export function AdminOUser(props) {
    const onTap = (nextScreen) => {
      props.navigation.navigate(nextScreen);
    };
    return (
      
      // 
      <View style={styles.back}>
        <View style={styles.TitleContainer}>
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
            onPress={() => props.navigation.navigate('PaginaInicio')}>

            <Text style={styles.buttonText}>Administrador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('MainScreen')}>

            <Text style={styles.buttonText}>Usuario</Text>
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
      marginTop:'40%',
      justifyContent: 'center',
      marginHorizontal: '10%',
      //backgroundColor: '#021B6F'
    },
    button: {
      padding: 12,
      marginBottom: 50,
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: '#2F61AF'
    },
    buttonText: {
      marginTop: 10,
      marginBottom:10,
      marginLeft: '20%',
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
      
    }
  });
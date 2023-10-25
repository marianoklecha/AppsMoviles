import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Alert
} from 'react-native';

export function LoginScreen(props) {
    const [email, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    console.log(JSON.stringify(props))

    async function handleLogin(email, password, loginFunction) {
      try{
        const loginCheck = await fetch("http://localhost:3000/users/login?email=" + email + "&password=" + password)
          if (loginCheck.ok) {
              let data = await loginCheck.json()
              loginFunction(data.id)
              if(data.isAdmin == 0){
                props.navigation.navigate('MainScreen', { name: data.name , email: data.email})
              } else {
                props.navigation.navigate('PaginaInicio')
              }
          }
          else {
              Alert.alert("No se encontró el usuario")
              console.log(loginCheck.status)
          }
      }
      catch(e){
          console.log(e.stack)
      }
    };
  
    return (
      
      // 
      <View style={styles.back}>
        <View style={styles.TitleContainer}>
        <Text style={[styles.title]}>UCA FIX</Text>
        <Image
              style={styles.UcaLogo}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'
              }}
            />
            
        </View>
        <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
       
            <Text style={styles.inputTitle}>Mail UCA</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor="#8D8D8D"
                onChangeText={(text) => setMail(text.toLowerCase())}
            />
            <Text style={styles.inputTitle}>Contraseña</Text>
            <TextInput
                secureTextEntry = {true}
                style={styles.input}
                placeholderTextColor="#8D8D8D"
                onChangeText={(text) => setPassword(text)}
            />
          
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => handleLogin(email, password, props.loginFn)}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>


          </KeyboardAwareScrollView>
          
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
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: '10%',
      marginTop: '10%'
      //backgroundColor: '#021B6F'
    },
    button: {
        marginTop:'5%',
        marginHorizontal: '18%',
      alignContent: 'center',
      justifyContent:'center',
      padding: 15,
      borderRadius: 6,
      backgroundColor: '#2F61AF'
    },
    buttonText: {
        alignContent:'center',
        textAlign: 'center',
       
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
      fontSize: 70,
      color: 'black',
      fontWeight: 'bold',
      marginTop: '25%'
  
    },
    TitleContainer:{
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#3FA7D6',
      //padding:'3%',
    },
    UcaLogo:{
      width: 100,
      height: 100,
    },
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',  // Align items to the right
      backgroundColor: '#2F61AF',
      padding:'2%',
      
    },
    inputTitle: {
        color: 'black',
        fontSize: 20,
      },
    input: {
        borderColor: 'gray',
        width: '100%',
        color: 'black',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        marginTop: 2,
        backgroundColor: '#F9F9F9',
      },
  });
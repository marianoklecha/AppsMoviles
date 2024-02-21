import React, { useEffect, useState, useRef } from 'react';

import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  Image
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export function QRpageAdmin(props) {
  const camera = useRef(null);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
 
  let aula = 0;
  let piso = 0;
  let edificioId = 0;
  let lastCode = "";

   useEffect(() => {
    // Pedir permiso de cámara
    requestMultiple([PERMISSIONS.ANDROID.CAMERA]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted') {
        setHasPermission(true)
        setShowCamera(true)
      }
      else {
        Alert.alert('Falta permiso de cámara')
      }
    })
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      codes.forEach(code => console.log(code));
      lastCode= codes[0].value;
      setShowCamera(false);
      /*
      Alert.alert(
        `Alerta de ejemplo`,
        `Se escaneó el código ${codes[0].value}`,
      [
        {text: 'OK', onPress: () => setShowCamera(true)},
      ])*/

      setTimeout(() => {
        llenarInformacion();
      }, 500); // 500 milliseconds (medio segundo)

      setTimeout(() => {
        visitarPedidos(aula,edificioId);
      }, 500); // 500 milliseconds (medio segundo)
      
    }
  })

  const llenarInformacion = () => {
    const informacion = lastCode.split(".");
    console.log(informacion);
    aula = informacion[0];
    piso = informacion[2];
    const idInt = parseInt(informacion[4]);
    edificioId = idInt;
        
    console.log(aula,piso,edificioId);
  }

  const visitarPedidos = (aula, edificioId) => {
    props.navigation.navigate('PedidosPorAula', { aulaInfo: { aula, edificioId } });
  };

  /* import React from 'react';
import { View, Text } from 'react-native';

const YourComponent = () => {
  const text = "105.1.San Alberto Magno";
  const parts = text.split(".");

  return (
    <View>
      {parts.map((part, index) => (
        <Text key={index}>{part}</Text>
      ))}
    </View>
  );
};

export default YourComponent; */

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

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
      <View style={styles.filterContainer}>
        <Text style={styles.subtitle1}>Escanear código QR</Text>
      </View>

          {showCamera && <Camera
            ref={camera}
            style={{width: '100%', height: '100%'}}
            device={device}
            isActive={hasPermission}
            codeScanner={codeScanner}
          />}
                


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  retakeButton: {
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#77c3ec',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
  usePhotoButton: {
    backgroundColor: '#77c3ec',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  TitleContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "black"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '3%',
    paddingTop: '4%',
    backgroundColor: "white",
    shadowColor: "black"
  },
  UcaLogo: {
    width: 35,
    height: 35,
    marginLeft: '5%',
    
  },
  title: {
    fontSize: 30,
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 10,
  },
  subtitle1:{
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
    textAlign: "center",
    fontWeight: 'bold',
  },
});
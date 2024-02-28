import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export function Escaner() {
  const camera = useRef(null);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(false)
  const [lastCode, setLastCode] = React.useState(null)

  useEffect(() => {
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
      console.log(`Scanned ${codes.length} codes!`)
      codes.forEach(code => console.log(code))
      setLastCode(codes[0].value)
      setShowCamera(false)
      Alert.alert(
        `Alerta de ejemplo`,
        `Se escaneó el código ${codes[0].value}`,
      [
        {text: 'OK', onPress: () => setShowCamera(true)},
      ])
    }
  })

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
          {showCamera && <Camera
            ref={camera}
            style={{width: '100%', height: '60%'}}
            device={device}
            isActive={hasPermission}
            codeScanner={codeScanner}
          />}
                <Text style={{color: 'black'}}>Escanee su QR Aquí</Text>
                <Text style={{color: 'black'}}>Último Código: {lastCode}</Text>
                <Button title="deactivate" onPress={()=> setShowCamera(false)}/>
                <Button title="activate" onPress={()=> setShowCamera(true)}/>


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
});
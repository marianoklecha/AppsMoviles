import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  Modal,
  TextInput
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export function QRpageAdmin(props) {
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [QRManual, abrirQRManual] = useState(false);
  const [codigoManual, setCodigoManual] = useState("");

  let aula = 0;
  let piso = 0;
  let edificioId = 0;
  let lastCode = "";

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
      console.log(`Scanned ${codes.length} codes!`);
      codes.forEach(code => console.log(code));
      lastCode= codes[0].value;
      setShowCamera(false);
      handleVisitarPedido();
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

  const handleVisitarPedido = () => {
    setTimeout(() => {
      llenarInformacion();
    }, 500); 

    setTimeout(() => {
      visitarPedidos(aula,edificioId);
    }, 500);
  }

  const visitarPedidos = (aula, edificioId) => {
    props.navigation.navigate('PedidosPorAula', { aulaInfo: { aula, edificioId } });
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC',
          }}
        />
        <Text style={styles.codigoManual}>UCA FIX</Text>
      </View>

      <View style={styles.filterContainer} onTouchEnd={() => {setShowCamera(false), abrirQRManual(true);}}>
        <Text style={styles.subcodigoManual1}>Escanear código QR</Text>
      </View>

      {showCamera && <Camera
        ref={camera}
        style={{width: '100%', height: '100%'}}
        device={device}
        isActive={hasPermission}
        codeScanner={codeScanner}
      />}

      <Modal
        animationType="fade"
        transparent={true}
        visible={QRManual}
        onRequestClose={() => abrirQRManual(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={[styles.inputTitle, { marginTop: 16 }]}>Ingrese el código del QR</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 105.piso.1.edificio.1"
            placeholderTextColor="#8D8D8D"
            onChangeText={(codigoManual) => setCodigoManual(codigoManual)}
            value={codigoManual}
          />
          <View  style={styles.buttonListo} onTouchEnd ={() => {lastCode = codigoManual, handleVisitarPedido(), setShowCamera(true), abrirQRManual(false)} }>
            <Text style={styles.buttonTextListo}>Continuar</Text>
          </View>
          <View  style={styles.buttonCerrar} onTouchEnd ={() => abrirQRManual(false)}>
            <Text style={styles.buttonTextCerrar}>Cerrar</Text>
          </View>
          </View>
        </View>
      </Modal>
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
  codigoManualContainer: {
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
  codigoManual: {
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
  subcodigoManual1:{
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
    textAlign: "center",
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#fff', 
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    backgroundColor: '#F9F9F9',
    marginBottom: "5%"
  },
  buttonCerrar: {
    padding: 10,
    marginHorizontal:"20%",
    borderRadius: 6,
    backgroundColor: '#A1A1A1',
    marginTop: 8
  },
  buttonTextCerrar: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  buttonListo: {
    padding: 10,
    marginHorizontal:"20%",
    borderRadius: 6,
    backgroundColor: '#69D377',
  },
  buttonTextListo: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
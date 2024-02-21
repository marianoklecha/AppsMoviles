import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Input,
  Text,
  Image,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';
import { Camara } from '../UserScreens/Camara';
const API_URL = "http://localhost:3000";

export function FinalizarArreglo({ onPressCameraButton, ...props }) {
  const pedido = props.route.params.pedido;
  const [comments, setComments] = React.useState("");
  const [imageUri, setImageUri] = React.useState(null);
  const [localImageSource, setLocalImageSource] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const edificios = ["San Alberto Magno", "Santo Tomas Moro","Santa Maria",  "San Jose"];
  let pisoDisponible = false;
  if (pedido.aula === 'Baño' || pedido.aula === 'Biblioteca'){ pisoDisponible = true}
  let url = "";
  const propsUserData = props.route.params.userData;
  const toggleCamera = (input) => {
    setCameraVisible(input);
  };
  useEffect(() => {
    setLocalImageSource(prevImageSource => {
      console.log("Updated image source Aula:", imageSource);
      return imageSource;
    });
  }, [imageSource]);
  useEffect(() => {
    if (loading) {
      // Start loading indicator
      setLoading(true);
    } else {
      // Stop loading indicator
      setLoading(false);
    }
  }, [loading]);
  const uploadImageToFirebaseStorage = async (imageUri) => {
    try {
      setLoading(true);
      const reference = storage().ref(`images/${Date.now()}`);
      const task = reference.putFile(imageUri);

      // Track upload progress
      task.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });

      await task;
      console.log('Image uploaded successfully');
      url = await reference.getDownloadURL();
      console.log('Image URL:', url);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image to Firebase Storage');
    } finally {
      setLoading(false);
    }
  };
  const handleCreatePedido = async () => {
    if (!comments) {
      Alert.alert('Arreglo Incompleto', 'Por favor, llene todos los campos y cargue una imagen antes de hacer un pedido.');
      return;
    }
  
    if (!localImageSource) {
      Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
      return;
    }

    setLoading(true); // Start loading indicator
    await uploadImageToFirebaseStorage(localImageSource); // Wait for image upload to complete

// After upload completes
    await crearArreglo();

      
  };

  const crearArreglo = async () => {
    console.log(pedid.id,propsUserData.id,comments,url)
    try {
      const response = await fetch(API_URL+`/pedidoResuelto/pedido-resuelto`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pedidoId: pedido.id,
          adminId: propsUserData.id,
          comments: comments,
          imageFixed: url,
        })
      });
      
      if (response.ok) {
        Alert.alert('Arreglo Exitoso', 'Pedido Arreglado correctamente');
        setComments("");
        url = "";
        setLocalImageSource("");
        setImageURL(null);
        let url = "";
      } else {
        Alert.alert('Error', 'Failed to submit your request. Please try again.');
      }
      setLoading(false); // Stop loading indicator
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      setLoading(false); // Stop loading indicator
    }finally{
      setLoading(false);
    }
  };

  

  return (
    <SafeAreaView style={styles.back}>

      <View style={styles.TitleContainer}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'
          }}
        />
        <Text style={[styles.title]}>UCA FIX</Text>
      </View>
      <ScrollView>
        <View style={styles.tituloPagina}>
          <Text style={styles.textoTituloPagina}>Arreglo en Proceso</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.tituloPedido}>{pedido.title}</Text>
          <View>
            <Text style={styles.aulaPedido}>{pedido.aula} - {edificios[pedido.edificioId - 1]}</Text>
            {pisoDisponible && <Text style={styles.aulaPedido}>Piso {pedido.piso}</Text>}
            <Image style={styles.fotoPedido} source={{ uri: pedido.image }} />
            <Text style={styles.descripcionPedido}>Descripción del problema:</Text>
            <Text style={styles.descripcionTexto}>{pedido.content}</Text>
          </View>
        </View>
        <View style={styles.containerFinalizar}>
          <View style={styles.tituloPagina}>
            <Text style={styles.textoTituloPagina}>Completar una vez realizado el arreglo</Text>
          </View>
          <Text style={[styles.inputTitle, { marginTop: "4%" }]}>Comentarios que quiera agregar:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribir acá"
            placeholderTextColor="#8D8D8D"
            onChangeText={(comments) => setComments(comments)}
            value={comments}
          />
          <TouchableOpacity style={styles.button} onPress={() => toggleCamera(true)}>
              <Image
                style={styles.buttonLogo}
                source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
               
              />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          {/* Mini preview of the photo */}
          {localImageSource !== "" && (
            <View style={styles.imagePreviewContainer} >
              <Text style={styles.buttonVistaPrevia}>Vista previa</Text>
              <Image source={{
                uri: `file://'${imageSource}`,
              }} style={styles.imagePreview} />
            </View>
          )}

          <TouchableOpacity style={styles.buttonListo} onPress={() => handleCreatePedido()}>

                <Text style={styles.buttonTextListo}>Listo</Text>
              </TouchableOpacity>
              </View>

              <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
            onRequestClose={() => setLoading(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ActivityIndicator size="large" color="#3C99FF" />
                <Text style={styles.loadingText}>Espere...</Text>
              </View>
            </View>
          </Modal>
      </ScrollView>
      {cameraVisible && <Camara setImageSource={setImageSource} onPressCameraButton={toggleCamera}/>}

    </SafeAreaView>
  );

};
  
  const styles = StyleSheet.create({
    back:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
    },
    button: {
        marginBottom: "5%",
        padding: 15,
        flexDirection: 'row',
        justifyContent:"space-evenly",
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
        marginHorizontal: '10%',
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    buttonLogo: {
        marginTop: "4%",
        width: 40,
        height:25
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
      fontSize: 37,
      color: 'black',
      fontWeight: 'bold',
  
    },
    TitleContainer:{
      flexDirection: 'row', 
      justifyContent: 'left',
      //backgroundColor: '#3FA7D6',
      margin:10,
      padding: 10
    },
    UcaLogo:{
      width: 35,
      height: 35,
      marginTop: "2.5%",
      marginLeft: "3%",
      marginRight:"3%"
    },
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',  // Align items to the right
      backgroundColor: '#2F61AF',
      padding:'2%',
      
    },
    container: {
        marginTop:'5%',
        alignContent:"left",
        borderRadius:10,
        marginHorizontal: '5%',
        backgroundColor: '#EAEAEA',
        padding: "3%"
    }
    ,
    containerFinalizar: {
        marginTop:'5%',
        borderRadius:10,
        marginHorizontal: '5%',
        backgroundColor: '#EAEAEA',
        marginBottom:"23%"
    }
    ,
    buttonListo: {
        padding: 10,
        marginHorizontal:"15%",
        borderRadius: 6,
        backgroundColor: '#5992F2',
        marginBottom:"5%"
        
      },
      buttonTextListo: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        
      },
      tituloPagina:{
        marginHorizontal:"5%",
        marginTop:'5%',
      },
      textoTituloPagina:{
        textAlign: "center",
        fontSize:25,
        color: "black",
        fontWeight: "700"
      },
      tituloPedido:{
        fontSize:25,
        color: "black",
        fontWeight: "800",
        textAlign:"center"
      },
      aulaPedido:{
        fontSize:18,
        color: "black",
        fontWeight: "800",
        textAlign:"center"
      },
      fotoPedido: {
        marginHorizontal:"5%",
        marginTop:'5%',
        height:150,
        width:190
    },
    descripcionPedido:{
        marginTop:'5%',
        fontSize:15,
        color: "black",
        fontWeight: "600",
        textAlign:"center"
    },
    descripcionTexto:{
    fontSize:15,
    color: "black",
    },
    input: {
        borderColor: 'gray',
        color: 'black',
        borderRadius: 10,
        marginHorizontal:"5%",
        padding: 15,
        backgroundColor: '#F9F9F9',
        marginBottom: "5%"
      },
      inputTitle: {
        marginHorizontal:"5%",
        color: 'black',
        fontSize: 15,
        marginBottom:10
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: '#fff', // White background for the content
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "black"
      },
      imagePreviewContainer: {
        marginBottom: 15,
        alignItems: 'center',
      },
      imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
      },
  });
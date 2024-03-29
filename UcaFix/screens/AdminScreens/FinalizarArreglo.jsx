import React, { useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import { Camara } from '../UserScreens/Camara';
const API_URL = "http://localhost:3000";

export function FinalizarArreglo({...props }) {
  const pedido = props.route.params.pedido;
  const [comments, setComments] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagenGrande, setImagenGrande] = useState(false)

  let url = "";

  const edificios = ["San Alberto Magno", "Santo Tomas Moro","Santa Maria",  "San Jose"];
  let pisoDisponible = false;
  if (pedido.aula === 'Baño' || pedido.aula === 'Biblioteca'){ pisoDisponible = true}
  
  const propsUserData = props.route.params.userData;

  const toggleCamera = (input) => {
    setCameraVisible(input);
  };
 
  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  const uploadImageToFirebaseStorage = async (imageUri) => {
    try {
      setUploading(true);
      const reference = storage().ref(`images/${Date.now()}`);
      const task = reference.putFile(imageUri);

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
      setUploading(false);
    }
  };
  const handleCreatePedido = async () => {
    if (!comments) {
      Alert.alert('Formulario incompleto', 'Por favor, llene todos los campos y cargue una imagen antes de hacer un pedido.');
      return;
    }
  
    if (!imageSource) {
      Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
      return;
    }

    setLoading(true); 
    await uploadImageToFirebaseStorage(imageSource); 
    console.log(imageURL);

    if (url === null) {
      Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
      return;
    }

    await crearArreglo();
  };

  const crearArreglo = async () => {
    console.log(pedido.id,propsUserData.id,comments,url)
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
        setImageSource("");
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

    } finally {
      setLoading(false);
    }
  };

  

  return (
    <SafeAreaView style={styles.back}>
      <View style={styles.header}>
        <Image style={styles.UcaLogo}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'}}
        />
        <Text style={styles.title}>UCA FIX</Text>
      </View>

      <ScrollView>
        

        <View style={styles.container}>
          <Text style={styles.tituloPedido}>{pedido.title}</Text>
          <View style={styles.pedidoContainer}>
            <Text style={styles.aulaPedido}>{pedido.aula} - {edificios[pedido.edificioId - 1]}</Text>
            {pisoDisponible && <Text style={styles.aulaPedido}>Piso {pedido.piso}</Text>}
            <Image style={styles.fotoPedido} source={{ uri: pedido.image }} />
            <Text style={styles.descripcionPedido}>Descripción adjunta del problema:</Text>
            <Text style={styles.descripcionTexto}>{pedido.content}</Text>
          </View>
        </View>

        <View style={styles.containerFinalizar}>
          <View style={styles.tituloPagina}>
            <Text style={styles.textoTituloPagina}>Completar una vez realizado el arreglo</Text>
          </View>

          <Text style={[styles.inputTitle, { marginTop: "4%" }]}>Describa el estado del problema y el procedimiento realizado </Text>

          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Escribir aquí"
            placeholderTextColor="#8D8D8D"
            onChangeText={(comments) => setComments(comments)}
            value={comments}
          />

          <TouchableOpacity style={styles.button} onPress={() => toggleCamera(true)}>
              <Image
                style={styles.buttonLogo}
                source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
               
              />
            <Text style={styles.buttonText}>Cargar imagen</Text>
          </TouchableOpacity>

          {imageSource !== "" && (
            <TouchableOpacity style={styles.imagePreviewContainer} onPress={() => setImagenGrande()}>
              <Text style={styles.buttonVistaPrevia}>Ver vista previa</Text>
              <Image source={{
                uri: `file://'${imageSource}`,
              }} style={styles.imagePreview} />
            </TouchableOpacity>
          )}

          <Modal
            animationType="fade"
            transparent={true}
            visible={imagenGrande}
            onRequestClose={() => setImagenGrande(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

                <Image source={{
                uri: `file://'${imageSource}`,
                }} style={styles.imageGrande} />
                
                <TouchableOpacity  style={styles.buttonCerrar} onPress={() => setImagenGrande(false)}>
                  <Text style={styles.buttonTextCerrar}>Cerrar</Text>
                </TouchableOpacity>
              </View> 
            </View>
          </Modal>

          <TouchableOpacity style={styles.buttonListo} onPress={() => handleCreatePedido()}>
            <Text style={styles.buttonTextListo}>Finalizar</Text>
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
        marginTop: "1%",
    },
    buttonLogo: {
        marginTop: "1%",
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      padding: '5%',
      paddingTop: '5%',
    
      backgroundColor: "white"
      
    },
    UcaLogo: {
      width: 30,
      height: 30,
      marginLeft: '5%',
      marginRight:5
      
    },
    title: {
      fontSize: 30,
      marginTop: 5,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: '2%',
    },
    TitleContainer:{
      flexDirection: 'row', 
      justifyContent: 'left',
      //backgroundColor: '#3FA7D6',
      margin:10,
      padding: 10
    },
    
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',   
      backgroundColor: '#2F61AF',
      padding:'2%',
      
    },
    container: {
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
        marginBottom:"5%"
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
        textAlign:"center",
        marginBottom: "1%"
    },
    descripcionTexto:{
    fontSize:18,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      modalContent: {
        backgroundColor: '#fff', 
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
      pedidoContainer: {
        alignItems: 'center',
      },
      buttonVistaPrevia: {
        textAlign: "center",
        fontSize: 15,
        color: 'black',
        fontWeight: "600",
      },
      imageGrande: {
        width: 300,
        height: 500,
        marginTop: 10,
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
  });
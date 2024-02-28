import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert, Modal, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import styles from '../styles';
import { Camara } from './Camara';

const API_URL = "http://localhost:3000";

export const PedidoFillWithQR = ( {...props } ) => {
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const aulaInfo = props.route.params.aulaInfo;
    console.log(aulaInfo)
    const [aula, setAula] = useState(aulaInfo.aula || "");
    const [piso, setPiso] = useState(aulaInfo.piso || "");
    const [edificioID, setEdificioId] = useState(aulaInfo.edificioId || "");
    const [imagenGrande, setImagenGrande] = useState(false)
    let edificioNombre;
    let url = "";

    const propsUserData = props.route.params.userData;
  
    const fetchEdificios = async () => {
      try {
        const response = await fetch(API_URL + "/edificios/getEdificios");
        if (response.ok) {
          const data = await response.json();
          setEdificios(data);
        } else {
          console.log("Error", "Falló el fetch de Edificios");
        }
      } catch (error) {
        console.error("Error al hacer el fetch de Edificios: ", error);
      Alert.alert("Error", "Ocurrió un error inesperado");
      }
    };

    const nombreEdificio= async(edificios)=>{
      for (const edificio of edificios) {
          if (edificio.id === edificioID) {
            edificioNombre = edificio.nombre;
          }
        }
    };
    nombreEdificio(edificios)

    useEffect(() => {
      if (loading) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, [loading]);

    useEffect(() => {
      fetchEdificios();
    }, []);
    
    const toggleCamera = (input) => {
      setCameraVisible(input);
    };

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
        console.log('Imagen subida exitosamente');
        url = await reference.getDownloadURL();
        console.log('Image URL:', url);
      } catch (error) {
        console.error('Error subiendo la imagen:', error);
        Alert.alert('Error', 'Ocurrió un error inesperado');
      } finally {
        setUploading(false);
      }
    };
    
    const createPedido = async () => {
      try {
        const response = await fetch(API_URL + '/pedidos/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            aula:aula,
            piso:piso,
            edificioId: edificioID,
            content,
            image: url,
            fixed: false,
            authorID: propsUserData.id
          })
        });
  
        if (response.ok) {
          Alert.alert('¡Pedido realizado!', 'Tu pedido ha sido realizado correctamente');
          setAula("");
          setTitle("");
          setContent("");
          setPiso("");
          setSelectedEdificio(null);
          url = "";
          setImageSource("");
          setImageURL(null);
          let url = "";
          props.navigation.navigate('Menu', { screen: 'MainScreen', params: { userData: propsUserData } });
      
        } else {
          Alert.alert('Error', 'Ha ocurrido un error. Por favor, intentelo nuevamente.');
        }
        setLoading(false); 

      } catch (error) {
        console.error('Error al cargar el formulario:', error);
        Alert.alert('Error', 'Ha ocurrido un error inesperado. Por favor, intentelo nuevamente.');
        setLoading(false); 
      }finally{
        setLoading(false);
      }
    };
  
    const handleCreatePedido = async () => {
      if ( !title || !content) {
        Alert.alert('Pedido Incompleto', 'Por favor, llene todos los campos y cargue una imagen antes de hacer un pedido.');
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
    
      await createPedido();
    };
    

    return(
      <>

        <View style={styles.headerAdmin}>
          <Image style={styles.UcaLogoAdmin}
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'}}
          />
          <Text style={styles.titleAdmin}>UCA FIX</Text>
        </View>

        <ScrollView>
          <KeyboardAwareScrollView
          contentContainerStyle={{...styles.scrollViewContent, backgroundColor: '#E9E9E9' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >

            <View style={styles.formContainer}>
              <Text style={[styles.inputTitle]}>Motivo del pedido</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Silla rota, Pizarrón roto, Luz rota"
                placeholderTextColor="#8D8D8D"
                onChangeText={(title) => setTitle(title)}
                value={title}
              />

              <Text style={styles.inputTitle}>Descripción</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Describí el problema para una mejor solución"
                placeholderTextColor="#8D8D8D"
                onChangeText={(content) => setContent(content)}
                value={content}
              />

              <Text style={styles.inputTitle}>Aula / Espacio común</Text>
              <Text style={[styles.input, {padding: 17}]} value={aula}>{aula}</Text> 

              <Text style={[styles.inputTitle]}>Piso</Text>
              <Text style={[styles.input, {padding: 17}]} value={piso}>{piso}</Text>  

              <Text style={[styles.inputTitle]}>Edificio</Text>
              <Text style={[styles.input, {padding: 17}]} value={edificioID}>{edificioNombre}</Text>
              
          
              <TouchableOpacity style={styles.button} onPress={() => toggleCamera(true)}>
                  <Image
                    style={styles.buttonLogo}
                    source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
                  
                  />
                <Text style={styles.buttonText}>Cargar imagen</Text>
              </TouchableOpacity>

              {imageSource !== "" && (
                <TouchableOpacity style={styles.imagePreviewContainer} onPress={() => setImagenGrande()}>
                  <View style={styles.imagePreviewContainer} >
                    <Text style={styles.buttonVistaPrevia}>Ver vista previa</Text>
                    <Image source={{
                      uri: `file://'${imageSource}`,
                    }} style={styles.imagePreview} />
                  </View>
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
                <Text style={styles.buttonTextListo}>Finalizar pedido</Text>
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

            {cameraVisible && <Camara setImageSource={setImageSource} onPressCameraButton={toggleCamera}/>}
          
          </KeyboardAwareScrollView>
        </ScrollView>
    </>
  );
};
import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert, Modal, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage'; // Import Firebase storage module
import styles from '../styles';
import { Camara } from './Camara';


const API_URL = "http://localhost:3000";

export const PedidoFillWithQR = ( {...props } ) => {
    const [uploading, setUploading] = useState(false); // State to track upload progress
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false); // State to track loading
    const [cameraVisible, setCameraVisible] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const aulaInfo = props.route.params.aulaInfo;
    console.log(aulaInfo)
    const [aula, setAula] = useState(aulaInfo.aula || "");
    const [piso, setPiso] = useState(aulaInfo.piso || "");
    const [edificioID, setEdificioId] = useState(aulaInfo.edificioId || "");
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
        Alert.alert("Error", "Failed to fetch Edificios");
      }
    } catch (error) {
      console.error("Error fetching Edificios: ", error);
      Alert.alert("Error", "An unexpected error occurred");
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
//   console.log('id user:'+propsUserData.id)

useEffect(() => {
    if (loading) {
      // Start loading indicator
      setLoading(true);
    } else {
      // Stop loading indicator
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
          Alert.alert('Pedido Exitoso', 'Tu pedido ha sido realizado correctamente');
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
  

    const handleCreatePedido = async () => {
      if ( !title || !content) {
        Alert.alert('Pedido Incompleto', 'Por favor, llene todos los campos y cargue una imagen antes de hacer un pedido.');
        return;
      }
    
      if (!imageSource) {
        Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
        return;
      }
  
      setLoading(true); // Start loading indicator
    
      await uploadImageToFirebaseStorage(imageSource); // Wait for image upload to complete
      // Wait until imageURL is not null
      
      console.log(imageURL); // This should now have the correct value
    
      if (url === null) {
        Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
        return;
      }
    
      await createPedido();
    };
    

    return(
        <View >

        <KeyboardAwareScrollView
        contentContainerStyle={{...styles.scrollViewContent, backgroundColor: '#E9E9E9' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <ScrollView>
            
        </ScrollView>

        <View style={styles.formContainer}>
        <Text style={[styles.inputTitle, { marginTop:15 }]}>Titulo Pedido</Text>
          <TextInput
            style={styles.input}
            placeholder="     Ej: Silla rota, Pizarrón roto, Luz rota"
            placeholderTextColor="#8D8D8D"
            onChangeText={(title) => setTitle(title)}
            value={title}
          />
          <Text style={styles.inputTitle}>Espacio/Aula</Text>
          <Text style={styles.input} value={aula}>{aula}</Text> 
            <Text style={[styles.inputTitle, { marginTop:15 }]}>Piso</Text>
            <Text style={styles.input} value={piso}>{piso}</Text>  
      <Text style={[styles.inputTitle, { marginTop:15 }]}>Edificio</Text>
        <Text style={styles.input} value={edificioID}>{edificioNombre}</Text>
          

          <Text style={styles.inputTitle}>Descripción</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="     Algo que quieras agregar"
            placeholderTextColor="#8D8D8D"
            onChangeText={(content) => setContent(content)}
            value={content}
          />

          {/* Button to open camera */}
          <TouchableOpacity style={styles.button} onPress={() => toggleCamera(true)}>
              <Image
                style={styles.buttonLogo}
                source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
               
              />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          {/* Mini preview of the photo */}
          {imageSource !== "" && (
            <View style={styles.imagePreviewContainer} >
              <Text style={styles.buttonVistaPrevia}>Vista previa</Text>
              <Image source={{
                uri: `file://'${imageSource}`,
              }} style={styles.imagePreview} />
            </View>
          )}
          
          

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

      </View>
    );
};
import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert, Modal, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage'; // Import Firebase storage module
import styles from '../styles';

const API_URL = "http://localhost:3000";

export function Aula({ onPressCameraButton, imageSource, ...props }) {
  const [localImageSource, setLocalImageSource] = useState("");
  const [uploading, setUploading] = useState(false); // State to track upload progress

  const [aula, setAula] = useState("");
  const [piso, setPiso] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [edificios, setEdificios] = useState([]);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const [imagenGrande, setImagenGrande] = useState(false)

  let url = "";
 
  const propsUserData = props.route.params.userData;

  useEffect(() => {
    setLocalImageSource(prevImageSource => {
      console.log("Updated image source Aula:", imageSource);
      return imageSource;
    });
  }, [imageSource]);

  useEffect(() => {
    fetchEdificios();
  }, []);

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

  const handleCreatePedido = async () => {
    if (!aula || !piso || !selectedEdificio || !title || !content) {
      Alert.alert('Pedido Incompleto', 'Por favor, llene todos los campos y cargue una imagen antes de hacer un pedido.');
      return;
    }
  
    if (!localImageSource) {
      Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
      return;
    }

    setLoading(true); // Start loading indicator
  
    await uploadImageToFirebaseStorage(localImageSource); // Wait for image upload to complete
    // Wait until imageURL is not null
    
    console.log(imageURL); // This should now have the correct value
  
    if (url === null) {
      Alert.alert('Error', 'Por favor, capture una imagen antes de crear el pedido.');
      return;
    }
  
    await createPedido();
  };
  

  const createPedido = async () => {
    
    let edificioId = null;

    // Loop through the edificios array to find the matching edificio
    for (const edificio of edificios) {
      if (edificio.nombre === selectedEdificio) {
        edificioId = edificio.id;
        break;
      }
    }

    try {
      const response = await fetch(API_URL + '/pedidos/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          aula,
          piso,
          edificioId,
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
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.formContainer}>
          <Text style={styles.inputTitle}>Número de aula</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 105"
            placeholderTextColor="#8D8D8D"
            onChangeText={(aula) => setAula(aula)}
            value={aula}
          />
          <Text style={styles.inputTitle}>Piso</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 1"
            placeholderTextColor="#8D8D8D"
            onChangeText={(piso) => setPiso(piso)}
            value={piso}
          />
          <Text style={[styles.inputTitle]}>Edificio</Text>
          <SelectList
            search={true}
            setSelected={setSelectedEdificio}
            boxStyles={{ paddingVertical: "5%", borderRadius: 10, backgroundColor: "#F9F9F9", borderWidth: 0, color: "#8D8D8D" }}
            searchPlaceholder='Búsqueda'
            notFoundText='Edificio no encontrado'
            inputStyles={{ borderRadius: 6, color: "#8D8D8D" }}
            dropdownStyles={{ borderRadius: 6, borderWidth: 0, backgroundColor: "#F9F9F9", color: "#8D8D8D" }}
            dropdownItemStyles={{ borderRadius: 6, backgroundColor: "#E6E6E6", marginHorizontal: "4%", marginTop: "2%", color: "#8D8D8D" }}
            dropdownTextStyles={{ padding: 4, color: "#8D8D8D" }}
            data={edificios.map(edificio => ({ key: edificio.id.toString(), value: edificio.nombre, id: edificio.id }))}
            defaultOption={{ key: '1', value: 'Seleccione' }}
            save="value"
            value={selectedEdificio}
          />
          <Text style={[styles.inputTitle, { marginTop: 16 }]}>Motivo del pedido</Text>
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
            placeholder="Algo que quieras agregar"
            placeholderTextColor="#8D8D8D"
            onChangeText={(content) => setContent(content)}
            value={content}
          />

          {/* Button to open camera */}
          <TouchableOpacity style={styles.button}
            onPress={() => onPressCameraButton(true)}>
            <Image
              style={styles.buttonLogo}
              source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
            />
            <Text style={styles.buttonText}>Cargar imagen</Text>
          </TouchableOpacity>

          {/* Mini preview of the photo */}
          {localImageSource !== "" && (
            <TouchableOpacity style={styles.imagePreviewContainer} onPress={() => setImagenGrande()}>
              <Text style={styles.buttonVistaPrevia}>Vista previa</Text>
              <Image source={{
                uri: `file://'${localImageSource}`,
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
                uri: `file://'${localImageSource}`,
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
      </KeyboardAwareScrollView>

      
        
    </ScrollView>
  );
};

import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage'; // Import Firebase storage module
import styles from '../styles';

const API_URL = "http://localhost:3000";

export function Aula(props) {
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(false)
  const [imageSource, setImageSource] = useState('');
  const [uploading, setUploading] = useState(false); // State to track upload progress

  const [aula, setAula] = useState("");
  const [piso, setPiso] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [edificios, setEdificios] = useState([]);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const propsUserData = props.route.params.userData;

  useEffect(() => {
    fetchEdificios();
    requestMultiple([PERMISSIONS.ANDROID.CAMERA]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted') {
        setHasPermission(true);
      } else {
        Alert.alert('Falta permiso de cámara');
      }
    })
  }, []);

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
      const url = await reference.getDownloadURL();
      console.log('Image URL:', url);
      setImageURL(url); // Set the imageURL state
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image to Firebase Storage');
    } finally {
      setUploading(false);
    }
  };

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto();
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);

      // Upload the captured photo to Firebase Storage
      await uploadImageToFirebaseStorage(photo.path);
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

  const createPedido = async () => {
    // Check if any of the fields are empty
    if (!aula || !piso || !selectedEdificio || !title || !content || !imageURL) {
      Alert.alert('Pedido Incompleto', 'Por favor, llene todos los campos y cargue una imagen antes de hacer un pedido.');
      return;
    }

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
          image: imageURL,
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
        setImageURL(null); // Reset imageURL state after successfully submitting pedido
      } else {
        Alert.alert('Error', 'Failed to submit your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
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
            onPress={() => setShowCamera(true)}>
            <Image
              style={styles.buttonLogo}
              source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
            />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonListo} onPress={() => createPedido()}>
            <Text style={styles.buttonTextListo}>Listo</Text>
          </TouchableOpacity>

          {/* Camera View */}
          {showCamera ? (
            <View style={[styles.cameraContainer, StyleSheet.absoluteFillObject]}>
              <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={showCamera && hasPermission}
                photo={true}
                orientation='portrait'
              />

              {/* Button to capture photo */}
              <TouchableOpacity
                style={styles.captureButton}
                onPress={() => capturePhoto()}
              >
                <Text style={styles.captureButtonText}>Capture</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

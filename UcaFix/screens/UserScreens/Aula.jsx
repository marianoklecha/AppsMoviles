import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import { Camara } from '..';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage'; // Import Firebase storage module

const API_URL = "http://localhost:3000";

export function Aula (props) {
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(false)
  const [imageSource, setImageSource] = useState('');
  const [uploading, setUploading] = useState(false); // State to track upload progress


  const [aula, setAula] = React.useState("");
  const [piso,setPiso]= React.useState("");
  const [title, setTitle] =  React.useState("");
  const [content, setContent] =  React.useState("");
  const [edificios, setEdificios] =  React.useState([]);
  const [selectedEdificio, setSelectedEdificio] =  React.useState(null);

  const propsUserData = props.route.params.userData;

  useEffect(() => {
    fetchEdificios();
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

  const uploadImage = async (path) => {
    setUploading(true);
    const reference = storage().ref(`images/${Date.now()}`);
    const task = reference.putFile(path);

    // Track upload progress
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    });

    try {
      await task;
      console.log('Image uploaded successfully');
      const url = await reference.getDownloadURL();
      console.log('Image URL:', url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image to Firebase Storage');
      return null;
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
      const imageUrl = await uploadImage(photo.path);

      // Proceed with creating the pedido only if image upload was successful
      if (imageUrl) {
        // Your existing code...
        await createPedido(title, aula, piso, edificioId, content, imageUrl, false, propsUserData.id);
      } else {
        Alert.alert('Error', 'Failed to upload image. Please try again.');
      }
    }
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

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


  console.log("### Aula ###");
  console.log(propsUserData);
  console.log(edificios)
  

  const createPedido = async (title,aula,piso,edificioId, content, image, fixed, authorID) => {

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
          image,
          fixed,
          authorID
        })
      });

      if (response.ok) {
        Alert.alert('Pedido Exitoso', 'Tu pedido ha sido realizado correctamente');
        setAula("");
        setTitle("");
        setContent("");
        setPiso("");
        setSelectedEdificio(null);
      } else {
        Alert.alert('Error', 'Failed to submit your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleCreatePost = async () => {
    // Check if any of the fields are empty
    if (!aula || !piso || !selectedEdificio || !title || !content) {
      Alert.alert('Pedido Incompleto', 'Porfavor llenar todos los campos antes de hacer un pedido.');
      return; // Exit function early if any field is empty
    }
    let edificioId = null;
  
    // Loop through the edificios array to find the matching edificio
    for (const edificio of edificios) {
      if (edificio.nombre === selectedEdificio) {
        edificioId = edificio.id;
      }
    }
    console.log(edificioId)
  
    // If all fields are filled, proceed with making the request
    console.log(selectedEdificio)
    await createPedido(title,aula,piso,edificioId, content, "imagefdsfdsf", false, propsUserData.id);
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
            boxStyles={{ paddingVertical:"5%", borderRadius:10, backgroundColor:"#F9F9F9", borderWidth:0, color:"#8D8D8D" }}
            searchPlaceholder='Búsqueda'
            notFoundText='Edificio no encontrado'
            inputStyles={{ borderRadius:6, color:"#8D8D8D" }}
            dropdownStyles={{ borderRadius:6, borderWidth:0, backgroundColor:"#F9F9F9", color:"#8D8D8D" }}
            dropdownItemStyles={{ borderRadius:6, backgroundColor:"#E6E6E6", marginHorizontal:"4%", marginTop:"2%", color:"#8D8D8D" }}
            dropdownTextStyles={{ padding:4, color:"#8D8D8D" }}
            data={edificios.map(edificio => ({ key: edificio.id.toString(), value: edificio.nombre, id: edificio.id }))}
            defaultOption={{ key:'1', value:'Seleccione' }}  
            save="value"
            value={selectedEdificio}
          />
          <Text style={[styles.inputTitle, { marginTop:16 }]}>Motivo del pedido</Text>
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

          <TouchableOpacity style={styles.button} 
            onPress={() => props.navigation.navigate('Camara')}>
            <Image
              style={styles.buttonLogo}
              source={{ uri: 'https://img.icons8.com/?size=256&id=59764&format=png' }}
            />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera && hasPermission}
            photo={true}
            orientation='portrait'
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setShowCamera(true)}>
                <Text style={{ color: '#77c3ec', fontWeight: '500' }}>
                  Retake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.usePhotoButton}
                onPress={() => setShowCamera(true)}>
                <Text style={{ color: 'white', fontWeight: '500' }}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>

          <TouchableOpacity style={styles.buttonListo} onPress={() => handleCreatePost()}>
            <Text style={styles.buttonTextListo}>Listo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

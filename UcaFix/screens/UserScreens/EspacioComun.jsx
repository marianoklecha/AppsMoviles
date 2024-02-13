import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import styles from '../styles'; 

const API_URL = "http://localhost:3000";

export const EspacioComun = (props) => {
    const [motivo, setMotivo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [biblioBanio, setBiblioBanio] = useState("");
    const [aula, setAula] = useState("");
    const [piso, setPiso] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const propsUserData = props.route.params.userData;
    const data = [
      {key:'1', value:'Seleccione', disabled:true},
      {key:'2', value:'Biblioteca'},
      {key:'3', value:'Baño'},
    ]
    useEffect(() => {
      fetchEdificios();
    }, []);
  
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
  
    const createPedido = async (title, aula, piso, edificioId, content, image, fixed, authorID) => {
      
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
      if ( !piso || !selectedEdificio || !title || !content) {
        Alert.alert('Pedido Incompleto', 'Por favor llenar todos los campos antes de hacer un pedido.');
        return;
      }
      let edificioId = null;
    
      for (const edificio of edificios) {
        if (edificio.nombre === selectedEdificio) {
          edificioId = edificio.id;
        }
      }
    
      await createPedido(title, aula, piso, edificioId, content, "imagefdsfdsf", false, propsUserData.id);
    };
    

    return(
        <View >
        
        <KeyboardAwareScrollView
        contentContainerStyle={{...styles.scrollViewContent, backgroundColor: 'white' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
         
        <View style={styles.formContainer}>
          <Text style={styles.inputTitle}>Biblioteca o Baño</Text>
          <SelectList 
                search={false} 
                setSelected={(val) => setAula(val)} // Update the aula state here
                boxStyles={{borderRadius:10, backgroundColor:"#F9F9F9",borderWidth:0,}}
                inputStyles={{borderRadius:6, color:"#8D8D8D", padding:"2%"}}
                dropdownStyles={{borderRadius:6,borderWidth:0,backgroundColor:"#F9F9F9"}}
                dropdownItemStyles={{borderRadius:6,backgroundColor:"#E6E6E6",marginHorizontal:"4%",marginTop:"4%"}}
                dropdownTextStyles={{padding:4,color:"#8D8D8D"}}
                data={data} 
                value={aula}
                defaultOption={{ key:'1', value:'Seleccione' }}  
                save="value"
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

          <Text style={[styles.inputTitle, { marginTop:6 }]}>titulo</Text>
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

          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.buttonLogo}
              source={{
                uri: 'https://img.icons8.com/?size=256&id=59764&format=png',
              }}
            />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonListo} onPress={() => handleCreatePost()}>
            <Text style={styles.buttonTextListo}>Listo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      </View>
    );
};

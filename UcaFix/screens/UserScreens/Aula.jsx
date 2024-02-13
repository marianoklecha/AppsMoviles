import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Alert } from 'react-native';
import styles from '../styles'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import { Camara } from '..';

const API_URL = "http://localhost:3000";

export const Aula = (props) => {
  const [aula, setAula] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [Edificio, setEdificio] = React.useState("");

  console.log("### Aula ###");
  const propsUserData = props.route.params.userData;
  console.log(propsUserData);

  const data2 = [
    {key:'1', value:'Seleccione', disabled:true},
    {key:'2', value:'Santa María'},
    {key:'3', value:'San Alberto Magno'},
    {key:'4', value:'Santo Tomás Moro'},
    {key:'5', value:'San José'},
  ];

  const createPedido = async (title, content, image, fixed, authorID) => {
    try {
      const response = await fetch(API_URL + '/pedidos/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          image,
          fixed,
          authorID
        })
      });

      if (response.ok) {
        Alert.alert('Pedido Exitoso', 'Tu pedido ha sido realizado correctamente');
        // Clear input fields after successful request
        setAula("");
        setTitle("");
        setContent("");
        setEdificio("");
      } else {
        // Handle unsuccessful request
        Alert.alert('Error', 'Failed to submit your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleCreatePost = async () => {
    await createPedido(title, content, "imagefdsfdsf", false, propsUserData.id);
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
          <Text style={[styles.inputTitle]}>Edificio y Piso</Text>
          <SelectList 
            search={true} 
            setSelected={(val) => setEdificio(val)} 
            boxStyles={{ paddingVertical:"5%", borderRadius:10, backgroundColor:"#F9F9F9", borderWidth:0, color:"#8D8D8D" }}
            searchPlaceholder='Búsqueda'
            notFoundText='Edificio no encontrado'
            inputStyles={{ borderRadius:6, color:"#8D8D8D" }}
            dropdownStyles={{ borderRadius:6, borderWidth:0, backgroundColor:"#F9F9F9", color:"#8D8D8D" }}
            dropdownItemStyles={{ borderRadius:6, backgroundColor:"#E6E6E6", marginHorizontal:"4%", marginTop:"2%", color:"#8D8D8D" }}
            dropdownTextStyles={{ padding:4, color:"#8D8D8D" }}
            data={data2} 
            defaultOption={{ key:'1', value:'Seleccione' }}  
            save="value"
            value={Edificio}
          />
          <Text style={[styles.inputTitle, { marginTop:6 }]}>title</Text>
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

          <TouchableOpacity style={styles.buttonListo} onPress={() => handleCreatePost()}>
            <Text style={styles.buttonTextListo}>Listo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

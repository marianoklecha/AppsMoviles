import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Footer from './Footer';
import styles from './styles'; 

export function InputClassroomScreen(props) {
  const [aula, setAula] = useState('');
  const [motivo, setMotivo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png',
          }}
        />
        <Text style={styles.title}>UCA FIX</Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          <Text style={styles.inputTitle}>Número de aula</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 105"
            placeholderTextColor="#8D8D8D"
            onChangeText={(aula) => setAula(aula)}
          />

          <Text style={styles.inputTitle}>Motivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Silla rota, Pizarrón roto, Luz rota"
            placeholderTextColor="#8D8D8D"
            onChangeText={(motivo) => setMotivo(motivo)}
          />

          <Text style={styles.inputTitle}>Descripción</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Algo que quieras agregar"
            placeholderTextColor="#8D8D8D"
            onChangeText={(descripcion) => setDescripcion(descripcion)}
          />

          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://img.icons8.com/?size=256&id=59764&format=png',
              }}
            />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {!isKeyboardVisible && <Footer />}
    </View>
  );
}



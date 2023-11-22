import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import styles from '../../styles'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const AulaQR = (props) => {
  // Set a default value for 'aula'
  const [aula, setAula] = React.useState("105 Magno");
  const [motivo, setMotivo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.formContainer}>
          <Text style={styles.inputTitle}>Número de aula</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 105 Magno"
            placeholderTextColor="#8D8D8D"
            onChangeText={(aula) => setAula(aula)}
            value={aula} // Set the value prop to the state variable
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
              style={styles.buttonLogo}
              source={{
                uri: 'https://img.icons8.com/?size=256&id=59764&format=png',
              }}
            />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonListo} onPress={() => props.navigation.navigate('FinalizarArreglo')}>
            <Text style={styles.buttonTextListo}>Listo</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

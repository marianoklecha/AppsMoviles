import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import styles from '../styles'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const Aula = (props) => {
    return(
      <ScrollView style= {{backgroundColor:"white"}}>

      <View style = {styles.topBar}>
        <TouchableOpacity style={[styles.topBarButton1]} onPress={() => props.navigation.navigate('Aula')}>
            <Text style={styles.topBarButtonText1}>            Aulas            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topBarButton2]} onPress={() => props.navigation.navigate('EspacioComun')}>
            <Text style={styles.topBarButtonText2}>Espacios comunes</Text>
        </TouchableOpacity>
      </View>
        
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              style={styles.buttonLogo}
              source={{
                uri: 'https://img.icons8.com/?size=256&id=59764&format=png',
              }}
            />
            <Text style={styles.buttonText}>Cargar imagen/es</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonListo}>
            <Text style={styles.buttonTextListo}>Listo</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
      </ScrollView>
    );
};

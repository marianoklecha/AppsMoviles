import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import styles from '../styles'; 

export const EspacioComun = (props) => {
    const [biblioBanio, setBiblioBanio] = React.useState("");
    const [pisoEdificio, setPisoEdificio] = React.useState("");
    const data = [
        {key:'1', value:'Seleccione', disabled:true},
        {key:'2', value:'Biblioteca'},
        {key:'3', value:'Baño'},
    ]
    const data2 = [
        {key:'1', value:'Seleccione', disabled:true},
        {key:'2', value:'Santa María - Planta Baja'},
        {key:'3', value:'Santa María - Piso 1'},
        {key:'4', value:'Santa María - Piso 2'},
        {key:'5', value:'Santa María - Piso 3'},
        {key:'6', value:'San Alberto Magno - Planta Baja'},
        {key:'7', value:'San Alberto Magno - Piso 1'},
        {key:'8', value:'San Alberto Magno - Piso 2'},
        {key:'9', value:'San Alberto Magno - Piso 3'},
        {key:'10', value:'Santo Tomás Moro - Planta Baja'},
        {key:'11', value:'Santo Tomás Moro - Piso 1'},
        {key:'12', value:'Santo Tomás Moro - Piso 2'},
        {key:'13', value:'Santo Tomás Moro - Piso 3'},
        {key:'14', value:'San José - Planta Baja'},
        {key:'15', value:'San José - Piso 1'},
        {key:'16', value:'San José - Piso 2'},
        {key:'17', value:'San José - Piso 3'},
    ]

    return(
        <View style= {{marginBottom: "31%"}}>
        <View style = {styles.topBar}>
        <TouchableOpacity style={[styles.topBarButton2]} onPress={() => props.navigation.navigate('Aula')}>
            <Text style={styles.topBarButtonText2}>            Aulas            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topBarButton1]} onPress={() => props.navigation.navigate('EspacioComun')}>
            <Text style={styles.topBarButtonText1}>Espacios comunes</Text>
        </TouchableOpacity>
      </View>

        <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
         
        <View style={styles.formContainer}>
          <Text style={styles.inputTitle}>Biblioteca o Baño</Text>
          <SelectList 
                search={false} 
                setSelected={(val) => setBiblioBanio(val)} 
                boxStyles={{borderRadius:10, backgroundColor:"#F9F9F9",borderWidth:0,}}
                inputStyles={{borderRadius:6, color:"#8D8D8D", padding:"2%"}}
                dropdownStyles={{borderRadius:6,borderWidth:0,backgroundColor:"#F9F9F9"}}
                dropdownItemStyles={{borderRadius:6,backgroundColor:"#E6E6E6",marginHorizontal:"4%",marginTop:"4%"}}
                dropdownTextStyles={{padding:4,color:"#8D8D8D"}}
                data={data} 
                defaultOption={{ key:'1', value:'Seleccione' }}  
                save="value"/>

            <Text style={[styles.inputTitle,{marginTop:"4%"}]}>Edificio y Piso</Text>
            <SelectList 
                search={true} 
                setSelected={(val) => setBiblioBanio(val)} 
                boxStyles={{paddingVertical:"5%",borderRadius:10, backgroundColor:"#F9F9F9",borderWidth:0,color:"#8D8D8D"}}
                searchPlaceholder='Búsqueda'
                notFoundText='Edificio no encontrado'
                inputStyles={{borderRadius:6, color:"#8D8D8D"}}
                dropdownStyles={{borderRadius:6,borderWidth:0,backgroundColor:"#F9F9F9",color:"#8D8D8D"}}
                dropdownItemStyles={{borderRadius:6,backgroundColor:"#E6E6E6",marginHorizontal:"4%",marginTop:"2%",color:"#8D8D8D"}}
                dropdownTextStyles={{padding:4,color:"#8D8D8D"}}
                data={data2} 
                defaultOption={{ key:'1', value:'Seleccione' }}  
                save="value"/>
          

          <Text style={[styles.inputTitle,{marginTop:"4%"}]}>Motivo</Text>
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
      </View>
    );
};

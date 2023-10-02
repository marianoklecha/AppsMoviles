import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Input,
  Text,
  Image,
  View,
} from 'react-native';
import Footer from '../Footer';

export function FinalizarArreglo(props) {
    const [comentario, setComentario] = React.useState("");

    const onTap = (nextScreen) => {
      props.navigation.navigate(nextScreen);
    };
    return (
      <SafeAreaView style={styles.back}>
            <ScrollView>
            <View style={styles.TitleContainer}>
            <Image
                style={styles.UcaLogo}
                source={{
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'
                }}
                />
                <Text style={[styles.title]}>UCA FIX</Text>
            </View>
            <View style={styles.tituloPagina}>
                <Text style={styles.textoTituloPagina}>Arreglo en Proceso</Text>
            </View>
            <View style={styles.container}>
            
                <Text style={styles.tituloPedido}>Pizarrón roto</Text>
                <View>
                    <Text style={styles.aulaPedido}>105 San Alberto Magno</Text>
                    <Image style={styles.fotoPedido} 
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tafel_%28Lehrmittel%29.jpg'}}></Image>
                    <Text style={styles.descripcionPedido}>Descripción del problema:</Text>
                    <Text style={styles.descripcionTexto}>El pizarrón se encuentra roto, le falta un tornillo y no se puede escribir bien</Text>
                </View>
                


            </View>

            <View style={styles.containerFinalizar}>

                <View style={styles.tituloPagina}>
                    <Text style={styles.textoTituloPagina}>Completar luego del arreglo</Text>
                </View>

                <Text style={[styles.inputTitle,{marginTop:"4%"}]}>Comentarios que quiera agregar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribir acá"
                    placeholderTextColor="#8D8D8D"
                    onChangeText={(comentario) => setComentario(comentario)}
                />

                <TouchableOpacity style={styles.button}>
                        <Image
                        style={styles.buttonLogo}
                        source={{
                            uri: 'https://img.icons8.com/?size=256&id=59764&format=png',
                        }}
                        />
                        <Text style={styles.buttonText}>Cargar imagen/es del trabajo realizado</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonListo} onPress={() => props.navigation.navigate('FinalizarArreglo')}>
                    <Text style={styles.buttonTextListo}>Finalizar arreglo</Text>
                </TouchableOpacity>

            </View>
            
            <Footer/>
            
            </ScrollView>
            
            
      </SafeAreaView>
      
      
    );
  };
  
  const styles = StyleSheet.create({
    back:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
    },
    button: {
        marginBottom: "5%",
        padding: 15,
        flexDirection: 'row',
        justifyContent:"space-evenly",
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
        marginHorizontal: '10%',
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    buttonLogo: {
        marginTop: "4%",
        width: 40,
        height:25
    },
    tinyLogo: {
      width: 50,
      height: 50,
      tintColor: 'black'
    },
    text :{
      fontSize: 25,
      marginBottom:20,
      color: 'black',
    },
    title :{
      fontSize: 37,
      color: 'black',
      fontWeight: 'bold',
  
    },
    TitleContainer:{
      flexDirection: 'row', 
      justifyContent: 'left',
      //backgroundColor: '#3FA7D6',
      padding: 10
    },
    UcaLogo:{
      width: 35,
      height: 35,
      marginTop: "2.5%",
      marginLeft: "3%",
      marginRight:"3%"
    },
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',  // Align items to the right
      backgroundColor: '#2F61AF',
      padding:'2%',
      
    },
    container: {
        marginTop:'5%',
        alignContent:"left",
        borderRadius:10,
        marginHorizontal: '5%',
        backgroundColor: '#EAEAEA',
        padding: "3%"
    }
    ,
    containerFinalizar: {
        marginTop:'5%',
        borderRadius:10,
        marginHorizontal: '5%',
        backgroundColor: '#EAEAEA',
        marginBottom:"23%"
    }
    ,
    buttonListo: {
        padding: 10,
        marginHorizontal:"15%",
        borderRadius: 6,
        backgroundColor: '#5992F2',
        marginBottom:"5%"
        
      },
      buttonTextListo: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        
      },
      tituloPagina:{
        marginHorizontal:"5%",
        marginTop:'5%',
      },
      textoTituloPagina:{
        fontSize:25,
        color: "black",
        fontWeight: "500"
      },
      tituloPedido:{
        fontSize:25,
        color: "black",
        fontWeight: "800",
        textAlign:"center"
      },
      aulaPedido:{
        fontSize:18,
        color: "black",
        fontWeight: "800",
        textAlign:"center"
      },
      fotoPedido: {
        marginHorizontal:"5%",
        marginTop:'5%',
        height:150,
        width:190
    },
    descripcionPedido:{
        marginTop:'5%',
        fontSize:15,
        color: "black",
        fontWeight: "600",
        textAlign:"center"
    },
    descripcionTexto:{
    fontSize:15,
    color: "black",
    },
    input: {
        borderColor: 'gray',
        color: 'black',
        borderRadius: 10,
        marginHorizontal:"5%",
        padding: 15,
        backgroundColor: '#F9F9F9',
        marginBottom: "5%"
      },
      inputTitle: {
        marginHorizontal:"5%",
        color: 'black',
        fontSize: 15,
      },
  });
import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  FlatList
} from 'react-native';

export function EstadisticasAula(props) {
    const aulasPedidos = [
        { id: 1, building: 'Magno', aula: 160, cant_pedR:15,cant_pedPen:3,porcentaje:83 },
        { id: 4, building: 'Moro' , aula: 210, cant_pedR:5,cant_pedPen:0,porcentaje:100},
        { id: 5, building: 'Moro', aula: 340,cant_pedR: 2,cant_pedPen:20,porcentaje:10 },
      ];
        const edificiosPedidosTotales = [
            { edificio: 'Magno', pedidosTotales: 150 },
            { edificio: 'Moro', pedidosTotales: 60 },
            { edificio: 'San José', pedidosTotales: 20 },
        ];
    const onTap = (nextScreen) => {
      props.navigation.navigate(nextScreen);
    };
    const UserName = props;
    console.log(UserName)
    const renderItem = ({ item }) => (
        <View style={styles.requestItem}>
        <View style={styles.TitleRContainer}>
          <Text style={styles.requestName}>{item.building}</Text>
          <Text style={styles.requestBuilding}>{item.aula}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.additionalInfo}>Res: {item.cant_pedR}</Text>
          <Text style={styles.additionalInfo}>Pend: {item.cant_pedPen}</Text>
          <Text style={styles.additionalInfo}>Porc: {item.porcentaje}%</Text>
        </View>
      </View>
      );
    return (
      
      
      // 
      <View style={styles.back}>

        <View style={styles.TitleContainer} >
        <Image
              style={styles.UcaLogo}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'
              }}
            />
            <Text style={[styles.title]}>UCA FIX</Text>
            
        </View>
        
        <SafeAreaView style={styles.container}>

        <View style={styles.containerPedidosComplet}>
      <Text style={styles.completedRequestsLabel}>ESTADISTICAS PEDIDOS</Text>
      </View>

        <FlatList
        data={aulasPedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        />

        </SafeAreaView>


          
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    back:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
  
    },
    container: {
      marginTop:'10%',
      justifyContent: 'center',
      marginHorizontal: '10%',
      //backgroundColor: '#021B6F'
    },
    button: {
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: 'white',
      
    },
    buttonSesion: {
      borderRadius: 6,
      
      padding:'3%',
      marginHorizontal: 50
    },
    buttonTextSesion: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
      textAlign:"center",
      padding:'2%',
      
    },
    buttonText: {
      marginTop: 10,
      marginLeft: 20,
      fontSize: 20,
      color: "white",
      fontWeight: "bold"
    },
    tinyLogo: {
      width: 300,
      height: 300,
    },
    text :{
      fontSize: 25,
      marginBottom:20,
      color: 'black',
    },
    title :{
      fontSize: 55,
      marginTop:20,
      color: 'black',
      fontWeight: 'bold',
      marginBottom:'2%'
  
    },
    TitleContainer:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#3FA7D6',
      marginTop: '15%'
    },
    UcaLogo:{
      width: 50,
      height: 50,
      marginTop:15,
    },
    footerContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between',  // Align items to the right
      backgroundColor: '#2F61AF',
      padding:'2%',
      
    },
    requestItem: {
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#DADBDF',
        justifyContent: 'space-between',
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      TitleRContainer:{
        flexDirection:'row'
      },
      requestName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight:'2%',
      },
      requestBuilding: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
      },
      additionalInfo: {
        fontSize: 14,
        color: 'gray',
      },
      containerPedidosComplet:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom:5,
        backgroundColor: '#2F61AF'
      },
      completedRequestsLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });
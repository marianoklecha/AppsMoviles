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
          <Text style={styles.additionalInfo}>Porc. comp: {item.porcentaje}%</Text>
        </View>
      </View>
      );
    return (
      
      
      // 
      <View style={styles.back}>

      <View style={styles.header}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC',
          }}
        />
        <Text style={styles.title}>UCA FIX</Text>
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

      <Image
        source={require('./grafico.png')}
        style={styles.imagen}
        
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      padding: '3%',
      marginTop: '4%',
      
    },
    UcaLogo: {
      width: 30,
      height: 30,
      marginLeft: '5%',
      marginRight:5
      
    },
    title: {
      fontSize: 30,
      marginTop: 5,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: '2%',
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
        marginTop: 2
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
      imagen:{
        marginTop:30,
        width: 280,
        height: 200,
        
      }
  });

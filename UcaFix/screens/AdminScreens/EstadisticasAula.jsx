import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';
import { PieChart} from 'react-native-chart-kit';

const API_URL = "http://localhost:3000";

export function EstadisticasAula(props) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(API_URL + `/pedidos/getPedidos`);
      if (response.ok) {
        const data = await response.json();
        setPedidos(data);
      } else {
        Alert.alert("Error", "Failed to fetch pedidos");
      }
    } catch (error) {
      console.error("Error fetching pedidos: ", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const buildingCounts = pedidos.reduce((acc, pedido) => {
    acc[pedido.edificioId] = (acc[pedido.edificioId] || 0) + 1;
    return acc;
  }, {});
  
  const totalPedidos = Object.values(buildingCounts).reduce((acc, count) => acc + count, 0);

  const colors = ['#8F39E1', '#69CA45', '#F0AD43', '#EDEA42'];
  const edificios = ["Magno", "Moro","Santa Maria",  "San Jose"];

  const data = Object.keys(buildingCounts).map((buildingId, index) => ({
    name: edificios[index % edificios.length],
    pedidos: (buildingCounts[buildingId] / totalPedidos) * 100 ,
    color: colors[index % colors.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  }));

  const edificioPedidos = {};
  pedidos.forEach(pedido => {
      const { edificioId, fixed } = pedido;
      if (!edificioPedidos[edificioId]) {
          edificioPedidos[edificioId] = { total: 0, fixed: 0, nonFixed: 0 };
      }
      edificioPedidos[edificioId].total++;
      if (fixed) {
          edificioPedidos[edificioId].fixed++;
      } else {
          edificioPedidos[edificioId].nonFixed++;
      }
  });

  const UserName = props;
  console.log(UserName)
  
  return (
    <View style={styles.back}>
      <View style={styles.header}>
        <Image style={styles.UcaLogo}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'}}
        />
        <Text style={styles.title}>UCA FIX</Text>
      </View>
      
      <SafeAreaView style={styles.container}>
        <View style={styles.pieChartView}>
          <Text style={styles.subtitle1}>Distribución por edificios de los pedidos recibidos</Text>

          <PieChart
            data={data}
            width={Dimensions.get('window').width - 10}
            height={210}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              strokeWidth: 0,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,
                labels: {
                  fontWeight: 'bold',
                },                
              },
            }}
            accessor="pedidos"
            backgroundColor="white"
            center={[0, 0]}   
            hasLegend       
          />
        </View>
        
        <Text style={styles.subtitle1}>Estado actual de todos los pedidos recibidos</Text>

        <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
                <Text style={styles.columnHeader}>  Edificio</Text>
                <Text style={styles.columnHeader}>     Recibidos </Text>
                <Text style={styles.columnHeader}>   Arreglados </Text>
                <Text style={styles.columnHeader}> Pendientes</Text>
            </View>
            {Object.keys(edificioPedidos).map(edificioId => (
                <View style={styles.tableRow} key={edificioId}>
                    <Text style={styles.columnData}>{edificios[edificioId - 1]}</Text>
                    <Text style={styles.columnData}>{edificioPedidos[edificioId].total}</Text>
                    <Text style={styles.columnData}>{edificioPedidos[edificioId].fixed}</Text>
                    <Text style={styles.columnData}>{edificioPedidos[edificioId].nonFixed}</Text>
                </View>
            ))}
        </View>
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
      justifyContent: 'center',
      marginHorizontal: '3%',
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
    TitleContainer:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#3FA7D6',
      marginTop: '15%',
      
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      padding: '5%',
      paddingTop: '5%',
    
      backgroundColor: "white"
      
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
      justifyContent: 'space-between',
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
        
      },
      subtitle1:{
        marginTop: 10,
        
        marginLeft: 10,
        fontSize: 15,
        color: 'black',
        textAlign: "center",
        fontWeight: "600",
      },
      
    tableContainer: {
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      marginTop: 10,
      backgroundColor: 'white', 
  },
  tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: "#788EB2",
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
  },
  columnHeader: {
      fontWeight: 'bold',
      textAlign: "center",
      color: "white",
      
  },
  tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#F6F6F6", 
      
  },
  columnData: {
      flex: 1,
      textAlign: 'center',
      color: "black",
      fontWeight: '400',
      
  },
  pieChartView: {
    marginBottom: "1%"
  }
    
      
  });

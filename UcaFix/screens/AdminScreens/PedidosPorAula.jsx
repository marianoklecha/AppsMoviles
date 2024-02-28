import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl
} from 'react-native';

export function PedidosPorAula(props) {
  const [pedidos, setPedidos] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState('notFixed');
  const [edificio, setEdificio] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  let pisoDisponible = false;

  useEffect(() => {
    fetchEdificios();
    fetchPedidos();
  }, []);

  const propsUserData = props.route.params.userData;
  const aulaInfo = props.route.params.aulaInfo;
  const aula = aulaInfo.aula.toString();
  const piso = aulaInfo.piso;
  const edificioId = aulaInfo.edificioId;
  if (aula === 'Baño' || aula === 'Biblioteca'){ pisoDisponible = true}
  console.log(aula);
  console.log(edificioId);
  console.log(piso);
  
  const fetchEdificios = async () => {
    try {
      const response = await fetch("http://localhost:3000/edificios/getEdificios");
      if (response.ok) {
        const edificios = await response.json();
        for (const edificio of edificios) {
        if (edificio.id === edificioId) {
        setEdificio(edificio.nombre);
        console.log(edificio)
          break;
        }
    }
      } else {
        Alert.alert("Error", "Failed to fetch Edificios");
      }
    } catch (error) {
      console.error("Error fetching Edificios: ", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await fetch("http://localhost:3000/pedidos/getPedidosByAula?aula="+ aula +"&edificioId=" + edificioId);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchPedidos();
      setRefreshing(false);
    }, 500);
  }, []);

  const handleRequestClick = (item) => {
    setSelectedRequest(selectedRequest === item.id ? null : item.id);
  };

  const filteredRequests = pedidos.filter((item) => {
    if (item.fixed === false && filter === 'notFixed') {
      return true;
    }
  });

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <View style={styles.back}>
      <View style={styles.header}>
        <Image style={styles.UcaLogo}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'}}
        />
        <Text style={styles.title}>UCA FIX</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.subtitle1}>Pedidos pendientes en:</Text>
        <Text style={styles.subtitle2}>{aula} - {edificio}</Text>
        {pisoDisponible && <Text style={styles.subtitle2}>Piso {piso}</Text>}
      </View>

      <ScrollView style={styles.scrollView} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {filteredRequests.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleRequestClick(item)}
            style={styles.requestItem}
          >
            <View style={[styles.statusIndicator, { backgroundColor: item.fixed ? 'green' : 'red' }]} />
            
            <View style={styles.requestInfo}>
              <Text style={styles.requestText}>{` ${item.title}`}</Text>

              {selectedRequest === item.id && (
                <View style={styles.detailsContainer}>
                  <Image
                    style={styles.pedidoImagen}
                    source={{
                      uri: item.image
                    }}
                  />
                  <Text style={styles.detailsText}>{item.content}</Text>
                  <Text style={styles.detailsText}>Solicitado el día: {formatDate(item.createdAt)}</Text> 
                </View>
              )}
            </View>
            
            {!item.fixed && (
              <TouchableOpacity
                style={styles.fixButton}
                onPress={() => props.navigation.navigate('FinalizarArreglo', { pedido: item })}
              >
                <Text style={styles.fixButtonText}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  statusIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
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
  TitleContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F9F9F9'
 
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding:10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#D1D1D1',
  },
  activeModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2F61AF',
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 50,
    marginLeft: 15,
    marginRight: 15,

  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#F3F5F8',
    borderRadius: 15,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 10,
    color: 'black',

  },
  requestText: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    
  },
  detailsContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center"
  },
  detailsText: {
    marginBottom: 5,
    color: "black"
  },
  subtitle1:{
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
    textAlign: "center"
  },
  subtitle2:{
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: "center"
  },
  pedidoImagen: {
    width: 80,
    height: 120,
    margin: 15,
  },
  fixButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  fixButtonText : {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#6D6D6D',
  }
});
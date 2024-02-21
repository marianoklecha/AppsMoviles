import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';


export function PedidosPorAula(props) {
  const [pedidos, setPedidos] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState('notFixed');
  const [piso, setPiso] = useState("");
  const [edificio, setEdificio] = useState("");

  const propsUserData = props.route.params.userData;
  const aulaInfo = props.route.params.aulaInfo;
  const aula = aulaInfo.aula.toString();
  const edificioId = aulaInfo.edificioId;
  console.log(aula);
  console.log(edificioId);
  useEffect(() => {
    fetchEdificios();
    fetchPedidos();
  }, []);

  const fetchEdificios = async () => {
    try {
      const response = await fetch("http://localhost:3000/edificios/getEdificios");
      if (response.ok) {
        const edificios = await response.json();
        for (const edificio of edificios) {
        if (edificio.id === edificioId) {
        setEdificio(edificio.nombre);
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

  const handleRequestClick = (item) => {
    setSelectedRequest(selectedRequest === item.id ? null : item.id);
  };

  const filteredRequests = pedidos.filter((item) => {
    if (item.fixed === false && filter === 'notFixed') {
      return true;
    }
  });

  return (
    <View style={styles.back}>
      {/* Header code */}
      <View style={styles.TitleContainer}>
        <Image
          style={styles.UcaLogo}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png'
          }}
        />
        <Text style={[styles.title]}>UCA FIX</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.subtitle1}>Pedidos pendientes en:</Text>
        <Text style={styles.subtitle2}>{aula} - {edificio}</Text>
      </View>

      {/* List of requests */}
      <ScrollView style={styles.scrollView}>
  {filteredRequests.map((item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleRequestClick(item)}
      style={styles.requestItem}
    >
      {/* Status indicator */}
      <View style={[styles.statusIndicator, { backgroundColor: item.fixed ? 'green' : 'red' }]} />
      {/* Request information */}
      <View style={styles.requestInfo}>
        <Text style={styles.requestText}>{` ${item.title}`}</Text>
        {/* Expanded details */}
        {selectedRequest === item.id && (
          <View style={styles.detailsContainer}>
            <Image
              style={styles.UcaLogo}
              source={{
                uri: item.image
              }}
            />
            <Text style={styles.requestText}>{` ${item.aula}`}</Text>
            <Text style={styles.detailsText}>{item.content}</Text>
          </View>
        )}
      </View>
      {/* FIX button */}
      {!item.fixed && (
        <TouchableOpacity
        style={styles.fixButton}
        onPress={() => props.navigation.navigate('FinalizarArreglo', { pedido: item })}
      >
        <Text style={styles.fixButtonText}>FIX</Text>
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
  title: {
    fontSize: 55,
    marginTop: 20,
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
  UcaLogo: {
    width: 50,
    height: 50,
    marginTop: 15,
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
  },
  detailsText: {
    marginBottom: 5,
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
});
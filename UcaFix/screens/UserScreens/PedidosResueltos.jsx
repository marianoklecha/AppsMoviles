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

const API_URL = "http://localhost:3000";

export function PedidosResueltos(props) {
  const [pedidos, setPedidos] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState('all');

  const propsUserData = props.route.params.userData;
  const edificios = ["San Alberto Magno", "Santo Tomas Moro","Santa Maria",  "San Jose"];

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(API_URL + `/pedidos/getPedidosByUser?authorId=` + propsUserData.id);
      
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

  
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };


  const filteredRequests = pedidos.filter((item) => {
    if (filter === 'all') {
      return true;
    } else if (item.fixed === true && filter === 'fixed') {
      return true;
    } else if (item.fixed === false && filter === 'notFixed') {
      return true;
    }else if (item.edificioId === 1 && filter === 1) {
      return true;
    } else if (item.edificioId === 2 && filter === 2) {
      return true;
    }else if (item.edificioId === 3 && filter === 3) {
      return true;
    }else if (item.edificioId === 4 && filter === 4) {
      return true;
    } else if (item.aula === "Biblioteca" && filter === "Biblioteca") {
      return true;
    } else if (item.aula === "Baño" && filter === "Baño") {
      return true;
    }
    return false;
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

      {/* Filter code */}
      <View style={styles.filterContainer}>
        <Text style={styles.subtitle}>Tus Pedidos</Text>
        {/* Filter button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        {/* Filter modal */}
        <Modal
          animationType="slide-up"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(!filterModalVisible)}
        >
          {/* Modal content */}
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TouchableOpacity
                style={filter === 'all' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter('all');
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 'fixed' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter('fixed');
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Terminado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 'notFixed' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter('notFixed');
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>No Terminado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 'San Alberto Magno' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter(1);
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>San Alberto Magno</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 2 ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter(2);
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Santo Tomas Moro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 3 ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter(3);
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Santa Maria</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 4 ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter(4);
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>San Jose</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 'Biblioteca' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter('Biblioteca');
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Biblioteca</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={filter === 'Baño' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter('Baño');
                  setFilterModalVisible(!filterModalVisible);
                }}
              >
                <Text style={styles.modalButtonText}>Baño</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* List of requests */}
      <ScrollView style={styles.scrollView} >
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
              <Text style={styles.requestTitle}>{` ${item.title}`}</Text>
              <Text style={styles.requestAula}>{` ${item.aula} - ${edificios[item.edificioId - 1]}` }</Text>
              {/* Expanded details */}
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
    flexDirection: 'row',
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
    marginLeft: 15,
    marginRight: 15,

  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 17,
    marginBottom: 20,
    backgroundColor: '#F3F5F8',
    borderRadius: 15,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 10,
    color: 'black',

  },
  requestAula: {
    fontSize: 13,
    color: 'black',
    
  },
  requestTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    
  },
  detailsContainer: {
    flex: 1,
    marginTop: 10,
   // backgroundColor: "yellow",
    alignItems: "center"
  },
  detailsText: {
    marginBottom: 5,
    color: "black"
  },
  subtitle:{
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    
  },
  pedidoImagen: {
    width: 80,
    height: 120,
    margin: 15,
  },
});


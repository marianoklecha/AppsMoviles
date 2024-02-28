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
import { useNavigation } from '@react-navigation/native';

const API_URL = "http://localhost:3000";

export function HistorialDePedidos(props) {
  const [pedidos, setPedidos] = useState([]);
  const [adminNombres, setAdminNombres] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState('all');

  const propsUserData = props.route.params.userData;
  const edificios = ["San Alberto Magno", "Santo Tomas Moro","Santa Maria",  "San Jose"];

  useEffect(() => {
    fetchPedidos();
    fetchAdminNombres();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(API_URL + `/pedidoResuelto/getPedidosResueltos`);
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
    console.log(pedidos);
  };

  const fetchAdminNombres = async () => {
    try {
      const response = await fetch(API_URL + `/users/getNombreOfAdmins`);
      if (response.ok) {
        const data = await response.json();
        setAdminNombres(data);
      } else {
        Alert.alert("Error", "Failed to fetch pedidos");
      }

    } catch (error) {
      console.error("Error fetching pedidos: ", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
    console.log(adminNombres);
  };

  const handleRequestClick = (item) => {
    setSelectedRequest(selectedRequest === item.id ? null : item.id);
  };

  const navigation = useNavigation();

  const filteredRequests = pedidos.filter((item) => {
    if (filter === 'all') {
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
        <Text style={styles.subtitle}>Arreglos realizados</Text> 
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filtro</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide-up"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(!filterModalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TouchableOpacity
                style={filter === 'all' ? styles.activeModalButton : styles.modalButton}
                onPress={() => {
                  setFilter('all');
                  setFilterModalVisible(!filterModalVisible);
                }}>
              <Text style={styles.modalButtonText}>Todos</Text>
            </TouchableOpacity>
              
            <TouchableOpacity
              style={filter === 'San Alberto Magno' ? styles.activeModalButton : styles.modalButton}
              onPress={() => {
                setFilter(1);
                setFilterModalVisible(!filterModalVisible);
              }}>
              <Text style={styles.modalButtonText}>San Alberto Magno</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={filter === 2 ? styles.activeModalButton : styles.modalButton}
              onPress={() => {
                setFilter(2);
                setFilterModalVisible(!filterModalVisible);
              }}>
              <Text style={styles.modalButtonText}>Santo Tomas Moro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={filter === 3 ? styles.activeModalButton : styles.modalButton}
              onPress={() => {
                setFilter(3);
                setFilterModalVisible(!filterModalVisible);
              }}>
              <Text style={styles.modalButtonText}>Santa Maria</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={filter === 4 ? styles.activeModalButton : styles.modalButton}
              onPress={() => {
                setFilter(4);
                setFilterModalVisible(!filterModalVisible);
              }}>
              <Text style={styles.modalButtonText}>San Jose</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={filter === 'Biblioteca' ? styles.activeModalButton : styles.modalButton}
              onPress={() => {
                setFilter('Biblioteca');
                setFilterModalVisible(!filterModalVisible);
              }}>
              <Text style={styles.modalButtonText}>Biblioteca</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={filter === 'Baño' ? styles.activeModalButton : styles.modalButton}
              onPress={() => {
                setFilter('Baño');
                setFilterModalVisible(!filterModalVisible);
              }}>
              <Text style={styles.modalButtonText}>Baño</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View> 

    <ScrollView style={styles.scrollView} >
      {filteredRequests.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleRequestClick(item)}
          style={styles.requestItem}
        > 
          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>{`${item.title}`}</Text>
            <Text style={styles.requestAula}>{`${item.aula} - ${edificios[item.edificioId - 1]}` }</Text>
            
            {item.pedidosResueltos.map((pedidoResuelto, index) => (
              <Text key={index} style={styles.requestText}>
                Arreglado por:{" "}
                {adminNombres.find(admin => admin.userId === pedidoResuelto.adminId)?.name}
              </Text>
            ))}

            {selectedRequest === item.id && (
              <View  style={styles.detailsContainer}>
                <Text style={styles.pedidoDescripcion}>Descripción del pedido</Text>
                <Image style={styles.pedidoImagen} source={{uri: item.image}}/>
                <Text style={styles.detailsText}>{item.content}</Text>
                <Text style={styles.detailsText}>Solicitado: {formatDate(item.createdAt)}</Text> 
                <Text style={styles.pedidoDescripcion}>Descripción del arreglo</Text>

                {item.pedidosResueltos.map((pedidoResuelto, index) => (
                  <>
                  <Image
                    key={item.id}
                    style={styles.pedidoImagen}
                    source={{uri: pedidoResuelto.imageFixed}}/>
                  <Text key={index+1000} style={styles.detailsText}>{pedidoResuelto.comments}</Text>
                  <Text key={index+2000} style={styles.detailsText}>Fin del arreglo: {formatDate(pedidoResuelto.createdAt)}</Text>
                  </>
                ))}

                        
                
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
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  TitleContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 14,
    marginBottom: 20,
    backgroundColor: '#F3F5F8',
    borderRadius: 15,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 10,
    color: 'black',

  },
  pedidoDescripcion: {
    fontSize: 15,
    color: 'black',
    fontWeight: "bold"
  },
  detailsContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "#CECECE",
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  subtitle:{
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',

  },
  fixThisButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#2F61AF',
  },
  fixThisButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: '#F9F9F9',
    elevation: 1,
 
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  pedidoImagen: {
    width: 80,
    height: 120,
    margin: 15,
  },
  requestTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    
  },
  requestAula: {
    fontSize: 15,
    color: 'black',
    marginBottom: 3
    
  },
  requestText: {
    marginBottom: 5,
    fontSize: 15,
    color: 'black',
    
  },
  detailsText: {
    marginBottom: 5,
    color: "black"
  },
});

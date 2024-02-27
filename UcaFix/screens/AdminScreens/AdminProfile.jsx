import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';

const API_URL = "http://localhost:3000";
export function AdminProfile(props) {
  const propsUserData = props.route.params.userData;
  const edificios = ["San Alberto Magno", "Santo Tomas Moro","Santa Maria",  "San Jose"];
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(API_URL + `/pedidoResuelto/getPedResueltosByUser?adminId=` + propsUserData.id);
      
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

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestName}>{item.pedido.title}</Text>
      <Text style={styles.requestBuilding}>{` ${item.pedido.aula} - ${edificios[item.pedido.edificioId - 1]}`}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <Image style={styles.UcaLogo}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'}}
        />
        <Text style={styles.title}>UCA FIX</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADmElEQVR4nO2aaahNURTHf8/8zIQ3KD1DMmQmJUkSkUgS+aBk9sFc8uGlzF+EL0QhvpAoyZBQJCUpU0mmh8w8lHim0K7/rd3p3HPOvfte+yj/WvW6b691/v9zzt5rr7UP/Md//DMYBKwBLgD3gc+yJ8BhYBJQQorRCzgD/E5gx4DmpBCjdNcNyVpgOzAe6AI0BUqBbsBi4K3GfQEOAGWkBH0tEfuANjHjhwI3gJ/yeQCUkwJcEqE9Ob77nYGr8j2OZwwWkbd5vvPmSXxUjCF4xFqR2OYQY4tibMUjToqEWVJdFgoT4woecUckejvE6KQYr/CIZyLR1SFGY+CXrBRPeCohJhm6ILN8t8YTbovAQIcYjayM3wBPOCoCUxxilCuGeSresE4kzDLsumpdwyNmFCAzVyvGTjxivki8cIhxWTH24hG3RGKmQ4xh2kB+BerhCa8lpKNjnFrfy+8FEZjmEKNSMT74rByXi8QjYEUe/hOtOXIIj2gGXBcRUyzlioPyfQd0xzPaAj9kLXLwMxP7pYT0JyW4KEJzc/AZ7/Aki54YHwJNEoxvaL2SC0gR6gM3ReyIiEZhh8beTTD2r6OP5okh2CpmrKnT32fZNfcJ6YMNKBLnSIJJhNRYIioD+WNqiJBZ1v9L5JMKIT2tnpjpwJy1dgfVIUJMw8+gA3BKPsa36ELOJ6jjMyIyZM02ZZNVddr2BtiszWnmt6KJMXf0u3Wh72r1tMwy1haRr73JMXfFosTqGtr2TbvbsPGnCyBkV6EE9ACq9Pd0dULsC82L8C2zds/52JMsTzunnDEZOCfid6yAG6wLmVwRh/0OQjblK8CQXQU8Dgl6Qnunejr7uKTuSBjGAsuA3cCnkFh1wFI1JSo0ti7L/DDl8RJgTFIRc+QYdYfMqoImX+bMY2HIHIm700sjyoUoi0Sp1fKJs1/ac2UwWpk+mJXj4pSH8KhwEdJI+SCX99acQo3U+v5OR3FBxMWoKLSQ9Q4TMWMT8hCyPMRnZb5CKgPJLR/7kGXCtwNGqJX0PMSvTmIqZCvUYQmOe6rFZ2zU0d3qAjwNc9BZzOV3c4L4Bcm6s2Ou0U+Z3+WJV8UJeVQAIcMTVogudjmugx+WgHK1qN1vmWoS12vUpOGcviogxiRcs8W5l2Vibwwk5Zokr9bfQic1LMw3Ku3126IQIabYQh8j7NKG0XxVkSoE64lxIUJM+Rvlk0qYMjgoxDQkIvEHzzBVgMFaqUsAAAAASUVORK5CYII=' }} 
          />
          <Text style={styles.name}>{propsUserData.name}</Text>
          <Text style={styles.email}>{propsUserData.email}</Text>
        </View>
        <View style={styles.containerPedidosComplet}>
          <Text style={styles.completedRequestsLabel}>Pedidos Completados</Text>
        </View>
        <FlatList
          data={pedidos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingLeft:20,
    paddingRight:20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
    margin: 15,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
  },
  email: {
    fontSize: 16,
    color:'black',
  },
  completedRequestsLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  requestItem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#DADBDF'

  },
  requestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
  },
  requestBuilding: {
    fontSize: 16,
    color: "black"
  },
  containerPedidosComplet:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom:5,
    backgroundColor: '#2F61AF'
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
});
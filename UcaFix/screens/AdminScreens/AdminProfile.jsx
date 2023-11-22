import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

export function AdminProfile(props) {
  const userName = 'camila';
  const userEmail = 'camila@uca.edu.ar';
  const completedRequests = [
    { id: 1, request: 'Pizarron Roto', building: 'Magno' },
    { id: 4, request: 'Silla Rota', building: 'Moro' },
    { id: 5, request: 'Proyector no funciona', building: 'Moro' },
    { id: 6, request: 'Proyector no funciona', building: 'Moro' },
    { id: 7, request: 'Proyector no funciona', building: 'Moro' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestName}>{item.request}</Text>
      <Text style={styles.requestBuilding}>{item.building}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADmElEQVR4nO2aaahNURTHf8/8zIQ3KD1DMmQmJUkSkUgS+aBk9sFc8uGlzF+EL0QhvpAoyZBQJCUpU0mmh8w8lHim0K7/rd3p3HPOvfte+yj/WvW6b691/v9zzt5rr7UP/Md//DMYBKwBLgD3gc+yJ8BhYBJQQorRCzgD/E5gx4DmpBCjdNcNyVpgOzAe6AI0BUqBbsBi4K3GfQEOAGWkBH0tEfuANjHjhwI3gJ/yeQCUkwJcEqE9Ob77nYGr8j2OZwwWkbd5vvPmSXxUjCF4xFqR2OYQY4tibMUjToqEWVJdFgoT4woecUckejvE6KQYr/CIZyLR1SFGY+CXrBRPeCohJhm6ILN8t8YTbovAQIcYjayM3wBPOCoCUxxilCuGeSresE4kzDLsumpdwyNmFCAzVyvGTjxivki8cIhxWTH24hG3RGKmQ4xh2kB+BerhCa8lpKNjnFrfy+8FEZjmEKNSMT74rByXi8QjYEUe/hOtOXIIj2gGXBcRUyzlioPyfQd0xzPaAj9kLXLwMxP7pYT0JyW4KEJzc/AZ7/Aki54YHwJNEoxvaL2SC0gR6gM3ReyIiEZhh8beTTD2r6OP5okh2CpmrKnT32fZNfcJ6YMNKBLnSIJJhNRYIioD+WNqiJBZ1v9L5JMKIT2tnpjpwJy1dgfVIUJMw8+gA3BKPsa36ELOJ6jjMyIyZM02ZZNVddr2BtiszWnmt6KJMXf0u3Wh72r1tMwy1haRr73JMXfFosTqGtr2TbvbsPGnCyBkV6EE9ACq9Pd0dULsC82L8C2zds/52JMsTzunnDEZOCfid6yAG6wLmVwRh/0OQjblK8CQXQU8Dgl6Qnunejr7uKTuSBjGAsuA3cCnkFh1wFI1JSo0ti7L/DDl8RJgTFIRc+QYdYfMqoImX+bMY2HIHIm700sjyoUoi0Sp1fKJs1/ac2UwWpk+mJXj4pSH8KhwEdJI+SCX99acQo3U+v5OR3FBxMWoKLSQ9Q4TMWMT8hCyPMRnZb5CKgPJLR/7kGXCtwNGqJX0PMSvTmIqZCvUYQmOe6rFZ2zU0d3qAjwNc9BZzOV3c4L4Bcm6s2Ou0U+Z3+WJV8UJeVQAIcMTVogudjmugx+WgHK1qN1vmWoS12vUpOGcviogxiRcs8W5l2Vibwwk5Zokr9bfQic1LMw3Ku3126IQIabYQh8j7NKG0XxVkSoE64lxIUJM+Rvlk0qYMjgoxDQkIvEHzzBVgMFaqUsAAAAASUVORK5CYII=' }} 
        />
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>
      <View style={styles.containerPedidosComplet}>
      <Text style={styles.completedRequestsLabel}>PEDIDOS COMPLETADOS</Text>
      </View>
      <FlatList
        data={completedRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
    margin: 20,
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
  },
  containerPedidosComplet:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom:5,
    backgroundColor: '#2F61AF'
  },
});




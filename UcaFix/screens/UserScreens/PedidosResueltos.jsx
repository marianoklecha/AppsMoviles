import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import Footer from '../Footer';


const requestData = [
  { id: 1, request: 'Pizarron Roto 102 Magno', completed: true },
  { id: 2, request: 'Baño sin traba- 2 piso Magno', completed: false },
  { id: 3, request: 'Biblioteca Enchufes', completed: false },
  { id: 4, request: 'Silla Rote 305 Moro', completed: true },
  { id: 5, request: 'Proyector no funciona- 105 Moro', completed: true },
  // Add more request data as needed
];

export function PedidosResueltos(props)  {
    const handleStatusPress = (status) => {
        Alert.alert('Status', `This request is ${status ? 'completed' : 'not completed'}.`);
      };
        
      
        return (
          <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
              {requestData.map((item) => (
                <View key={item.id} style={styles.requestItem}>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: item.completed ? 'green' : 'red' },
                    ]}
                  />
                  <Text style={styles.requestText}>{item.request}</Text>
                  <TouchableOpacity onPress={() => handleStatusPress(item.completed)}>
                    <View style={styles.statusInfo}>
                      <Text style={styles.statusInfoText}>Status</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <Footer/>
          </View>
        );
      };
      
      
      
      
      
      
  const styles = StyleSheet.create({
    statusInfo: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
      },
      statusInfoText: {
        color: 'black',
      },
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      marginBottom: 50, // Adjust as needed to accommodate the footer
    },
    requestItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    requestText: {
      flex: 1,
      marginLeft: 10,
    },
    statusIndicator: {
      width: 30,
      height: 30,
      borderRadius:12,
    },
  });


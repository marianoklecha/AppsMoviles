import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Modal
} from 'react-native';

export function QRpageAdmin(props) {
    const onTap = (nextScreen) => {
      props.navigation.navigate(nextScreen);
    };
    const UserName = props;
    console.log(UserName)
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
          <Text style={[styles.text]}>Bienvenido/a! </Text> 
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('InputClassroomScreen')}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2aS0tVURTHfw7yQUVYfYFUNEmzjJKaFJUJKTUoMJolln6BMBs1LRUdlA0aVRSRNSsrpAaaSPYYZ/aQnJU6SIUs09iwAtmsI95z9z733jx/2KDX63+tvc8+6w0xYsSIESOGb5QATcB14DnwEZgCfsmaks/M37rlu8VkOLYDHcA4sBhyfQXahSsjkAXUAoNJbDpovQSOioy0xC7glYeN22sIqCSNkAt0AfPLKP0DeAy0AHViE/KBNbLy5bM6+U4vML0Mn5HVCeSkevNFwLsAJReAR8CJkIqagz0pB7cQIOMtUEiKsBeYDNj4PaDMoaxy4H7AIUwAVUSMI8CMosx74IBHuQeBEUWu0aWaiLAnYPO3gHURyM8DbijyZ4F9Ubzzk8qVP0/0uKDYhu9AgS+BuYrBMwo0kjqcVQ7htS/v0KVcu1Q8eRstil4menQe5MxbQm6G5NqBe9y2dPvtUk6WEuEZa782BNcl4A/QgFsY4/tBCZ2doFa5YsYdhdn8UtvRjFvsV+xBjQviQYvUBDmJYqc8+aU8Pm5CjyWjP1nCMsXqh43wziiH4PombFNkmCgyNDosMhPbJ4OGCG5Cr8V/JRmycYvMJCek+SHUW9xjYYlKlJTWVYDh8xDylFDdRLAJo9kiMWmpS/g8hKcW77kwJN0WiYm4yJBDaLU4r4YheWGRmHjAB3x4h2MWX18Yki8Wic8yteubsNXi+hSGZMIi2YRfBB2CuSGJYrOSJieMOYskG//QXgfz++kEeXIsjp9hlJlb7Qcwsdpfgc//kRE0fcek3WAdmeMGj7twg92rPRBqskhMlpUpofAzi9cUTxNGsUUyLZXhTEiGZl0kQ0h/ftWmw0h5OdMKIk8s/suuS2LlaVwSq1AKo0mVxJDy8lJC06VN16LoQ9dFUWQsZdFBWbzFc1n8sKKn6WI7aYwMWcQjITvBvhoj64FRS8cBlwIqldaYaUelS2vsrtIaM/bAKTqVK2Za1KnGRUWvNh+CcoA3ihUPVXB0hCbF6g/7TN0LlTR5wVOesJInb2/+G7DFt+DdASNsD4ANvoWLwbujyJ+Vwa1IUB0wJ2Ra1Ic8y7Wt/b88xbjBSFEllZZFZfU4nu+tUIKcpdfeDG6lBAUyk6MptiApdL1kaInC/M8pie2DBiWHo3jnV+Id2sX3LgasGWlXtUrTohTYKNY6W34ulUpOq+Tzdkpr+/m2iAq1CQU4dt7gYw34CHJcokaSENcb73cV20eFMhlOGEti02OSz7ucO04JiqQud00qtKMycTona1JcaJ98pzGZMlaMGDFixIjBivAXHPTf+GkCkskAAAAASUVORK5CYII=',
              }}
            />
            <Text style={styles.buttonText}>Nuevo pedido</Text>
            
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button]}
            onPress={onTap}>
           <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2Uyw7EIAhF/f+fvrMZZ9G0w+tiLHISFyYoPQUZo2kaK3Cu7fKhmoiWa7w1cTTfeSIQPsy6Z+c7V8S61z5W9o85RwTOUrN+xKRFJNgVkXBXxBoffSN0EeuynmflSxd52rPzpRFtnW14hQgWrlTKiWS2FlrkD8zxq20jKM+fLTKxJNbguQ87i0QqrsLSCp7SlxG5A8L56P3LQIsE+tbTSt77Yc1XTkQLOx6sx1xWBMG5zmolRFurnMjEK+KNv9IiSGotKf6J7d7IchEJ2rj80iJX0sahErDH7+tFmqYZPz5tSUDqAOA2MAAAAABJRU5ErkJggg==',
              }}
            />
            <Text style={styles.buttonText}>Escanear código QR</Text>
          </TouchableOpacity>


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
      padding: 12,
      marginBottom: 30,
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: '#2F61AF',
    },
    buttonSesion: {
      borderRadius: 6,
      backgroundColor: '#A4A4A4',
      
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
      width: 50,
      height: 50,
      tintColor: 'black'
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
      
    }
  });
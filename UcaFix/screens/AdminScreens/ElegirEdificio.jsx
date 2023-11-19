import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

export function ElegirEdificio(props) {
    const onTap = (nextScreen) => {
      props.navigation.navigate(nextScreen);
    };
    return (
      
      // 
      <View style={styles.back}>
        <View style={styles.TitleContainer}>
        <Image
              style={styles.UcaLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2WuWtVQRTGf7jEgOICaiIBF9QymzGCFmJtKsHKzv9BBYugpLG3tHCJgjG+9/KSJmCliKCCCm6NGHBDyW6QZyF6ZeAbOFzu3C1PbPLBcO+dOXO+b86cOXNhBcnYxn/EJaABDAKtBUUPAc+BH8B34BlwAdhVhDwy7R0wkGPeCRFGgXYfWJNnBQ1NuAK8MA5GMsh/y24COAZ0A9/U9xDYINvNWSIGNcmRrwPO6ftrimi/8vPq2wd8SiA/CXzMEtGqsLvJZ7SSNAFDZuVZ5L+M31QMJOzhUuBk+G1yYd9tyB8FyF17TA7cBebVfF68TBCxpDFHtl6rdt/vgY4Y+W09pyiIduBtQMS8+v2+bgSeqO+DIb8I7Nf7a0qgDXgTE3HERKff2G5RLYgMucMpfdcoie1SHykiPvuvAqtitluBV4bcjT+V/emyArwIvx2uXUsg9/BJ6MYvm/13x7s0DgGLcnY9gbwFOAhsUl4cBx7I/idweDnk/cCCnA0HyMcDpfgLcLRZ5DeB1TnIGzrzZ3U6mkJ+K0Be1/g0cM+8d7FM9AJzcngn4UZbC4wZws5Yn6sTfc0gH81JbsdqRoRLzELoM1VuJCHsliBS2FtSbGaBnrzkBwx5KOw1s/JpvdcDIqoan1NUU7FXatPCXo2FvdOIGJNNfE7FRMLdCUGMynA8g3wmluFd6vO1PklEPc9dsCCjHRmrcD8qcXSb6FUTRLRpbDFLwB/V/BB5WjL1GBGVmIgO9bvfsswtmNSEdlPh8mayFTFh/EyaYhbEHvM3a9usTkde9JqcsG1GHKnYqWt2Ssexop/NonB+bsjPZ9WTMn5WwD/FX8VxBfNZiUveAAAAAElFTkSuQmCC'
              }}
            />
            <Text style={[styles.title]}>UCA FIX</Text>
        </View>
        <SafeAreaView style={styles.container}>
          
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('PisosEdificio')}>
           <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwUlEQVR4nO2VWwoDIRAE6yuHSu6Xx0E31+hA2EAIq6BhVx27YD4Fy54ZIc0JeABPQI1rAW7rnYq5dyCgn7rWiCzr4TPtuXwlU8znFXpBtfexyCiJqKD2OFvMNCI9nt3EIjiRNx72abdWK2QRgreWoonk8M+OE0kzTWspyrBrdJFWyCIEby1FEwmzfnNYBCeSZpph1+girZBFCN5aiiaSwx8iTiTNNK2lnQZWFjnwZ+8qkX+wCE6Eou10ZFHbz73VJi8aPCs6OvJtJwAAAABJRU5ErkJggg==',
              }}
            />
            <Text style={styles.buttonText}>Santa María</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('PisosEdificio')}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwUlEQVR4nO2VWwoDIRAE6yuHSu6Xx0E31+hA2EAIq6BhVx27YD4Fy54ZIc0JeABPQI1rAW7rnYq5dyCgn7rWiCzr4TPtuXwlU8znFXpBtfexyCiJqKD2OFvMNCI9nt3EIjiRNx72abdWK2QRgreWoonk8M+OE0kzTWspyrBrdJFWyCIEby1FEwmzfnNYBCeSZpph1+girZBFCN5aiiaSwx8iTiTNNK2lnQZWFjnwZ+8qkX+wCE6Eou10ZFHbz73VJi8aPCs6OvJtJwAAAABJRU5ErkJggg==',
              }}
            />
            <Text style={styles.buttonText}>Santo Tomás Moro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('PisosEdificio')}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwUlEQVR4nO2VWwoDIRAE6yuHSu6Xx0E31+hA2EAIq6BhVx27YD4Fy54ZIc0JeABPQI1rAW7rnYq5dyCgn7rWiCzr4TPtuXwlU8znFXpBtfexyCiJqKD2OFvMNCI9nt3EIjiRNx72abdWK2QRgreWoonk8M+OE0kzTWspyrBrdJFWyCIEby1FEwmzfnNYBCeSZpph1+girZBFCN5aiiaSwx8iTiTNNK2lnQZWFjnwZ+8qkX+wCE6Eou10ZFHbz73VJi8aPCs6OvJtJwAAAABJRU5ErkJggg==',
              }}
            />
            <Text style={styles.buttonText}>Santo Alberto Magno</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => props.navigation.navigate('PisosEdificio')}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwUlEQVR4nO2VWwoDIRAE6yuHSu6Xx0E31+hA2EAIq6BhVx27YD4Fy54ZIc0JeABPQI1rAW7rnYq5dyCgn7rWiCzr4TPtuXwlU8znFXpBtfexyCiJqKD2OFvMNCI9nt3EIjiRNx72abdWK2QRgreWoonk8M+OE0kzTWspyrBrdJFWyCIEby1FEwmzfnNYBCeSZpph1+girZBFCN5aiiaSwx8iTiTNNK2lnQZWFjnwZ+8qkX+wCE6Eou10ZFHbz73VJi8aPCs6OvJtJwAAAABJRU5ErkJggg==',
              }}
            />
            <Text style={styles.buttonText}>San José</Text>
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
      marginTop:'20%',
      justifyContent: 'center',
      marginHorizontal: '10%',
      //backgroundColor: '#021B6F'
    },
    button: {
      padding: 12,
      marginBottom: 30,
      flexDirection: 'row',
      borderRadius: 6,
      backgroundColor: '#2F61AF'
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
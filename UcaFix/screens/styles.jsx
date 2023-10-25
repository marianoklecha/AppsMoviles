import { StyleSheet } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
          shadowColor: "black"
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          padding: '3%',
          marginTop: '4%',
          
        },
        UcaLogo: {
          width: 35,
          height: 35,
          marginLeft: '5%',
          
        },
        title: {
          fontSize: 30,
          marginTop: 5,
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '2%',
        },
        scrollViewContent: {
          flexGrow: 1,
          padding: '3%',
          backgroundColor: 'white'
        },
        formContainer: {
          backgroundColor: '#E9E9E9',
          borderRadius: 10,
          padding: '4%'                   
        },
        input: {
          borderColor: 'gray',
          width: '100%',
          color: 'black',
          borderRadius: 10,
          padding: 15,
          backgroundColor: '#F9F9F9',
          marginBottom: "5%"
        },
        inputTitle: {
          color: 'black',
          fontSize: 20,
        },
        button: {
          marginBottom: "5%",
          padding: 15,
          flexDirection: 'row',
          justifyContent:"space-evenly",
          borderRadius: 10,
          backgroundColor: '#F9F9F9',
        },
        buttonText: {
          textAlign: "center",
          fontSize: 18,
          color: 'black',
          fontWeight: 'bold',
        },
        buttonLogo: {
          width: 40,
          height:25
        },
        tinyLogo: {
          width: 40,
          height: 40,
        },
    back:{
      width:'100%',
      height:'100%',
      backgroundColor: 'white'
  
    },
    tinyLogoFooter: {
      width: 50,
      height: 50
    },
    text :{
      fontSize: 25,
      marginBottom:20,
      color: 'black',
    },
    TitleContainer:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'left',
      //backgroundColor: '#3FA7D6',
      padding:'3%',
    },
    footerContainer:{
      position: "absolute",
      bottom: 0,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: "space-evenly", 
      backgroundColor: '#2F61AF',
      padding:'2%',
      marginTop:"5%"
    },
    scrollView:{
      //backgroundColor:"black",
      width:"100%",
      height: "100%"
    },
    topBar: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: "2%"
    },
    topBarButton1:{
      padding: "2%",
      borderRadius: 6,
      backgroundColor: '#3C99FF',
    },
    topBarButtonText1:{
      color: "white",
      paddingHorizontal: "2%",
      fontSize: 15,
      fontWeight: 'bold',
    },
    topBarButton2:{
      padding: "2%",
      borderRadius: 6,
      backgroundColor: '#E5E5E5',
    },
    topBarButtonText2:{
      color: "#B5B5B5",
      paddingHorizontal: "2%",
      fontSize: 15,
      fontWeight: 'bold',
    },
    buttonListo: {
      padding: 10,
      marginHorizontal:"30%",
      borderRadius: 6,
      backgroundColor: '#69D377',
    },
    buttonTextListo: {
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    }
});
export default styles;
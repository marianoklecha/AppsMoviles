import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          padding: '3%',
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
        },
        formContainer: {
          backgroundColor: '#F2F2F2',
          borderRadius: 10,
          padding: '3%',
        },
        input: {
          borderColor: 'gray',
          width: '100%',
          color: 'black',
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
          marginTop: 2,
          backgroundColor: '#F9F9F9',
        },
        inputTitle: {
          color: 'black',
          fontSize: 20,
        },
        button: {
          padding: 12,
          marginTop: 10,
          flexDirection: 'row',
          borderRadius: 6,
          backgroundColor: '#F9F9F9',
        },
        buttonText: {
          marginTop: 5,
          marginLeft: 20,
          fontSize: 20,
          color: 'black',
          fontWeight: 'bold',
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
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      backgroundColor: '#2F61AF',
      padding:'2%',
    },
    scrollView:{
      //backgroundColor:"black",
      width:"100%",
      height: "100%"
    }
});
export default styles;
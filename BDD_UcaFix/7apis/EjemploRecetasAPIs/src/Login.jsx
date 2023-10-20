import React from "react"
import { View, Text, TouchableOpacity } from "react-native"


const Login = (props) => {
    return(
        <View style={{display: 'flex', backgroundColor: 'lightgrey', width: '100%', height:'100%', padding: 10}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 36, textAlign: 'center', color: "black"}}>My Recipe API APP</Text>
            </View>
            <View style={{flex: 5}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10}} onPress={()=> props.navigation.navigate("Categories")}>
                    <Text style={{color: 'black', margin: 5, elevation: 5, padding: 7}}>Categories</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login
import React from "react"
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { styles } from "./styles"


const Login = (props) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    console.log(JSON.stringify(props))

    async function handleLogin(email, password, loginFunction) {
        const loginCheck = await fetch("http://localhost:3000/users/login?email=" + email + "&password=" + password)
        if (loginCheck.ok) {
            let data = await loginCheck.json()
            loginFunction(data.id)
        }
        else {
            Alert.alert("No se encontró el usuario")
            console.log(loginCheck.status)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>My groups app</Text>
            </View>
            <View style={styles.midContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="Email"
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.largePurpleButton} onPress={() => handleLogin(email, password, props.loginFn)}>
                    <Text style={styles.largePurpleButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default Login
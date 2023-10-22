import React from "react"
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { styles } from "./styles"

const Home = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>My groups app</Text>
            </View>
            <View style={styles.midContainer}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Groups")}>
                    <Text style={styles.buttonText}>Groups</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.largePurpleButton} onPress={() => props.navigation.navigate("Login")}>
                    <Text style={styles.largePurpleButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default Home
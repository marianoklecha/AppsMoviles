import React from "react";
import { View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import Categories from "./Categories";
import Meals from "./Meals";
import Login from "./Login";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loggedInUser ?
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Categories" component={Categories} />
                        <Stack.Screen name="Meals" component={Meals} />
                    </>
                    :
                    <>
                        <Stack.Screen name="Login" component={Login} />
                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}
import React from "react";
import { View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import Groups from "./Groups";
import Group from "./Group";
import Login from "./Login";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loggedInUser ?
                    <>
                        <Stack.Screen name="Home">
                            {props => <Home {...props} userId={loggedInUser}/>}
                        </Stack.Screen>
                        <Stack.Screen name="Groups">
                            {props => <Groups {...props} userId={loggedInUser} />}
                        </Stack.Screen>
                        <Stack.Screen name="Group">
                            {props => <Group {...props} userId={loggedInUser} />}
                        </Stack.Screen>
                    </>
                    :
                    <>
                        <Stack.Screen name="Login">
                            {props => <Login {...props} loginFn={setLoggedInUser} />}
                        </Stack.Screen>
                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    )
}
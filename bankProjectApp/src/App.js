import React, { useState } from "react"
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Login from "./pages/login/login.page"
import Register from "./pages/register/register.page"
import AdminHome from "./pages/adminHome/adminHome.page"
import Home from "./pages/home/home.page"

const App = () => {
  const [page, setPage] = useState("Loading")

  const Stack = __createNavigationStack()

  __verifyIfIsLogged(setPage)

  if (page == "Loading") {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={page}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        ></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
        ></Stack.Screen>
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const __createNavigationStack = () => {
  return createNativeStackNavigator()
}

const __verifyIfIsLogged = setPage => {
  AsyncStorage.getItem("userData").then(userData => {
    userData = JSON.parse(userData)
    if (userData && userData.data) {
      setPage(userData.data.user.is_admin ? "AdminHome" : "Home")
    } else {
      console.log(userData)
      setPage("Register")
    }

  })
}

export default App
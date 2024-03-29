import React, { useState } from "react"
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createDrawerNavigator } from "@react-navigation/drawer"

import Login from "./pages/login/login.page"
import Register from "./pages/register/register.page"
import Home from "./pages/home/home.page"
import Deposits from "./pages/deposits/deposits.page"
import Purchases from "./pages/purchases/purchases.page"
import DrawerContent from "./sharedComponents/drawerContent/drawerContent.component"
import RegisterDeposit from "./pages/registerDeposit/registerDeposit.page"
import AdminDrawerContent from "./sharedComponents/adminDrawerContent/adminDrawerContent.component"
import AdminDepositApprove from "./pages/adminDepositApprove/adminDepositApprove.page"
import AdminHome from "./pages/adminHome/adminHome.page"
import RegisterPurchase from "./pages/registerPurchase/registerPurchase.page"

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
          name="Drawer"
          component={DrawerNavigator}
        ></Stack.Screen>
        <Stack.Screen
          name="AdminDrawer"
          component={AdminDrawerNavigator}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const AdminDrawerNavigator = () => {
  const Drawer = __createNavigationDrawer()

  return (
    <Drawer.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        headerShown: false
      }}
      drawerContent={props => <AdminDrawerContent {...props}></AdminDrawerContent>}
    >
      <Drawer.Screen
        name="AdminHome"
        component={AdminHome}
      ></Drawer.Screen>
      <Drawer.Screen
        name="AdminDepositApprove"
        component={AdminDepositApprove}
      ></Drawer.Screen>
    </Drawer.Navigator>
  )
}

const DrawerNavigator = () => {
  const Drawer = __createNavigationDrawer()

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
      drawerContent={props => <DrawerContent {...props}></DrawerContent>}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Expenses"
        component={Purchases}
        options={{
          unmountOnBlur: true
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Checks"
        component={Deposits}
        options={{
          unmountOnBlur: true
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="RegisterDeposit"
        component={RegisterDeposit}
        options={{
          unmountOnBlur: true
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="RegisterPurchase"
        component={RegisterPurchase}
        options={{
          unmountOnBlur: true
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  )
}

const __createNavigationStack = () => {
  return createNativeStackNavigator()
}

const __createNavigationDrawer = () => {
  return createDrawerNavigator()
}

const __verifyIfIsLogged = (setPage) => {
  AsyncStorage.getItem("userData").then(userData => {
    userData = JSON.parse(userData)
    if (userData && userData.data) {
      setPage(userData.data.user.is_admin ? "AdminDrawer" : "Drawer")
    } else {
      setPage("Register")
    }

  })
}

export default App
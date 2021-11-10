import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { Drawer } from "react-native-paper"
import styles from "./drawerContent.style"
import Icon from "react-native-vector-icons/FontAwesome5"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userLogout } from "../../routes/user.route"

const DrawerContent = props => {
    const [state, setState] = useState({
        isAdmin: true
    })

    useEffect(() => {
        AsyncStorage.getItem("userData").then(userData => {
            userData = JSON.parse(userData)

            setState({
                isAdmin: userData.data.user.is_admin
            })
        })
    })

    const logout = () => {
        AsyncStorage.getItem("userData").then(userData => {
            const id = JSON.parse(userData).data.user.id
            const token = JSON.parse(userData).data.token

            userLogout(id, token).then(() => {
                AsyncStorage.clear()
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Register" }]
                })
            }).catch(err => simpleAlert("Error", err.description))
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuTitle}>
                <Text style={styles.menuTitleText}>
                    BNB Bank
                </Text>
            </View>
            <Drawer.Section style={styles.content}>
                <DrawerItem
                    icon={({ color, size }) => {
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        ></Icon>
                    }}
                    label="BALANCE"
                    labelStyle={styles.itemLabel}
                    onPress={() => state.isAdmin ?
                        simpleAlert("Attention", "You need to be a customer to access this page") :
                        props.navigation.navigate("Home")
                    }
                ></DrawerItem>
                <DrawerItem
                    label="INCOMES"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    label="EXPENSES"
                    labelStyle={styles.itemLabel}
                    onPress={() => state.isAdmin ?
                        simpleAlert("Attention", "You need to be a customer to access this page") :
                        props.navigation.navigate("Expenses")
                    }
                ></DrawerItem>
                <DrawerItem
                    label="CHECKS"
                    labelStyle={styles.itemLabel}
                    onPress={() => state.isAdmin ?
                        simpleAlert("Attention", "You need to be a customer to access this page") :
                        props.navigation.navigate("Checks")
                    }
                ></DrawerItem>
                <DrawerItem
                    label="NOTIFICATIONS"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    label="PROFILE"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    label="SETTINGS"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    label="HELP"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    label="LOGOUT"
                    labelStyle={styles.itemLabel}
                    onPress={() => confirmationAlert("Logout", "Are you sure you wanto to logout?", () => logout())}
                ></DrawerItem>
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { Drawer } from "react-native-paper"
import styles from "./drawerContent.style"
import Icon from "react-native-vector-icons/FontAwesome5"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userLogout } from "../../routes/user.route"
import { colors } from "../../helpers/constants"

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
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="balance-scale-right"
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="BALANCE"
                    labelStyle={styles.itemLabel}
                    onPress={() => state.isAdmin ?
                        simpleAlert("Attention", "You need to be a customer to access this page") :
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: "Home" }]
                        })
                    }
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="level-up-alt"
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="INCOMES"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="level-down-alt"
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="EXPENSES"
                    labelStyle={styles.itemLabel}
                    onPress={() => state.isAdmin ?
                        simpleAlert("Attention", "You need to be a customer to access this page") :
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: "Expenses" }]
                        })
                    }
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="money-check"
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="CHECKS"
                    labelStyle={styles.itemLabel}
                    onPress={() => state.isAdmin ?
                        simpleAlert("Attention", "You need to be a customer to access this page") :
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: "Checks" }]
                        })
                    }
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="bell"
                                solid
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="NOTIFICATIONS"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="user"
                                solid
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="PROFILE"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="cog"
                                solid
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="SETTINGS"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="question-circle"
                                solid
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="HELP"
                    labelStyle={styles.itemLabel}
                    onPress={() => simpleAlert("Attention", "Out of Scope")}
                ></DrawerItem>
                <DrawerItem
                    icon={({ color, size }) => {
                        return (
                            <Icon
                                style={{ width: "20%" }}
                                name="sign-out-alt"
                                solid
                                color={colors.WHITE}
                                size={size}
                            ></Icon>
                        )
                    }}
                    label="LOGOUT"
                    labelStyle={styles.itemLabel}
                    onPress={() => confirmationAlert("Logout", "Are you sure you wanto to logout?", () => logout())}
                ></DrawerItem>
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent
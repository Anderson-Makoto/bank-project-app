import React from "react"
import { View, Text } from "react-native"
import styles from "./adminDrawerContent.style"
import { Drawer } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DrawerItem } from "@react-navigation/drawer"
import { userLogout } from "../../routes/user.route"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import Icon from "react-native-vector-icons/FontAwesome5"
import { colors } from "../../helpers/constants"

const DrawerContent = props => {
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
                    icon={({ size, color }) => {
                        return (
                            <Icon
                                name="sign-out-alt"
                                size={size}
                                color={colors.WHITE}
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
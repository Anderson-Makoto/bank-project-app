import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import React from "react"
import { View, Text } from "react-native"
import { Drawer } from "react-native-paper"
import styles from "./drawerContent.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors } from "../../helpers/constants"

const DrawerContent = props => {
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
                    onPress={() => props.navigation.navigate("Home")}
                ></DrawerItem>
                <DrawerItem
                    label="INCOMES"
                    labelStyle={styles.itemLabel}
                ></DrawerItem>
                <DrawerItem
                    label="EXPENSES"
                    labelStyle={styles.itemLabel}
                    onPress={() => props.navigation.navigate("Expenses")}
                ></DrawerItem>
                <DrawerItem
                    label="CHECKS"
                    labelStyle={styles.itemLabel}
                    onPress={() => props.navigation.navigate("Checks")}
                ></DrawerItem>
                <DrawerItem
                    label="NOTIFICATIONS"
                    labelStyle={styles.itemLabel}
                ></DrawerItem>
                <DrawerItem
                    label="PROFILE"
                    labelStyle={styles.itemLabel}
                ></DrawerItem>
                <DrawerItem
                    label="SETTINGS"
                    labelStyle={styles.itemLabel}
                ></DrawerItem>
                <DrawerItem
                    label="HELP"
                    labelStyle={styles.itemLabel}
                ></DrawerItem>
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent
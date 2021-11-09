import React from "react"
import { View, Text } from "react-native"
import styles from "./adminDrawerContent.style"

const DrawerContent = props => {
    return (
        <View style={styles.container}>
            <View style={styles.menuTitle}>
                <Text style={styles.menuTitleText}>
                    BNB Bank
                </Text>
            </View>
            <Text style={styles.content}>
                OUT OF SCOPE
            </Text>
        </View>
    )
}

export default DrawerContent
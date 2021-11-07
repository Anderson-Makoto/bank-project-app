import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styles from "./customButton.style"

const CustomButton = props => {
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                height: props.height,
                width: props.width
            }}
            onPress={props.onPress}
        >
            <Text style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton
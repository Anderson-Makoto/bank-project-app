import React from "react"
import { TextInput } from "react-native"
import { colors } from "../../helpers/constants"
import styles from "./circularTextInput.style"

const CircularTextInput = props => {
    return (
        <TextInput
            style={{ ...styles.textInput, height: props.height, width: props.width }}
            placeholder={props.placeholder}
            placeholderTextColor={colors.BLUE_2}
            keyboardType={props.type}
            onChangeText={props.onChangeText}
            secureTextEntry={props.password ? props.password : false}
            autoCapitalize="none"
        >

        </TextInput>
    )
}

export default CircularTextInput
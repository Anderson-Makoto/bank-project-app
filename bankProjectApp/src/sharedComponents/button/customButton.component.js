import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styles from "./customButton.style"
import PropTypes from "prop-types"

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

CustomButton.propTypes = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default CustomButton
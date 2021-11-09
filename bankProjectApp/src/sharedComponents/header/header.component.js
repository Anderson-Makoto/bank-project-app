import React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import PropTypes from "prop-types"

const Header = props => {
    return (
        <View style={styles(props).container}>
            <TouchableOpacity
                style={styles(props).menu}
                onPress={props.onPress}
            >
                <Icon
                    name="bars"
                    color={props.iconColor}
                    size={20}
                ></Icon>
            </TouchableOpacity>
            <View style={styles(props).title}>
                <Text style={styles(props).text}>
                    {props.titleText}
                </Text>
            </View>
            <TouchableOpacity
                style={styles(props).option}
                onPress={props.optionsOnPress ? props.optionsOnPress : null}
            >
                {props.optionsIconName ?
                    <Icon
                        name={props.optionsIconName}
                        size={20}
                        color={props.iconColor}
                    ></Icon> :
                    null
                }
            </TouchableOpacity>
        </View>
    )
}

Header.propTypes = {
    onPress: PropTypes.func.isRequired,
    iconColor: PropTypes.string.isRequired,
    titleColor: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    optionsIconName: PropTypes.string,
    optionsOnPress: PropTypes.func
}

const styles = props => {
    return StyleSheet.create({
        container: {
            height: "100%",
            width: "100%",
            flexDirection: "row",
            backgroundColor: props.titleColor
        },
        menu: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        title: {
            height: "100%",
            flex: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        text: {
            fontSize: 15,
            fontWeight: "bold",
            color: props.textColor
        },
        option: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        }
    })
}

export default Header
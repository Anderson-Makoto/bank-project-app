import React, { memo } from "react"
import { View, StyleSheet, Text } from "react-native"
import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/FontAwesome5"
import { colors } from "../../helpers/constants"
import TextInputMask from "react-native-text-input-mask"

const UnderlineInput = props => {


    return (
        <View style={styles(props).container}>
            <View style={styles(props).labelView}>
                <Icon
                    name={props.iconName}
                    size={10}
                    color={colors.BLUE_2}
                ></Icon>
                <Text style={styles(props).labelText}>
                    {props.label}
                </Text>
            </View>
            {
                props.isFixedText ?
                    <Text style={{ ...styles(props).textInput, paddingVertical: "1%" }}>
                        {props.fixedTextValue}
                    </Text> :
                    <TextInputMask
                        onChangeText={text => { props.onChangeText(text) }}
                        mask={props.mask}
                        style={styles(props).textInput}
                        keyboardType={props.keyboardType}
                    ></TextInputMask>
            }

        </View>
    )
}

UnderlineInput.propTypes = {
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    mask: PropTypes.any,
    keyboardType: PropTypes.string,
    isFixedText: PropTypes.bool.isRequired,
    fixedTextValue: PropTypes.string
}

const styles = props => {
    return StyleSheet.create({
        container: {
            height: "100%",
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center"
        },
        labelView: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%"
        },
        labelText: {
            fontSize: 10,
            color: colors.BLUE_2,
            marginLeft: "3%"
        },
        textInput: {
            fontSize: 15,
            padding: 0,
            margin: 0,
            color: colors.BLUE_1,
            borderBottomWidth: 1,
            borderColor: colors.BLUE_2,
            width: "100%"
        }
    })
}

export default UnderlineInputMemo = memo(UnderlineInput)
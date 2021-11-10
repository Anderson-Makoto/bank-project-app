import React, { memo } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import PropTypes from "prop-types"
import { colors } from "../../helpers/constants"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const SubHeader = props => {
    if (props.hasTwoValues) {
        return (
            <View style={styles(props).containerValue}>
                <Text style={styles(props).label}>
                    {props.label}
                </Text>
                <Text style={styles(props).value}>
                    {props.value}
                </Text>
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles(props).containerDate} onPress={props.onPress}>
            <Text style={styles(props).date}>
                {props.date}
            </Text>
            <FontAwesome5
                name="chevron-down"
                size={15}
                color={colors.BLUE_1}
            ></FontAwesome5>
        </TouchableOpacity>
    )
}

SubHeader.propTypes = {
    hasTwoValues: PropTypes.bool.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    onPress: PropTypes.func,
    date: PropTypes.any
}

const styles = props => {
    return StyleSheet.create({
        containerValue: {
            height: "10%",
            width: "100%",
            flexDirection: "column",
            paddingHorizontal: "5%",
            backgroundColor: colors.BLUE_4,
            justifyContent: "center",
            alignItems: "flex-start"
        },
        containerDate: {
            height: "10%",
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: "5%",
            backgroundColor: colors.BLUE_4,
            justifyContent: "flex-start",
            alignItems: "center"
        },
        label: {
            fontSize: 10,
            color: colors.BLUE_2
        },
        value: {
            fontSize: 12,
            fontWeight: "bold",
            color: colors.BLUE_1
        },
        date: {
            fontSize: 15,
            color: colors.BLUE_1
        }
    })
}

export default SubHeaderMemo = memo(SubHeader)
import React, { memo } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native"
import PropTypes from "prop-types"
import { colors } from "../../helpers/constants"
var moment = require("moment")

const TransactionsList = props => {
    return (
        <View style={styles().container}>
            <FlatList
                data={props.data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles().listView}
                            onPress={props.onPress ? props.onPress : null}
                        >
                            <View style={styles().leftContent}>
                                <Text style={styles().itemTitle}>
                                    {item.itemTitle}
                                </Text>
                                <Text style={styles().date}>
                                    {moment(item.updated_at).utc().format("M/D/YYYY, hh:mm a")}
                                </Text>
                            </View>
                            <View style={styles().rightContent}>
                                <Text style={{
                                    ...styles().value,
                                    color: item.key.includes("d") ? colors.BLUE_1 : colors.PURCHASE
                                }}>
                                    {item.key.includes("d") ? null : "-"}${String((parseFloat(item.value).toFixed(2))).replace(".", ",")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            ></FlatList>
        </View>
    )
}

TransactionsList.propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.array.isRequired
}

const styles = () => {
    return StyleSheet.create({
        container: {
            height: "100%",
            width: "100%"
        },
        listView: {
            width: "100%",
            height: 40,
            paddingHorizontal: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        leftContent: {
            flexDirection: "column",
            flex: 2,
            height: "100%",
            justifyContent: "space-around",
            alignItems: "flex-start"
        },
        rightContent: {
            flexDirection: "row",
            flex: 1,
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        itemTitle: {
            fontWeight: "bold",
            fontSize: 12,
            color: colors.BLUE_1
        },
        date: {
            fontSize: 12,
            color: colors.BLUE_1
        },
        value: {
            fontSize: 15
        }
    })
}

export default TransactionsListMemo = memo(TransactionsList)
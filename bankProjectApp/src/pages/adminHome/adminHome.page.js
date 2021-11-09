import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native"
import styles from "./adminHome.style"
import Icon from "react-native-vector-icons/FontAwesome5"
import { colors } from "../../helpers/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAllPendingDeposits } from "../../routes/deposit.route"
import { useIsFocused } from "@react-navigation/native"
var moment = require("moment")

const AdminHome = props => {
    const isFocused = useIsFocused()
    const [state, setState] = useState({
        pendingList: [],
        filterBy: "date"
    })

    useEffect(() => {
        if (isFocused) __getPendentDeposits(state, setState)
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity
                    style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => props.navigation.openDrawer()}
                >
                    <Icon
                        name="bars"
                        size={20}
                        color={colors.BLUE_1}
                    ></Icon>
                </TouchableOpacity>
                <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: colors.BLUE_1, fontSize: 15 }}>
                        CHECKS CONTROL
                    </Text>
                </View>
                <TouchableOpacity style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
                    <Icon
                        name="filter"
                        color={colors.BLUE_1}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={state.pendingList}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.itemView}
                                onPress={() => props.navigation.navigate("AdminDepositApprove", { item })}
                            >
                                <View style={styles.customerDate}>
                                    <Text style={{ ...styles.text1 }}>
                                        {item.username}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: colors.BLUE_1 }}>
                                        {moment(item.updated_at).utc().format("M/D/YYYY, hh:mm a")}
                                    </Text>
                                </View>
                                <Text style={{ ...styles.text1, fontSize: 15 }}>
                                    ${String((parseFloat(item.value).toFixed(2))).replace(".", ",")}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                ></FlatList>
            </View>
        </View>
    )
}

const __getPendentDeposits = async (state, setState) => {
    const userToken = await __getUserToken()

    getAllPendingDeposits(userToken).then(getAllPendingsRes => {
        setState({
            ...state,
            pendingList: __createItemKey(getAllPendingsRes.data)
        })
    })
}

const __createItemKey = depositsList => {
    return depositsList.map(val => {
        return {
            ...val,
            key: val.id
        }
    })
}

const __getUserToken = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data.token
    })
}

export default AdminHome
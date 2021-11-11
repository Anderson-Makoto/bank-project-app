import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import styles from "./adminHome.style"
import { colors } from "../../helpers/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAllPendingDeposits } from "../../routes/deposit.route"
import { useIsFocused } from "@react-navigation/native"
import Header from "../../sharedComponents/header/header.component"
import { Picker } from "@react-native-picker/picker"
var moment = require("moment")

const AdminHome = props => {
    const isFocused = useIsFocused()
    const [state, setState] = useState({
        pendingList: [],
        filterBy: "date",
        showPicker: false
    })

    useEffect(() => {
        if (isFocused) __getPendentDeposits(state, setState)
    }, [isFocused])

    const filterList = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Header
                    onPress={() => props.navigation.openDrawer()}
                    iconColor={colors.BLUE_1}
                    titleColor={colors.BLUE_4}
                    titleText="CHECKS CONTROL"
                    textColor={colors.BLUE_1}
                    optionsIconName={state.showPicker ? null : "filter"}
                    optionsOnPress={() => setState({ ...state, showPicker: true })}
                ></Header>
                {
                    state.showPicker ?
                        <Picker
                            mode="dropdown"
                            style={{ position: "absolute", right: 0, top: 0, height: 50, width: 50 }}
                            selectedValue={state.filterBy}
                            onValueChange={val => __filterData(state, setState, val)}
                        >
                            <Picker.Item label="username" value="username" />
                            <Picker.Item label="date" value="updated_at" />
                            <Picker.Item label="amount" value="value" />
                        </Picker> :
                        null
                }
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

const __filterData = (state, setState, key) => {
    setState({
        ...state,
        showPicker: false,
        filterBy: key,
        pendingList: state.pendingList.sort((a, b) => __createSort(a, b, key))
    })
}

const __createSort = (a, b, key) => {
    if (a[key] > b[key]) {
        return 1;
    }
    if (a[key] < b[key]) {
        return -1;
    }
    return 0;
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
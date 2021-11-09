import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { colors } from "../../helpers/constants"
import Header from "../../sharedComponents/header/header.component"
import styles from "./purchases.styles"
import MonthPicker from "react-native-month-year-picker"
import moment from "moment"
import Icon from "react-native-vector-icons/FontAwesome5"
import TransactionsList from "../../sharedComponents/transactionsList/transactionsList.component"
import { useIsFocused } from "@react-navigation/native"
import { getAllPurchasesByMonth } from "../../routes/purchase.route"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Purchases = props => {
    const isFocused = useIsFocused()
    const [state, setState] = useState({
        showDatePicker: false,
        data: [],
        date: new Date()
    })

    useEffect(() => {
        if (isFocused) {
            getData()
        }
    }, [isFocused])

    const getData = async () => {
        const token = await __getToken()

        getAllPurchasesByMonth(
            state.date.getFullYear(),
            state.date.getMonth() + 1,
            token
        ).then(getPurchasesRes => {
            setState({
                ...state,
                data: getPurchasesRes.data.purchasesList
            })
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header
                    onPress={() => props.navigation.openDrawer()}
                    iconColor={colors.BLUE_1}
                    titleColor={colors.BLUE_4}
                    titleText="PURCHASE"
                    textColor={colors.BLUE_1}
                ></Header>
            </View>
            <View style={styles.dateView}>
                <Text
                    onPress={() => { }}
                    style={styles.dateText}
                >
                    {moment(state.date).format("MMMM, YYYY")}
                </Text>
                <Icon
                    name="chevron-down"
                    size={15}
                    color={colors.BLUE_1}
                    solid
                ></Icon>
                {state.showDatePicker &&
                    <MonthPicker
                        onChange={(event, date) => selectDate(event, date)}
                        value={state.date}
                        minimumDate={new Date(2021, 1)}
                        maximumDate={new Date(2050, 12)}
                        locale="eua"
                    ></MonthPicker>
                }
            </View>
            <View style={styles.list}>
                <TransactionsList
                    data={__adjustDataToList(state.data)}
                ></TransactionsList>
            </View>

        </View>
    )
}

const __adjustDataToList = data => {
    data = data.map(item => {
        return ({
            ...item,
            itemTitle: item.description,
            key: "p" + item.id
        })
    })
    console.log(data)
    return data
}

const __getToken = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data.token
    })
}

export default Purchases
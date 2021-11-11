import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { colors } from "../../helpers/constants"
import Header from "../../sharedComponents/header/header.component"
import styles from "./purchases.styles"
import MonthPicker from "react-native-month-year-picker"
import moment from "moment"
import Icon from "react-native-vector-icons/FontAwesome5"
import TransactionsListMemo from "../../sharedComponents/transactionsList/transactionsList.component"
import { useIsFocused } from "@react-navigation/native"
import { getAllPurchasesByMonth } from "../../routes/purchase.route"
import AsyncStorage from "@react-native-async-storage/async-storage"
import SubHeaderMemo from "../../sharedComponents/subHeader/subHeader.component"

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
    }, [isFocused, state.date])

    const getData = async () => {
        const token = await __getToken()

        getAllPurchasesByMonth(
            state.date.getFullYear(),
            state.date.getMonth(),
            token
        ).then(getPurchasesRes => {
            setState({
                ...state,
                data: getPurchasesRes.data.purchasesList
            })
        })
    }

    const selectDate = (event, date) => {
        setState({
            ...state,
            showDatePicker: false,
            date: date ? new Date(date) : state.date
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
            <SubHeaderMemo
                hasTwoValues={false}
                onPress={() => setState({ ...state, showDatePicker: true })}
                date={moment(state.date).format("MMMM, YYYY")}
            ></SubHeaderMemo>
            {state.showDatePicker &&
                <MonthPicker
                    onChange={(event, date) => selectDate(event, date)}
                    value={state.date}
                    minimumDate={new Date(2021, 1)}
                    maximumDate={new Date(2050, 12)}
                    locale="eua"
                ></MonthPicker>
            }
            <View style={styles.list}>
                <TransactionsListMemo
                    data={__adjustDataToList(state.data)}
                ></TransactionsListMemo>
            </View>

            <Icon
                onPress={() => props.navigation.navigate("RegisterPurchase")}
                name="plus-circle"
                size={50}
                color={colors.BLUE_1}
                style={{ position: "absolute", right: 20, bottom: 20 }}
            ></Icon>

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
    return data
}

const __getToken = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data.token
    })
}

export default Purchases
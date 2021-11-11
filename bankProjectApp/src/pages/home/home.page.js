import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { simpleAlert } from "../../helpers/alert"
import { colors, depositStatus, monthNames } from "../../helpers/constants"
import { getApprovedDepositsByMonth } from "../../routes/deposit.route"
import { getAllPurchasesByMonth } from "../../routes/purchase.route"
import { getBalance } from "../../routes/user.route"
import styles from "./home.style"
import MonthPicker from "react-native-month-year-picker"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useIsFocused } from "@react-navigation/native"
import Header from "../../sharedComponents/header/header.component"
import TransactionsListMemo from "../../sharedComponents/transactionsList/transactionsList.component"

var moment = require('moment')

const Home = props => {
    const isFocused = useIsFocused()
    const [state, setState] = useState({
        incomes: 0,
        expenses: 0,
        balance: 0,
        date: new Date(),
        transactionsList: [],
        showDatePicker: false
    })

    useEffect(() => {
        if (isFocused) __loadData(state, setState)
    }, [isFocused, state.date])

    const allowDatePicker = () => {
        setState({
            ...state,
            showDatePicker: true
        })
    }

    const selectDate = (event, date) => {
        if (event == "dismissedAction") return
        setState({
            ...state,
            showDatePicker: false,
            date: new Date(date) || state.date
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Header
                    onPress={() => props.navigation.openDrawer()}
                    iconColor={colors.WHITE}
                    titleColor={colors.BLUE_2}
                    titleText="BNB Bank"
                    textColor={colors.WHITE}
                ></Header>
            </View>
            <View style={{ ...styles.dataView, backgroundColor: colors.BLUE_2 }}>
                <View style={styles.leftContent}>
                    <Text style={{ ...styles.label, color: colors.WHITE }}>
                        Current balance
                    </Text>
                    <Text style={styles.balanceValue}>
                        ${String((parseFloat(state.balance).toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
                <View style={styles.rightContent}>
                    <View style={styles.dateView}>
                        <Text onPress={() => allowDatePicker()} style={styles.dateText}>
                            {moment(state.date).format("MMMM, YYYY")}
                        </Text>
                        <FontAwesome5
                            name="chevron-down"
                            size={15}
                            color={colors.WHITE}
                        ></FontAwesome5>
                    </View>
                    {state.showDatePicker &&
                        <MonthPicker
                            onChange={(event, date) => selectDate(event, date)}
                            value={state.date}
                            minimumDate={new Date(2021, 1)}
                            maximumDate={new Date(2050, 12)}
                            locale="eua"
                        ></MonthPicker>}
                </View>
            </View>
            <View style={{ ...styles.dataView, backgroundColor: colors.BLUE_3 }}>
                <View>
                    <Text style={{ ...styles.label, color: colors.BLUE_1 }}>
                        Incomes
                    </Text>
                    <Text style={{ ...styles.incomesAndExpensesValues, color: colors.BLUE_1 }}>
                        ${String((parseFloat(state.incomes).toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
                <View>
                    <View style={styles.rightContent}>
                        <TouchableOpacity
                            style={{ justifyContent: "center", alignItems: "center" }}
                            onPress={() => props.navigation.navigate("RegisterDeposit")}
                        >
                            <FontAwesome5
                                name="plus"
                                size={15}
                                color={colors.BLUE_1}
                            ></FontAwesome5>
                            <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                                DEPOSIT A CHECK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.dataView, backgroundColor: colors.BLUE_4 }}>
                <View>
                    <Text style={{ ...styles.label, color: colors.BLUE_1 }}>
                        Expenses
                    </Text>
                    <Text style={{ ...styles.incomesAndExpensesValues, color: colors.BLUE_1 }}>
                        ${String((parseFloat(state.expenses).toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
                <View>
                    <View style={styles.rightContent}>
                        <TouchableOpacity
                            style={{ justifyContent: "center", alignItems: "center" }}
                            onPress={() => props.navigation.navigate("RegisterPurchase")}
                        >
                            <FontAwesome5
                                name="plus"
                                size={15}
                                color={colors.BLUE_1}
                            ></FontAwesome5>
                            <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                                PURCHASE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.dataView}>
                <View>
                    <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                        Transactions
                    </Text>
                </View>
            </View>
            <View style={styles.listView}>
                <TransactionsListMemo
                    onPress={() => { }}
                    data={state.transactionsList}
                ></TransactionsListMemo>
            </View>
        </View >
    )
}

const __loadData = (state, setState) => {
    AsyncStorage.getItem("userData").then(async userData => {
        userData = JSON.parse(userData)
        let approvedDeposits = await __getApprovedDepositsByMonth(state, userData)
        let balance = await __getBalance(userData)
        let purchases = await __getPurchasesByMonth(state, userData)
        let incomesAndExpenses = __calculateIncomesAndExpenses(approvedDeposits, purchases)
        let incomes = incomesAndExpenses["income"]
        let expenses = incomesAndExpenses["expenses"]
        let transactionsList = __getSortedTransactions(approvedDeposits, purchases)

        setState({
            date: state.date,
            incomes,
            expenses,
            balance,
            transactionsList,
            showDatePicker: state.showDatePicker
        })

    })
}

const __getSortedTransactions = (approvedDeposits, purchases) => {
    const transactionsWithKeys = __createKeys(approvedDeposits, purchases)

    approvedDeposits = transactionsWithKeys["approvedDeposits"]
    purchases.purchasesList = transactionsWithKeys["purchases"].purchasesList

    let transactions = approvedDeposits.concat(purchases.purchasesList)
    return transactions.sort(__createSortByDate)
}

const __createKeys = (approvedDeposits, purchases) => {
    if (approvedDeposits) {
        approvedDeposits = approvedDeposits.map(val => {
            return {
                ...val,
                key: "d" + String(val.id),
                itemTitle: val.description
            }
        })
        purchases.purchasesList = purchases.purchasesList.map(val => {
            return {
                ...val,
                key: "p" + String(val.id),
                itemTitle: val.description
            }
        })
    }
    return { approvedDeposits, purchases }
}

const __createSortByDate = (a, b) => {
    if (a.updated_at < b.updated_at) {
        return 1;
    }
    if (a.updated_at > b.updated_at) {
        return -1;
    }
    return 0;
}

const __calculateIncomesAndExpenses = (approvedDeposits, purchases) => {
    let income = 0, expenses = 0
    if (approvedDeposits) {
        approvedDeposits = approvedDeposits.map(val => {
            income += parseFloat(val.value)
        })
        purchases.purchasesList.map(val => {
            expenses += parseFloat(val.value)
        })
    }

    return { income, expenses }
}

const __getApprovedDepositsByMonth = (state, userData) => {
    return getApprovedDepositsByMonth(
        userData.data.user.id,
        [depositStatus.ACCEPTED],
        state.date.getFullYear(),
        state.date.getMonth(),
        userData.data.token
    ).then(getApprovedDepositsRes => {
        return getApprovedDepositsRes.data
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

const __getBalance = userData => {
    return getBalance(userData.data.token).then(getBalanceRes => {
        return getBalanceRes.data
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

const __getPurchasesByMonth = (state, userData) => {
    return getAllPurchasesByMonth(
        state.date.getFullYear(),
        state.date.getMonth(),
        userData.data.token
    ).then(getAllPurchasesByMonthRes => {
        return getAllPurchasesByMonthRes.data
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

export default Home
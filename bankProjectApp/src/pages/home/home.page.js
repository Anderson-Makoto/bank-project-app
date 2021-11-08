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
var moment = require('moment')

const Home = props => {
    const [state, setState] = useState({
        incomes: 0,
        expenses: 0,
        balance: 0,
        date: new Date(),
        transactionsList: [],
        showDatePicker: false
    })

    useEffect(() => {
        __loadData(state, setState)
    }, [])

    const allowDatePicker = () => {
        setState({
            ...state,
            showDatePicker: true
        })
    }

    const selectDate = (event, date) => {
        setState({
            ...state,
            showDatePicker: false,
            date: date || state.date
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity
                    style={{ width: "20%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => props.navigation.openDrawer()}
                >
                    <FontAwesome5
                        name="bars"
                        size={40}
                        color={colors.WHITE}
                    ></FontAwesome5>
                </TouchableOpacity>
                <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ marginRight: "32%", color: colors.WHITE, fontSize: 20 }}>
                        BNB Bank
                    </Text>
                </View>

            </View>
            <View style={{ ...styles.lineView, backgroundColor: colors.BLUE_2 }}>

                <View style={{ marginLeft: "5%" }}>
                    <Text style={{ ...styles.text1, color: colors.WHITE }}>
                        Current balance
                    </Text>
                    <Text style={styles.balanceValue}>
                        ${String((parseFloat(state.balance).toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
                <View style={{ marginRight: "5%" }}>
                    <Text onPress={() => allowDatePicker()} style={styles.dateText}>
                        {monthNames[state.date.getMonth()]}, {state.date.getFullYear()} {String.fromCharCode(31)}
                    </Text>
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
            <View style={{ ...styles.lineView, backgroundColor: colors.BLUE_3 }}>
                <View style={{ marginLeft: "5%" }}>
                    <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                        Incomes
                    </Text>
                    <Text style={{ ...styles.balanceValue, color: colors.BLUE_1 }}>
                        ${String((parseFloat(state.incomes).toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
                <View style={{ marginRight: "5%" }}>
                    <TouchableOpacity
                        style={{ justifyContent: "center", alignItems: "center" }}
                        onPress={() => props.navigation.navigate("RegisterDeposit")}
                    >
                        <FontAwesome5
                            name="plus"
                            size={25}
                            color={colors.BLUE_1}
                        ></FontAwesome5>
                        <Text style={{ ...styles.text1, color: colors.BLUE_1, fontWeight: "normal" }}>
                            DEPOSIT A CHECK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ ...styles.lineView, backgroundColor: colors.BLUE_4 }}>
                <View style={{ marginLeft: "5%" }}>
                    <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                        Expenses
                    </Text>
                    <Text style={{ ...styles.balanceValue, color: colors.BLUE_1 }}>
                        ${String((parseFloat(state.expenses).toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
                <View style={{ marginRight: "10.5%" }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome5
                            name="plus"
                            size={25}
                            color={colors.BLUE_1}
                        ></FontAwesome5>
                        <Text style={{ ...styles.text1, color: colors.BLUE_1, fontWeight: "normal" }}>
                            PURCHASE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ ...styles.lineView }}>
                <View style={{ marginLeft: "5%" }}>
                    <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                        Transactions
                    </Text>
                </View>
            </View>
            <View style={styles.listView}>
                <FlatList
                    style={{ height: "100%", width: "100%" }}
                    data={state.transactionsList}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ ...styles.listItemLineView, borderBottomWidth: 1, borderColor: colors.BLUE_2 }}>
                                <View style={{ marginLeft: "5%" }}>
                                    <Text style={{ ...styles.text1, color: colors.BLUE_1 }}>
                                        {(item.description).replace(new RegExp(`"`, 'g'), "")}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: colors.BLUE_1 }}>
                                        {moment(item.updated_at).format("M/D/YYYY, hh:mm a")}
                                    </Text>
                                </View>
                                <View style={{ marginRight: "5%" }}>
                                    <Text style={{ fontSize: 15, color: item.key.includes("deposit") ? colors.BLUE_1 : colors.PURCHASE }}>
                                        {item.key.includes("purchase") ? "-" : null}${String((parseFloat(item.value).toFixed(2))).replace(".", ",")}
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                ></FlatList>
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
    approvedDeposits = approvedDeposits.map(val => {
        return {
            ...val,
            key: "deposit" + String(val.id)
        }
    })
    purchases.purchasesList = purchases.purchasesList.map(val => {
        return {
            ...val,
            key: "purchase" + String(val.id)
        }
    })

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
    approvedDeposits = approvedDeposits.map(val => {
        income += parseFloat(val.value)
    })
    purchases.purchasesList.map(val => {
        expenses += parseFloat(val.value)
    })
    return { income, expenses }
}

const __getApprovedDepositsByMonth = (state, userData) => {
    return getApprovedDepositsByMonth(
        userData.data.user.id,
        depositStatus.ACCEPTED,
        state.date.getFullYear(),
        state.date.getMonth() + 1,
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
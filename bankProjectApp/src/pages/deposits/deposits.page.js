import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./deposits.style"
import Header from "../../sharedComponents/header/header.component"
import { colors, depositStatus } from "../../helpers/constants"
import moment from "moment"
import Icon from "react-native-vector-icons/FontAwesome5"
import MonthPicker from "react-native-month-year-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getApprovedDepositsByMonth } from "../../routes/deposit.route"
import TransactionsListMemo from "../../sharedComponents/transactionsList/transactionsList.component"

const Deposits = props => {
    const [state, setState] = useState({
        tab: depositStatus.ACCEPTED,
        date: new Date(),
        showDatePicker: false,
        data: [],
        filteredList: []
    })

    useEffect(() => {
        getData()
    }, [state.date])

    const changeTab = tab => {
        setState({
            ...state,
            tab,
            filteredList: state.data.filter(item => item.fk_deposit_status == tab)
        })
    }

    const selectDate = (event, date) => {
        setState({
            ...state,
            showDatePicker: false,
            date: date ? new Date(date) : state.date
        })
    }

    const getData = async () => {
        const userData = JSON.parse(await AsyncStorage.getItem("userData")).data
        getApprovedDepositsByMonth(
            userData.user.id,
            [depositStatus.ACCEPTED, depositStatus.PENDING, depositStatus.REJECTED],
            state.date.getFullYear(),
            state.date.getMonth() + 1,
            userData.token
        ).then(getAllDepositsRes => {

            let formatedArray = getAllDepositsRes.data.map(item => {
                return ({
                    ...item,
                    itemTitle: item.description,
                    key: "d" + item.id
                })
            })
            setState({
                ...state,
                data: formatedArray,
                filteredList: formatedArray.filter(item => item.fk_deposit_status == state.tab)
            })
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Header
                    onPress={() => props.navigation.openDrawer()}
                    iconColor={colors.BLUE_1}
                    titleColor={colors.BLUE_4}
                    titleText="CHECKS"
                    textColor={colors.BLUE_1}
                ></Header>
            </View>
            <TouchableOpacity
                style={styles.dateView}
                onPress={() => setState({ ...state, showDatePicker: true })}
            >
                <Text
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
            </TouchableOpacity>
            <View style={styles.tabView}>
                <TouchableOpacity
                    style={{ ...styles.tab, borderBottomWidth: state.tab == depositStatus.PENDING ? 2 : 0 }}
                    onPress={() => changeTab(depositStatus.PENDING)}
                >
                    <Text style={styles.tabText}>
                        PENDING
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.tab, borderBottomWidth: state.tab == depositStatus.ACCEPTED ? 2 : 0 }}
                    onPress={() => changeTab(depositStatus.ACCEPTED)}
                >
                    <Text style={styles.tabText}>
                        ACCEPTED
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.tab, borderBottomWidth: state.tab == depositStatus.REJECTED ? 2 : 0 }}
                    onPress={() => changeTab(depositStatus.REJECTED)}
                >
                    <Text style={styles.tabText}>
                        REJECTED
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <TransactionsListMemo
                    onPress={() => { }}
                    data={state.filteredList}
                ></TransactionsListMemo>
            </View>
        </View>
    )
}

export default Deposits
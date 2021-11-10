import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { colors } from "../../helpers/constants"
import { getBalance } from "../../routes/user.route"
import CustomButton from "../../sharedComponents/button/customButton.component"
import Header from "../../sharedComponents/header/header.component"
import UnderlineInputMemo from "../../sharedComponents/underlineInput/underlineInput.component"
import styles from "./registerPurchase.style"
import DateTimePicker from '@react-native-community/datetimepicker';
import { amountValidation, descriptionValidation } from "../../helpers/inputValidators"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import { registerPurchase } from "../../routes/purchase.route"

const RegisterPurchase = props => {
    const [state, setState] = useState({
        balance: 0,
        amount: 0,
        date: new Date(),
        description: "",
        showDatePicker: false,

    })

    useEffect(() => {
        __getBalance(state, setState)
    }, [])

    const savePurchase = () => {
        confirmationAlert("Purchase", "Do you want to register this purchase?", () => __registerPurchase(state, props.navigation))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header
                    onPress={() => props.navigation.openDrawer()}
                    iconColor={colors.BLUE_1}
                    titleColor={colors.BLUE_4}
                    titleText="PURCHASES"
                    textColor={colors.BLUE_1}
                ></Header>
            </View>
            <View style={styles.balanceView}>
                <Text style={styles.balanceTitleText}>
                    CURRENT BALANCE
                </Text>
                <Text style={styles.balanceValueText}>
                    ${String((parseFloat(state.balance).toFixed(2))).replace(".", ",")}
                </Text>
            </View>
            <View style={styles.inputsView}>
                <View style={styles.input}>
                    <View style={styles.amountInput}>
                        <UnderlineInputMemo
                            iconName="money-bill-alt"
                            label="AMOUNT"
                            onChangeText={text => setState({
                                ...state,
                                amount: text.replace("$ ", "")
                            })}
                            mask="$ [999999999],[99]"
                            keyboardType="decimal-pad"
                            isFixedText={false}
                        ></UnderlineInputMemo>
                    </View>
                    <View style={styles.usdView}>
                        <Text style={styles.usd}>
                            USD
                        </Text>
                    </View>

                </View>
                <TouchableOpacity
                    style={{ ...styles.input, width: "80%" }}
                    onPress={() => setState({ ...state, showDatePicker: true })}
                >
                    <UnderlineInputMemo
                        iconName="calendar-alt"
                        label="DATE"
                        isFixedText={true}
                        fixedTextValue={moment(state.date).format("MMMM D, YYYY")}
                    ></UnderlineInputMemo>
                    {
                        state.showDatePicker ?
                            <DateTimePicker
                                value={state.date}
                                display="calendar"
                                minimumDate={new Date("2015-01-01")}
                                maximumDate={new Date("2050-01-01")}
                                onChange={event => {
                                    if (event.type == "set") {
                                        setState({
                                            ...state,
                                            date: new Date(event.nativeEvent.timestamp),
                                            showDatePicker: false
                                        })
                                    }

                                }}
                            /> :
                            null
                    }
                </TouchableOpacity>
                <View style={styles.input}>
                    <UnderlineInputMemo
                        iconName="star"
                        label="DESCRIPTION"
                        onChangeText={text => setState({ ...state, description: text })}
                        mask={""}
                        keyboardType="default"
                        isFixedText={false}
                    ></UnderlineInputMemo>
                </View>
            </View>
            <View style={styles.confirmPurchaseView}>
                <CustomButton
                    height="20%"
                    width="100%"
                    onPress={() => savePurchase()}
                    text="ADD PURCHASE"
                ></CustomButton>
            </View>
        </View>
    )
}

const __registerPurchase = async (state, navigation) => {
    const token = await __getToken()
    const id = await __getUserId()
    __verifyIfInputIsValid(state)
    registerPurchase(
        id,
        state.description,
        parseFloat(state.amount).toFixed(2),
        state.date,
        token
    ).then(registerPurchaseRes => {
        simpleAlert("Success", "The purchase was registered")
        navigation.goBack()
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

const __getUserId = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data.user.id
    })
}

const __verifyIfInputIsValid = state => {
    if (!amountValidation(state.amount)) {
        simpleAlert("Attention", "Insert a valid amount")
        return false
    }
    if (!descriptionValidation(state.description)) {
        simpleAlert("Attention", "Insert a valid description")
        return false
    }
    return true
}

const __getBalance = async (state, setState) => {
    const token = await __getToken()

    getBalance(token).then(getBalanceRes => {
        setState({
            ...state,
            balance: getBalanceRes.data
        })
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

const __getToken = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data.token
    })
}

export default RegisterPurchase
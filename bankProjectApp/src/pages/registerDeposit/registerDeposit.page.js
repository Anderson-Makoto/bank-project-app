import React, { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, ImageBackground, TextInput } from "react-native"
import { colors } from "../../helpers/constants"
import styles from "./registerDeposit.style"
import { launchImageLibrary } from 'react-native-image-picker';
import { storageReadPermission } from "../../helpers/permissions"
import CustomButton from "../../sharedComponents/button/customButton.component"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import { amountValidation, descriptionValidation } from "../../helpers/inputValidators"
import { registerDepositPending } from "../../routes/deposit.route"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getBalance } from "../../routes/user.route"
import UnderlineInputMemo from "../../sharedComponents/underlineInput/underlineInput.component"
import Header from "../../sharedComponents/header/header.component"
import SubHeaderMemo from "../../sharedComponents/subHeader/subHeader.component"

const RegisterDeposit = props => {
    const [state, setState] = useState({
        amount: 0,
        checkImg: null,
        balance: 0,
        description: ""
    })

    useEffect(() => {
        __getBalance(setState)
    }, [])

    const getImage = () => {
        launchImageLibrary({
            mediaType: "photo"
        }, res => {
            if (res.assets) {
                const image = res.assets[0]
                setState({
                    ...state, checkImg: image
                })
            }

        })
    }

    const askForPermission = () => {
        storageReadPermission(getImage)
    }

    const saveDeposit = () => {
        const isInputValid = __validateInput(state)

        if (isInputValid) {
            confirmationAlert("Deposit", "Confirm deposit?", () =>
                __callRegisterDepositRoute(state, props.navigation))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Header
                    onPress={() => props.navigation.openDrawer()}
                    iconColor={colors.BLUE_1}
                    titleColor={colors.BLUE_4}
                    titleText="CHECK DEPOSIT"
                    textColor={colors.BLUE_1}
                ></Header>
            </View>
            <SubHeaderMemo
                hasTwoValues={true}
                label="CURRENT BALANCE"
                value={`$${String((parseFloat(state.balance).toFixed(2))).replace(".", ",")}`}
            ></SubHeaderMemo>
            <View style={styles.valuesView}>
                <View style={styles.amountView}>
                    <View style={{ height: "100%", width: "80%" }}>
                        <UnderlineInputMemo
                            iconName="money-bill-wave"
                            label="AMOUNT"
                            onChangeText={val => setState({ ...state, amount: val.replace("$ ", "") })}
                            mask={"$ [999999999],[99]"}
                            keyboardType="decimal-pad"
                            isFixedText={false}
                        ></UnderlineInputMemo>
                    </View>
                    <Text style={{ fontSize: 12, color: colors.BLUE_1, width: "20%" }}>
                        USD
                    </Text>
                </View>
                <Text style={{ color: colors.BLUE_2, fontSize: 10 }}>
                    *The money will be deposited in your account once the check is accepted"
                </Text>
                <View style={{ height: "33%", width: "100%" }}>
                    <UnderlineInputMemo
                        iconName="star"
                        label="DESCRIPTION"
                        onChangeText={val => setState({ ...state, description: val })}
                        mask={""}
                        keyboardType="default"
                        isFixedText={false}
                    ></UnderlineInputMemo>
                </View>
            </View>
            <View style={styles.imageView}>
                <TouchableOpacity style={styles.imagePicker} onPress={() => askForPermission()}>
                    {
                        state.checkImg == null ?
                            <Text style={{ color: colors.BLUE_2, fontSize: 10 }}>
                                UPLOAD CHECK PICTURE
                            </Text> :
                            <ImageBackground
                                source={{ uri: state.checkImg.uri }}
                                style={styles.imageRender}
                                resizeMode="cover"
                            ></ImageBackground>

                    }
                </TouchableOpacity>
                <CustomButton
                    height="20%"
                    width="100%"
                    onPress={saveDeposit}
                    text="DEPOSIT CHECK"
                >

                </CustomButton>
            </View>
        </View>

    )
}

const __getBalance = async setState => {
    userData = await __getUserData()
    return getBalance(userData.token).then(getBalanceRes => {
        setState({
            ...setState,
            balance: getBalanceRes.data
        })
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

const __validateInput = state => {
    if (state.checkImg == null) {
        simpleAlert("Attention", "You need to upload a check image for validation")
        return false
    }
    if (!amountValidation(state.amount)) {
        simpleAlert("Attention", "You need to insert a valid amount")
        return false
    }
    if (!descriptionValidation(state.description)) {
        simpleAlert("Attention", "You need to insert a valid description")
        return false
    }

    return true
}

const __callRegisterDepositRoute = async (state, navigation, props) => {
    const userData = await __getUserData()

    registerDepositPending(
        state.amount,
        userData.user.id,
        state.checkImg,
        state.description,
        userData.token
    ).then(registerDepositRes => {
        simpleAlert("Success!", "The deposit will be analyzed by the admin")
        props.navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        })
    }).catch(err => {
        simpleAlert("Error", err.description)
        navigation.goBack()
    })
}

const __getUserData = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data
    })
}

export default RegisterDeposit
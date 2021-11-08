import React, { useState } from "react"
import { View, TouchableOpacity, Text, ImageBackground, TextInput } from "react-native"
import TextInputMask from "react-native-text-input-mask"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { colors } from "../../helpers/constants"
import styles from "./registerDeposit.style"
import { launchImageLibrary } from 'react-native-image-picker';
import { storageReadPermission } from "../../helpers/permissions"
import CustomButton from "../../sharedComponents/button/customButton.component"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import { amountValidation, descriptionValidation } from "../../helpers/inputValidators"
import { registerDepositPending } from "../../routes/deposit.route"
import AsyncStorage from "@react-native-async-storage/async-storage"

const RegisterDeposit = props => {
    const [state, setState] = useState({
        amount: 0,
        checkImg: null,
        balance: 0,
        description: ""
    })

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
            // __callRegisterDepositRoute(state)
            confirmationAlert("Deposit", "Confirm deposit?", () => __callRegisterDepositRoute(state))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity
                    style={{ width: "20%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => props.navigation.openDrawer()}
                >
                    <FontAwesome5Icon
                        name="bars"
                        size={40}
                        color={colors.BLUE_1}
                    ></FontAwesome5Icon>
                </TouchableOpacity>
                <View style={{ width: "80%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ marginRight: "25%", color: colors.BLUE_1, fontSize: 15 }}>
                        CHECK DEPOSIT
                    </Text>
                </View>
            </View>
            <View style={{ ...styles.lineView, backgroundColor: colors.BLUE_4 }}>

                <View>
                    <Text style={{ ...styles.text1, color: colors.BLUE_2 }}>
                        Current balance
                    </Text>
                    <Text style={styles.balanceValue}>
                        ${String((parseFloat("100.00").toFixed(2))).replace(".", ",")}
                    </Text>
                </View>
            </View>
            <View style={styles.amountView}>
                <Text style={{ color: colors.BLUE_2, fontSize: 10 }}>
                    AMOUNT
                </Text>
                <View style={styles.input}>
                    <TextInputMask
                        onChangeText={val => setState({ ...state, amount: val.replace("$ ", "") })}
                        mask={"$ [999999999],[99]"}
                        style={styles.maskedInputText}
                        keyboardType="decimal-pad"
                    >

                    </TextInputMask>
                    <Text style={{ fontSize: 12, color: colors.BLUE_1, width: "20%", fontSize: 12 }}>
                        USD
                    </Text>
                </View>
                <Text style={{ color: colors.BLUE_2, fontSize: 10 }}>
                    *The money will be deposited in your account once the check is accepted"
                </Text>
                <Text style={{ color: colors.BLUE_2, fontSize: 10, marginTop: "5%" }}>
                    DESCRIPTION
                </Text>
                <TextInput
                    onChangeText={val => setState({ ...state, description: val })}
                    maxLength={20}
                    style={styles.InputText}
                ></TextInput>
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

const __callRegisterDepositRoute = async state => {
    const userData = await __getUserData()

    registerDepositPending(
        state.amount,
        userData.user.id,
        state.checkImg,
        state.description,
        userData.token
    ).then(registerDepositRes => {
        simpleAlert("Success!", "The deposit will be analyzed by the admin")
    }).catch(err => {
        simpleAlert("Error", err.description)
    })
}

const __getUserData = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data
    })
}

export default RegisterDeposit
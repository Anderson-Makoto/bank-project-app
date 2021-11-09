import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import styles from "./adminDepositApprove.style"
import Icon from "react-native-vector-icons/FontAwesome5"
import { colors, depositStatus } from "../../helpers/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { changeDepositStatus, getDepositDetails } from "../../routes/deposit.route"
import CustomButton from "../../sharedComponents/button/customButton.component"
import { confirmationAlert, simpleAlert } from "../../helpers/alert"
import { useIsFocused } from "@react-navigation/native"

const AdminDepositApprove = props => {
    const isFocused = useIsFocused()
    const params = props.route.params.item
    const [state, setState] = useState({
        deposit: {
            description: params.description,
            value: params.value,
            id: params.id,
            updated_at: params.updated_at
        },
        user: {
            username: params.username,
            account: params.account,
            email: params.email
        }
    })

    useEffect(() => {
        if (isFocused) {
            __getDepositImage(params, setState)
        }

    }, [isFocused])

    const askToConfirmDeposit = status => {
        const decision = status == depositStatus.ACCEPTED ? "Accept" : "Reject"
        confirmationAlert(decision, `Are you sure you want to ${decision.toLowerCase()} this deposit?`,
            () => __acceptDeposit(state, status, props.navigation)
        )
    }

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
                <View style={{ width: "90%", justifyContent: "center", alignItems: "center", paddingRight: "10%" }}>
                    <Text style={{ color: colors.BLUE_1, fontSize: 15, fontWeight: "bold" }}>
                        CHECK DETAILS
                    </Text>
                </View>
            </View>
            <View style={styles.itemView}>
                <View style={styles.iconView}>
                    <Icon
                        name="user"
                        size={12}
                        color={colors.BLUE_2}
                        solid
                    ></Icon>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataTitle}>
                        CUSTOMER
                    </Text>
                    <Text style={styles.data}>
                        {state.user.username}
                    </Text>
                </View>
                <View style={styles.iconView}>

                </View>
            </View>
            <View style={styles.itemView}>
                <View style={styles.iconView}>
                    <Icon
                        name="envelope"
                        size={12}
                        color={colors.BLUE_2}
                        solid
                    ></Icon>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataTitle}>
                        CUSTOMER EMAIL
                    </Text>
                    <Text style={styles.data}>
                        {state.user.email}
                    </Text>
                </View>
                <View style={{ ...styles.iconView, justifyContent: "flex-end" }}>
                    <Icon
                        name="chevron-right"
                        size={12}
                        color={colors.BLUE_1}
                        solid
                    ></Icon>
                </View>
            </View>
            <View style={styles.itemView}>
                <View style={styles.iconView}>
                    <Icon
                        name="file-invoice"
                        size={12}
                        color={colors.BLUE_2}
                        solid
                    ></Icon>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataTitle}>
                        ACCOUNT
                    </Text>
                    <Text style={styles.data}>
                        {state.user.account}
                    </Text>
                </View>
                <View style={{ ...styles.iconView, justifyContent: "flex-end" }}>
                    <Icon
                        name="chevron-right"
                        size={12}
                        color={colors.BLUE_1}
                        solid
                    ></Icon>
                </View>
            </View>
            <View style={styles.itemView}>
                <View style={styles.iconView}>
                    <Icon
                        name="money-bill-alt"
                        size={12}
                        color={colors.BLUE_2}
                        solid
                    ></Icon>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataTitle}>
                        REPORTED AMOUNT
                    </Text>
                    <Text style={styles.data}>
                        ${String((parseFloat(state.deposit.value).toFixed(2))).replace(".", ",")} USD
                    </Text>
                </View>
                <View style={styles.iconView}>
                </View>
            </View>
            <View style={styles.imageRender}>
                <ImageBackground
                    source={{ uri: state.deposit.check_img }}
                    resizeMode="cover"
                    style={{ height: "100%", width: "100%" }}
                ></ImageBackground>
            </View>
            <View style={styles.buttons}>
                <CustomButton
                    height="100%"
                    width="45%"
                    onPress={() => askToConfirmDeposit(depositStatus.REJECTED)}
                    text="REJECT"
                ></CustomButton>
                <CustomButton
                    height="100%"
                    width="45%"
                    onPress={() => askToConfirmDeposit(depositStatus.ACCEPTED)}
                    text="ACCEPT"
                ></CustomButton>
            </View>
        </View>
    )
}

const __getDepositImage = async (params, setState) => {
    const token = await __getUserToken()

    getDepositDetails(params.id, params.account, token).then(getDepositRes => {
        const extension = getDepositRes.data.deposit.check_img.split(".")[1]

        setState({
            deposit: {
                description: params.description,
                value: params.value,
                id: params.id,
                updated_at: params.updated_at,
                check_img: `data:image/${extension};base64,${getDepositRes.data.deposit.checkImgBase64}`
            },
            user: {
                username: params.username,
                account: params.account,
                email: params.email
            }
        })
    })
}

const __acceptDeposit = async (state, status, navigation) => {
    const token = await __getUserToken()
    changeDepositStatus(state.user.account, status, state.deposit.id, token).then(changeDepositRes => {
        simpleAlert("Success", "Deposit status changed")
        navigation.goBack()
    }).catch(err => {
        simpleAlert("Errror", err.description)
    })
}

const __getUserToken = () => {
    return AsyncStorage.getItem("userData").then(userData => {
        return JSON.parse(userData).data.token
    })
}

export default AdminDepositApprove
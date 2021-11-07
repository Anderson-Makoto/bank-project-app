import React from "react"
import { Alert } from "react-native"

const simpleAlert = (title, msg, func = () => { }) => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: "Ok",
                onPress: func
            }
        ]
    )
}

const confirmationAlert = (title, msg, funcYes = () => { }, funcNo = () => { }) => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: "Ok",
                onPress: funcYes
            },
            {
                text: "Cancelar",
                onPress: funcNo
            }
        ]
    )
}

export { simpleAlert, confirmationAlert }
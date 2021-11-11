import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react"
import { View, Text } from "react-native"
import { simpleAlert } from "../../helpers/alert"
import { emailValidation, passwordValidation } from "../../helpers/inputValidators"
import { userLogin } from "../../routes/user.route"
import CustomButton from "../../sharedComponents/button/customButton.component"
import CircularTextInput from "../../sharedComponents/circularTextInput/circularTextInput.component"
import styles from "./login.style"

const Login = props => {
    let userEmail = "", userPassword = ""

    const loginUser = () => {
        const areInputsValid = __areInputsValid()

        if (areInputsValid) {
            userLogin(userEmail, userPassword).then(userLoginRes => {
                AsyncStorage.setItem("userData", JSON.stringify(userLoginRes)).then(() => {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: userLoginRes.data.user.is_admin ? "AdminDrawer" : "Drawer" }]
                    })
                })
            }).catch(err => {
                simpleAlert("Error", err.description)
            })
        }
    }

    const __areInputsValid = () => {
        if (!emailValidation(userEmail)) {
            simpleAlert("Attention", "Insert a valid email format")
            return false
        }
        if (!passwordValidation(userPassword)) {
            simpleAlert("Attention", "Password must contain only alphanumeric values and have between 6 and 12 characters")
            return false
        }

        return true
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    BNB Bank
                </Text>
            </View>
            <View style={styles.content}>
                <CircularTextInput
                    type="email-address"
                    height="10%"
                    width="80%"
                    placeholder="email"
                    onChangeText={value => userEmail = value}
                />
                <CircularTextInput
                    type="default"
                    height="10%"
                    width="80%"
                    placeholder="password"
                    password={true}
                    onChangeText={value => userPassword = value}
                />
                <CustomButton
                    height="10%"
                    width="85%"
                    text="SIGN IN"
                    onPress={loginUser}
                >

                </CustomButton>
            </View>

        </View>
    )
}

export default Login
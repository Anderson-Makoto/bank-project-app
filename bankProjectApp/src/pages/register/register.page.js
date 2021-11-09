import React from "react"
import { View, Text } from "react-native"
import CustomButton from "../../sharedComponents/button/customButton.component"
import styles from "./register.style"
import { userCreate } from "../../routes/user.route"
import { emailValidation, nameValidation, passwordValidation } from "../../helpers/inputValidators"
import { simpleAlert } from "../../helpers/alert"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CircularTextInput from "../../sharedComponents/circularTextInput/circularTextInput.component"

const Register = props => {
    let username = "", userEmail = "", userPassword = ""

    const usernameTextChange = value => {
        username = value
    }

    const userEmailTextChange = value => {
        userEmail = value
    }

    const userPasswordTextChange = value => {
        userPassword = value
    }

    const createUser = () => {
        const areInputsValid = __areInputsValid()

        if (areInputsValid) {
            userCreate(
                username,
                userEmail,
                userPassword
            ).then(userCreateRes => {
                AsyncStorage.setItem("userData", JSON.stringify(userCreateRes)).then(() => {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: "Drawer" }]
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
        if (!nameValidation(username)) {
            simpleAlert("Attention", "Insert a valid username")
            return false
        }
        if (!passwordValidation(userPassword)) {
            simpleAlert("Attention", "Password must contain only alphanumeric values and have between 6 and 12 characters")
            return false
        }

        return true
    }

    const __goToLoginScreen = () => {
        props.navigation.navigate("Login")
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
                    type="default"
                    height="10%"
                    width="80%"
                    placeholder="username"
                    onChangeText={usernameTextChange}
                />
                <CircularTextInput
                    type="email-address"
                    height="10%"
                    width="80%"
                    placeholder="email"
                    onChangeText={userEmailTextChange}
                />
                <CircularTextInput
                    type="default"
                    height="10%"
                    width="80%"
                    placeholder="password"
                    onChangeText={userPasswordTextChange}
                    password={true}
                />
                <CustomButton
                    height="10%"
                    width="85%"
                    text="SIGN UP"
                    onPress={(createUser)}
                >
                </CustomButton>
                <Text
                    style={styles.alreadyHaveAccountText}
                    onPress={() => __goToLoginScreen()}
                >
                    Already have an account?
                </Text>
            </View>

        </View>
    )
}

export default Register
import { StyleSheet } from "react-native"
import { colors } from "../../helpers/constants"

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.BLUE_1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 15,
        color: colors.WHITE
    }
})

export default styles
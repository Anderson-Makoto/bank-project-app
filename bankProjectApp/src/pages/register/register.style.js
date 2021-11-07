import { StyleSheet } from "react-native"
import { colors } from "../../helpers/constants"

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        flex: 1
    },
    title: {
        flex: 1,
        backgroundColor: colors.BLUE_1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    titleText: {
        fontSize: 30,
        marginTop: "20%",
        color: colors.WHITE
    },
    content: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%"
    },
    alreadyHaveAccountText: {
        color: colors.BLUE_1
    }
})

export default styles
import { StyleSheet } from "react-native"
import { colors } from "../../helpers/constants"

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center"
    },
    menuTitle: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.BLUE_2,
        justifyContent: "center",
        alignItems: "center",
        height: "20%"
    },
    menuTitleText: {
        fontSize: 30,
        color: colors.WHITE,
    },
    content: {
        color: colors.BLUE_1,
        fontSize: 30,
        height: "80%"
    }
})

export default styles
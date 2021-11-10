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
        alignItems: "center"
    },
    menuTitleText: {
        fontSize: 30,
        color: colors.WHITE,
    },
    content: {
        flex: 6,
        backgroundColor: colors.BLUE_1,
        width: "100%"
    },
    itemLabel: {
        color: colors.WHITE,
        fontWeight: "bold",
        fontSize: 12
    }
})

export default styles
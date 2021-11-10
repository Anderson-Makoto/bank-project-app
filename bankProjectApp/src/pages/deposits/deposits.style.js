import { StyleSheet } from "react-native"
import { colors } from "../../helpers/constants"

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flexDirection: "column"
    },
    title: {
        height: "10%",
        width: "100%"
    },
    tabView: {
        height: "10%",
        width: "100%",
        backgroundColor: colors.BLUE_3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    tab: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.BLUE_1
    },
    tabText: {
        fontSize: 15,
        color: colors.BLUE_1,
    },

    dateView: {
        height: "10%",
        paddingHorizontal: "5%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.BLUE_4
    }, dateText: {
        color: colors.BLUE_1,
        fontSize: 15
    },
    list: {
        height: "70%",
        width: "100%",
    }
})

export default styles
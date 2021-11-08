import { StyleSheet } from "react-native"
import { colors } from "../../helpers/constants"

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    title: {
        height: "10%",
        width: "100%",
        backgroundColor: colors.BLUE_2,
        flexDirection: "row",
        alignItems: "center"
    },
    lineView: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text1: {
        fontWeight: "bold",
        fontSize: 12
    },
    balanceValue: {
        color: colors.WHITE,
        fontSize: 20
    },
    balanceDate: {
        justifyContent: "center",
        alignItems: "center"
    },
    dateText: {
        color: colors.WHITE,
        fontSize: 15
    },
    transactionText: {
        color: colors.BLUE_1,
        fontSize: 20
    },
    listView: {
        height: "50%",
        width: "100%"
    },
    listItemLineView: {
        height: "100%",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    }
})

export default styles
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
    },
    dataView: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        alignItems: "center"
    },
    leftContent: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    label: {
        fontSize: 10,
        fontWeight: "bold"
    },
    balanceValue: {
        fontSize: 20,
        color: colors.WHITE
    },
    value: {
        fontSize: 15
    },
    rightContent: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    dateText: {
        color: colors.WHITE,
        fontSize: 15
    },
    incomesAndExpensesValues: {
        fontSize: 15
    },
    dateView: {
        flexDirection: "row"
    },



    lineView: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "5%"
    },
    text1: {
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
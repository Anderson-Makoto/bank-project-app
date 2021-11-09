import { StyleSheet } from "react-native"
import { colors } from "../../helpers/constants"

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flexDirection: "column"
    },
    header: {
        height: "10%",
        width: "100%"
    },
    balanceView: {
        height: "10%",
        width: "100%",
        paddingHorizontal: "5%",
        backgroundColor: colors.BLUE_4,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        marginBottom: "7%"
    },
    balanceTitleText: {
        fontSize: 10,
        color: colors.BLUE_2,
    },
    balanceValueText: {
        fontSize: 15,
        color: colors.BLUE_1,
        fontWeight: "bold"
    },
    inputsView: {
        height: "30%",
        width: "100%",
        paddingHorizontal: "5%",
        flexDirection: "column"
    },
    input: {
        height: "33%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    amountInput: {
        height: "100%",
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    usdView: {
        height: "100%",
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    usd: {
        fontSize: 15,
        color: colors.BLUE_1
    },
    confirmPurchaseView: {
        height: "43%",
        width: "100%",
        paddingHorizontal: "5%",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
    }
})

export default styles
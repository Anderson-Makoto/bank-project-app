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
        backgroundColor: colors.BLUE_3,
        flexDirection: "row",
        alignItems: "center"
    },
    content: {
        height: "90%",
        width: "100%"
    },
    itemView: {
        borderBottomWidth: 1,
        borderColor: colors.BLUE_3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%"
    },
    customerDate: {
        flexDirection: "column",
        justifyContent: "space-between"
    },
    text1: {
        fontWeight: "bold",
        fontSize: 12,
        color: colors.BLUE_1
    },
})

export default styles
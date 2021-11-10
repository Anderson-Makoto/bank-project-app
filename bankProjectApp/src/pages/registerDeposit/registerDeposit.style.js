import { StyleSheet } from "react-native";
import { colors } from "../../helpers/constants";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        height: "10%",
        width: "100%",
        backgroundColor: colors.BLUE_4,
        flexDirection: "row",
        alignItems: "center"
    },
    amountView: {
        flexDirection: "row",
        height: "33%",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"

    },
    valuesView: {
        height: "35%",
        width: "100%",
        justifyContent: "flex-end",
        flexDirection: "column",
        paddingHorizontal: "5%",
    },
    lineView: {
        height: "10%",
        width: "100%",
        paddingHorizontal: "5%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    text1: {
        fontSize: 12
    },
    balanceValue: {
        color: colors.BLUE_1,
        fontSize: 15,
    },
    input: {
        flexDirection: "row",
        width: "100%",
        height: "30%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    maskedInputText: {
        borderBottomWidth: 1,
        borderColor: colors.BLUE_2,
        color: colors.BLUE_1,
        width: "80%",
        height: 2,
        fontSize: 12,
        height: "50%"
    },
    InputText: {
        borderBottomWidth: 1,
        borderColor: colors.BLUE_2,
        color: colors.BLUE_1,
        width: "100%",
        height: "20%",
        fontSize: 12
    },
    imageView: {
        height: "35%",
        marginTop: "10%",
        width: "100%",
        paddingHorizontal: "5%"
    },
    imagePicker: {
        height: "70%",
        width: "100%",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.BLUE_2,
        marginBottom: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    imageRender: {
        height: "100%",
        width: "100%"
    }
})

export default styles
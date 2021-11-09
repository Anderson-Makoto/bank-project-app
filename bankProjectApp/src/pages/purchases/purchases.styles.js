import { StyleSheet } from "react-native";
import { colors } from "../../helpers/constants";

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
    list: {

    },
    dateView: {
        height: "10%",
        paddingHorizontal: "5%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.BLUE_4
    },
    dateText: {
        color: colors.BLUE_1,
        fontSize: 15
    }
})

export default styles
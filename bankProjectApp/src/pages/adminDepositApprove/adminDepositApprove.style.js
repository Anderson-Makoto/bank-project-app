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
    itemView: {
        height: "10%",
        width: "100%",
        paddingHorizontal: "5%",
        paddingTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconView: {
        width: "10%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    dataView: {
        width: "80%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    dataTitle: {
        fontSize: 10,
        color: colors.BLUE_2
    },
    data: {
        fontSize: 15,
        color: colors.BLUE_1
    },
    imageRender: {
        height: "35%",
        width: "100%",
        paddingHorizontal: "5%",
        paddingTop: "5%"
    },
    buttons: {
        height: "7%",
        width: "100%",
        paddingHorizontal: "5%",
        marginTop: "8%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default styles
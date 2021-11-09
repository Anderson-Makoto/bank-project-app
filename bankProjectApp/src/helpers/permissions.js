import { PermissionsAndroid } from "react-native"
import { simpleAlert } from "./alert";

const storageReadPermission = async (funcYes, funcNo = () => { }) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: "Permission",
                message:
                    "Allow this app to access your device's storage?",
                buttonNegative: "Cancel",
                buttonPositive: "Ok"
            }
        );

        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            funcYes()
        } else {
            funcNo()
        }
    } catch (err) {
        simpleAlert("Error", "Could not grant permission")
    }

}

export { storageReadPermission }
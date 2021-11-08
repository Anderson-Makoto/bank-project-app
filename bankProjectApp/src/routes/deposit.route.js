const axios = require("axios").default
import { BASE_URL } from "../helpers/constants"

const getApprovedDepositsByMonth = (
    user_fk,
    deposit_status_fk,
    year,
    month,
    token
) => {
    return axios.post(BASE_URL + "/deposit/getUserDepositsByStatusAndByMonth", {
        user_fk,
        deposit_status_fk,
        year,
        month
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response.data
    })
}

const registerDepositPending = (
    value,
    user_fk,
    image,
    description,
    token
) => {
    let formData = new FormData()

    formData.append("user_fk", user_fk)
    formData.append("value", parseFloat(value))
    formData.append("description", description)
    formData.append("image", {
        uri: image.uri,
        name: image.fileName,
        type: image.type
    })

    return axios.post(BASE_URL + "/deposit/save", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        console.log(error.response.data)
        throw error.response.data
    })
}

export { getApprovedDepositsByMonth, registerDepositPending }
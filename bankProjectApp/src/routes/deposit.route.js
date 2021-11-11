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
    formData.append("value", parseFloat(value).toFixed(2))
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
        throw error.response.data
    })
}

const getAllPendingDeposits = token => {
    return axios.get(BASE_URL + "/deposit/getPendingDeposits", {
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

const getDepositDetails = (depositId, customerId, token) => {
    return axios.get(BASE_URL + `/deposit/getDepositDetailsbyId/${depositId}/${customerId}`, {
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

const changeDepositStatus = (customerId, status, depositId, token) => {
    return (
        axios.get(BASE_URL + `/deposit/changeDepositStatus/${depositId}/${status}/${customerId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            throw error.response.data
        })
    )
}

export {
    getApprovedDepositsByMonth,
    registerDepositPending,
    getAllPendingDeposits,
    getDepositDetails,
    changeDepositStatus
}
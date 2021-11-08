const axios = require("axios").default
import { BASE_URL } from "../helpers/constants"

const getAllPurchasesByMonth = (
    year,
    month,
    token
) => {
    return axios.get(BASE_URL + `/purchase/getAll/${month}/${year}`, {
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

export { getAllPurchasesByMonth }
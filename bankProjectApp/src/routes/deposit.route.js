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

export { getApprovedDepositsByMonth }
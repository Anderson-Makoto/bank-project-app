const axios = require("axios").default
import { BASE_URL } from "../helpers/constants"

const userCreate = (name, email, password) => {

    return axios.post(BASE_URL + "/user/register", {
        name,
        email,
        password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response.data
    })
}

const userLogin = (email, password) => {
    return axios.post(BASE_URL + "/user/login", {
        email,
        password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        throw error.response.data
    })
}

const userLogout = (id, token) => {
    return axios.get(BASE_URL + `/user/logout/${id}`, {
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

const getBalance = (token) => {
    return axios.get(BASE_URL + "/user/getBalance", {
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

export { userCreate, userLogin, getBalance, userLogout }
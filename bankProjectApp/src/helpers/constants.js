const colors = {
    BLUE_1: "#2799FB",
    BLUE_2: "#BDE0FE",
    BLUE_3: "#DAEFFF",
    BLUE_4: "#A9E8FA",
    WHITE: "#FFFFFF",
    PURCHASE: "#EF4B30"
}

const depositStatus = {
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const BASE_URL = "https://bank-project-api.herokuapp.com/api"

export { colors, BASE_URL, depositStatus, monthNames }
const colors = {
    BLUE_1: "#2799FB",
    BLUE_2: "#BDE0FE",
    BLUE_3: "#DAEFFF",
    BLUE_4: "#F1F9FE",
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

const BASE_URL = "http://10.0.2.2:3000/api"

export { colors, BASE_URL, depositStatus, monthNames }
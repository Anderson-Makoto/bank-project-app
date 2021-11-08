const emailValidation = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const nameValidation = name => {
    var re = /^([A-Za-z]{2,}\s)*[A-Za-z]{2,}$/
    return re.test(name)
}

const passwordValidation = pass => {
    var re = /^[A-Za-z0-9]{6,12}$/
    return re.test(pass)
}

const amountValidation = pass => {
    var re = /^\d{1,9}(\,(\d){1,2}){0,1}$/
    return re.test(pass)
}

const descriptionValidation = pass => {
    var re = /^([A-Za-z0-9]{1,}\s)*[A-Za-z0-9]{1,}$/
    return re.test(pass)
}

export {
    emailValidation,
    nameValidation,
    passwordValidation,
    amountValidation,
    descriptionValidation
}
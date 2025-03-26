export { config, getInitialCards, responseProcessing, getCurrentUserData, changeProfileData, changeProfileImage}

//------------------- CONFIG -------------------
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        authorization: '7263799d-0cc7-4c40-bf32-62633bf1c840',
        'Content-Type': 'application/json'
    }
}

const responseProcessing = res => 
    res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`)


//------------------- GET -------------------
// Профиль
const getCurrentUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(responseProcessing)
}

// Карточки
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(responseProcessing)
}


//------------------- PATCH -------------------
// Профиль
const changeProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    })
    .then(responseProcessing)
}

// Аватар
const changeProfileImage = avatar => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    })
    .then(responseProcessing)
}

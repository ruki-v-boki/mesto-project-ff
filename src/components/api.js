export { getCurrentUserData, getInitialCards, changeProfileData, changeProfileImage, postNewCard, deleteCard, switchLike }

//------------------- CONFIG -------------------
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        authorization: '7263799d-0cc7-4c40-bf32-62633bf1c840',
        'Content-Type': 'application/json',
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
const changeProfileData = newProfileData => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(newProfileData),
    })
    .then(responseProcessing)
}

// Аватар
const changeProfileImage = newAvatar => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(newAvatar),
    })
    .then(responseProcessing)
}


//------------------- POST -------------------
// Карточка
const postNewCard = newCardData => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCardData)
    })
    .then(responseProcessing)
}


//------------------- DELETE -------------------
// Карточка
const deleteCard = cardId => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(responseProcessing)
}

// Лайк Карточки
const switchLike = (cardId, likeStatus) => {
    const variableMethod = likeStatus ? 'DELETE' : 'PUT'

    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: variableMethod,
        headers: config.headers,
    })
    .then(responseProcessing)
}



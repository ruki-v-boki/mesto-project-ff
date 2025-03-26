export { config, getInitialCards, getUserData }

// Основные настройки запроса к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        authorization: '7263799d-0cc7-4c40-bf32-62633bf1c840',
        'Content-Type': 'application/json'
    }
}

// Загрузка информации о пользователе с сервера
const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then((userData) => {
        return userData
    })
    .catch((err) => {
        console.error(`Упс, ошибочка вышла: ${err}`)
    })
}

// Загрузка карточек с сервера
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then((cardsData) => {
        return cardsData
    })
    .catch((err) => {
        console.error(`Упс, ошибочка вышла: ${err}`)
    })
}

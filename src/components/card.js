export { createCard, deleteCard, toggleLike }

// Функция создания карточки
function createCard(cardData, deleteCard, toggleLike) {
    const cardTemplate = document.querySelector('#card-template').content
    const card = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = card.querySelector('.card__image')
    const cardTitle = card.querySelector('.card__title')

    const cardDeleteButton = card.querySelector('.card__delete-button')
    const cardLikeButton = card.querySelector('.card__like-button')

    cardImage.src = cardData.link
    cardImage.alt = cardData.name
    cardTitle.textContent = cardData.name

    cardDeleteButton.addEventListener('click', deleteCard)
    cardLikeButton.addEventListener('click', toggleLike)

    return card
}

// Функции-обработчик события удаления карточки
const deleteCard = evt => {
    if (evt.target === evt.currentTarget) {
        evt.currentTarget.closest('.card').remove()
    }
}

// Функции-обработчик события переключения лайка карточки
const toggleLike = evt => {
    if (evt.target === evt.currentTarget) {
        evt.currentTarget.classList.toggle('card__like-button_is-active')
    }
}
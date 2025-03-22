export { createCard, deleteCard, switchTheLikeBtn }

// Функция создания карточки
function createCard(cardData, deleteCard, switchTheLikeBtn, openImgModal, currentUserId, cardAuthorId) {
    const cardTemplate = document.querySelector('#card-template').content
    const card = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = card.querySelector('.card__image')
    const cardTitle = card.querySelector('.card__title')

    const cardDeleteButton = card.querySelector('.card__delete-button')
    const cardLikeButton = card.querySelector('.card__like-button')

    const cardImageName = cardData.name
    const cardImageLink = cardData.link

    cardImage.src = cardImageLink
    cardImage.alt = cardImageName
    cardTitle.textContent = cardImageName

    cardDeleteButton.addEventListener('click', deleteCard)
    cardLikeButton.addEventListener('click', switchTheLikeBtn)
    cardImage.addEventListener('click', () => openImgModal(cardImageName, cardImageLink))

    if (currentUserId !== cardAuthorId) {
        cardDeleteButton.style.display = 'none'
    }

    return card
}

// Функции-обработчик события удаления карточки
const deleteCard = evt => {
    if (evt.target === evt.currentTarget) {
        evt.currentTarget.closest('.card').remove()
    }
}

// Функции-обработчик события переключения лайка карточки
const switchTheLikeBtn = evt => {
    if (evt.target === evt.currentTarget) {
        evt.currentTarget.classList.toggle('card__like-button_is-active')
    }
}
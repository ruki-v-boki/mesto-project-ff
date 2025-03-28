export { createCard }

// Функция создания карточки
function createCard(cardData, switchLike, openImgModal, openConfirmDeleteModal, currentUserId, cardAuthorId,) {
    const cardTemplate = document.querySelector('#card-template').content
    const card = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = card.querySelector('.card__image')
    const cardTitle = card.querySelector('.card__title')

    const cardDeleteButton = card.querySelector('.card__delete-button')
    const cardLikeButton = card.querySelector('.card__like-button')

    const cardLikesCounterElement = card.querySelector('.card__likes-counter')
    const isLikedByCurrentUser = cardData.likes.some(card => card._id === currentUserId)

    cardImage.src = cardData.link
    cardImage.alt = `На картинке изображено: ${cardData.name}`
    cardTitle.textContent = cardData.name
    cardLikesCounterElement.textContent = cardData.likes.length
    card.dataset.cardId = cardData._id


//------------------- СЛУШАТЕЛИ -------------------
    cardLikeButton.addEventListener('click', () => {
        switchLike(cardData._id, cardLikeButton, cardLikesCounterElement)
        .then(updatedCard => {
            cardLikeButton.classList.toggle('card__like-button_is-active')
            cardLikesCounterElement.textContent = updatedCard.likes.length

            if (cardLikesCounterElement.textContent < 1) {
                cardLikesCounterElement.style.display = 'none'
            } else {
                cardLikesCounterElement.style.display = 'block'
            }
        })
        .catch(err => console.error(`Упс, лайнуть не удалось: ${err}`))
    })

    cardImage.addEventListener('click', () => {
        openImgModal(cardData.name, cardData.link)
    })

    cardDeleteButton.addEventListener('click', () => {
        openConfirmDeleteModal(cardData._id)
    })


//------------------- УСЛОВИЯ -------------------
    if (currentUserId !== cardAuthorId) {
        cardDeleteButton.style.display = 'none'
    }

    if (isLikedByCurrentUser) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    if (cardData.likes.length === 0) {
        cardLikesCounterElement.style.display = 'none'
    } else {
        cardLikesCounterElement.style.display = 'block'
    }


    return card
}

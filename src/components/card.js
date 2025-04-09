export { createCard, deleteCardElement }

// Функция создания карточки
function createCard(cardData, switchLike, openImageModal, openConfirmDeleteModal, currentUserId) {
    const cardTemplate = document.querySelector('#card-template').content
    const card = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = card.querySelector('.card__image')
    const cardTitle = card.querySelector('.card__title')

    const cardDeleteButton = card.querySelector('.card__delete-button')
    const cardLikeButton = card.querySelector('.card__like-button')

    const cardLikesCounterElement = card.querySelector('.card__likes-counter')
    const isLikedByCurrentUser = cardData.likes.some(card => card._id === currentUserId)

    cardImage.src = cardData.link
    cardImage.alt = cardData.name
    cardTitle.textContent = cardData.name
    cardLikesCounterElement.textContent = cardData.likes.length


//------------------- СЛУШАТЕЛИ -------------------
    cardLikeButton.addEventListener('click', () => {
        const isCardLiked = cardLikeButton.classList.contains('card__like-button_is-active')

        switchLike(cardData._id, isCardLiked)
        .then(updatedCard => {
            cardLikeButton.classList.toggle('card__like-button_is-active')
            cardLikesCounterElement.textContent = updatedCard.likes.length

            if (cardLikesCounterElement.textContent < 1) {
                cardLikesCounterElement.classList.add('display-disabled')
            } else {
                cardLikesCounterElement.classList.remove('display-disabled')
            }
        })
        .catch(err => console.error(`Упс, лайкнуть не удалось: ${err}`))
    })

    cardImage.addEventListener('click', () => {
        openImageModal(cardData.name, cardData.link)
    })

    cardDeleteButton.addEventListener('click', () => {
        openConfirmDeleteModal(cardData._id, card)
    })


//------------------- УСЛОВИЯ -------------------
    if (currentUserId !== cardData.owner._id) {
        cardDeleteButton.classList.add('display-disabled')
    }

    if (isLikedByCurrentUser) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    if (cardData.likes.length === 0) {
        cardLikesCounterElement.classList.add('display-disabled')

    } else {
        cardLikesCounterElement.classList.remove('display-disabled')
    }


    return card
}

// Функция удаления карточки
function deleteCardElement(cardElement) {
    cardElement.remove()
}
export { createCard, switchTheLikeBtn }

// Функция создания карточки
function createCard(cardData, switchTheLikeBtn, openImgModal, openConfirmDeleteModal, currentUserId, cardAuthorId,) {
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

    cardDeleteButton.addEventListener('click', () => {
        openConfirmDeleteModal(cardData._id)
    })

    cardLikeButton.addEventListener('click', () => {
        switchTheLikeBtn(cardData._id, cardLikeButton, cardLikesCounterElement)
    })

    cardImage.addEventListener('click', () => {
        openImgModal(cardData.name, cardData.link)
    })

    if (currentUserId !== cardAuthorId) {
        cardDeleteButton.style.display = 'none'
    }

    if (isLikedByCurrentUser) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    function isEnableLike(cardLikesValue) {
        if (cardLikesValue === 0) {
            cardLikesCounterElement.style.display = 'none'
        } else {
            cardLikesCounterElement.style.display = 'block'
        }
    }

    isEnableLike(cardData.likes.length)

    return card
}


// Функции-обработчик события переключения лайка карточки
const switchTheLikeBtn = (cardId, likeBtn, likeCounter) => {
    const isLiked = likeBtn.classList.contains('card__like-button_is-active')
    const variableMethod = isLiked ? 'DELETE' : 'PUT'

    fetch(`https://nomoreparties.co/v1/wff-cohort-35/cards/likes/${cardId}`, {
        method: variableMethod,
        headers: {
            authorization: '7263799d-0cc7-4c40-bf32-62633bf1c840',
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then(updatedCard => {
        likeBtn.classList.toggle('card__like-button_is-active')
        likeCounter.textContent = updatedCard.likes.length
        if (likeCounter.textContent < 1) {
            likeCounter.style.display = 'none'
        } else {
            likeCounter.style.display = 'block'
        }
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}
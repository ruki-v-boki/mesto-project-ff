export { createCard, deleteCard, toggleLike }

// создать карточку
function createCard(cardData, deleteCard, openModal, toggleLike) {
  const cardTemplate = document.querySelector('#card-template').content
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')
  const cardDeleteButton = card.querySelector('.card__delete-button')
  const cardLikeButton = card.querySelector('.card__like-button')

  const cardImagePopup = document.querySelector('.popup_type_image')
  const popupImage = cardImagePopup.querySelector('.popup__image')
  const popupCaption = cardImagePopup.querySelector('.popup__caption')

  cardImage.src = cardData.link
  cardImage.alt = cardData.name
  cardTitle.textContent = cardData.name

  cardDeleteButton.addEventListener('click', deleteCard)
  cardLikeButton.addEventListener('click', toggleLike)

  cardImage.addEventListener('click', () => {
      openModal(cardImagePopup)
        popupImage.src = cardData.link
        popupImage.alt = cardData.name
        popupCaption.textContent = cardData.name
    })

    return card
}

// функции-обработчик события удаления карточки
const deleteCard = evt => {
  if (evt.target === evt.currentTarget) {
    evt.currentTarget.closest('.card').remove()
  }
}

// // функции-обработчик события переключения лайка карточки
const toggleLike = evt => {
  if (evt.target === evt.currentTarget) {
    evt.currentTarget.classList.toggle('card__like-button_is-active')
  }
}
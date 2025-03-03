export { initialCards, createCard, deleteCard }

// удалить карточку
const deleteCard = card => card.remove()

// создать карточку
function createCard(cardData, deleteCard, openModal) {
  const cardTemplate = document.querySelector('#card-template').content
  const card = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')
  const cardDeleteButton = card.querySelector('.card__delete-button')

  const cardImagePopup = document.querySelector('.popup_type_image')
  const popupImage = cardImagePopup.querySelector('.popup__image')
  const popupCaption = cardImagePopup.querySelector('.popup__caption')

  cardImage.src = cardData.link
  cardImage.alt = cardData.name
  cardTitle.textContent = cardData.name

  cardDeleteButton.addEventListener('click', () => deleteCard(card))

  cardImage.addEventListener('click', () => {
      openModal(cardImagePopup)
        popupImage.src = cardData.link
        popupImage.alt = cardData.name
        popupCaption.textContent = cardData.name
    })

    return card
}

// массив карточек
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


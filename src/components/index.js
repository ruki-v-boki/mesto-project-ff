import '../pages/index.css'
import { config, getInitialCards, getUserData } from './api.js'
import { createCard, deleteCard, switchTheLikeBtn } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'


// Контейнер карточек на странице
const placesList = document.querySelector('.places__list')

// Профиль
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileJob = profile.querySelector('.profile__description')

// Кнопки профиля
const profileEditBtn = profile.querySelector('.profile__edit-button')
const profileAddBtn = profile.querySelector('.profile__add-button')


//-------------- МОДАЛЬНЫЕ ОКНА --------------
// Модальне окна профиля
const profileEditModal = document.querySelector('.popup_type_edit')
const addNewCardModal = document.querySelector('.popup_type_new-card')
const confirmDeleteCardModal = document.querySelector('.popup_type_delete-card')
const confirmDeleteCardBtn = confirmDeleteCardModal.querySelector('.button')

// Модальное окно изображения карточки
const cardImagePopup = document.querySelector('.popup_type_image')
const popupImage = cardImagePopup.querySelector('.popup__image')
const popupCaption = cardImagePopup.querySelector('.popup__caption')

// Все модальные окна
const modals = document.querySelectorAll('.popup')

// Все кнопки закрытия модальных окон
const closeModalButtons = document.querySelectorAll('.popup__close')


//------------------- ФОРМЫ -------------------
// Форма редактирования профиля
const profileEditForm = document.forms['edit-profile']
const profileNameInput = profileEditForm.querySelector('.popup__input_type_name')
const profileJobInput = profileEditForm.querySelector('.popup__input_type_description')

// Форма создания новой карточки
const addNewCardForm = document.forms['new-place']
const newCardNameInput = addNewCardForm.querySelector('.popup__input_type_card-name')
const newCardLinkInput = addNewCardForm.querySelector('.popup__input_type_url')

// Объект настроек валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}


//------------------- ФУНКЦИИ -------------------
// Получить актуальные данные профиля с сервера
function updateProfile() {
    fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then((data) => {
      profileName.textContent = data.name
      profileJob.textContent = data.about
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}

// Отрисовка карточек с сервера
function renderCards(getCards, getUserInfo, cardContainer, createCard) {
    Promise.all([getCards(), getUserInfo()])
        .then(([cards, userInfo]) => {
            cards.forEach(cardData => {
                const currentUserId = userInfo._id
                const cardAuthorId = cardData.owner._id
                cardContainer.append(createCard(cardData, 
                                                deleteCard, 
                                                switchTheLikeBtn, 
                                                openImgModal, 
                                                currentUserId, 
                                                cardAuthorId,
                                                openConfirmDeleteModal, 
                                                ))
            })
        })
        .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}

// Отправка формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileNameInput.value,
            about: profileJobInput.value,
        }),
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then(currentUserData => {
        profileName.textContent = currentUserData.name
        profileJob.textContent = currentUserData.about
        closeModal(profileEditModal)
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}

// Отправка формы создания новой карточки
function handleNewCardFormSubmit(evt) {
    evt.preventDefault()
    const newCard = {
        name: newCardNameInput.value,
        link: newCardLinkInput.value,
    }
    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard)
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then(newCardData => {
        placesList.prepend(createCard(newCardData, deleteCard, switchTheLikeBtn, openImgModal))
        addNewCardForm.reset()
        closeModal(addNewCardModal)
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}

// Функция открытия модального окна изображения карточки
function openImgModal(name, link) {
    openModal(cardImagePopup)
    popupImage.alt = name
    popupCaption.textContent = name
    popupImage.src = link
}

function openConfirmDeleteModal() {
    openModal(confirmDeleteCardModal)
}


//------------------- КНОПКИ -------------------
// Кнопка "Редактировать профиль"
profileEditBtn.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent
    profileJobInput.value = profileJob.textContent
    openModal(profileEditModal)
    clearValidation(profileEditForm, validationConfig)
})

// Кнопка "+" добавить новую карточку
profileAddBtn.addEventListener('click', () => {
    newCardNameInput.value = ''
    newCardLinkInput.value = ''
    openModal(addNewCardModal)
    clearValidation(addNewCardForm, validationConfig)
})

// Кнопка "Сохранить" формы редактирования профиля
profileEditForm.addEventListener('submit', handleProfileFormSubmit)

// Кнопка "Сохранить" формы создания новой карточки
addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// Все кнопки закрытия модальных окон
closeModalButtons.forEach((btn) => {
    const modal = btn.closest('.popup')
    btn.addEventListener('click', () => closeModal(modal))
})

//-----------------------------------------------

// Плавное открытие/закрытие всех модальных окон
modals.forEach((modal) => modal.classList.add('popup_is-animated'))

// Вызовы функций
updateProfile()
renderCards(getInitialCards, getUserData, placesList, createCard)
enableValidation(validationConfig)

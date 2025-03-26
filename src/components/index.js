import '../pages/index.css'
import { config, getInitialCards, getUserData } from './api.js'
import { createCard, deleteCard, switchTheLikeBtn } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'




//-------------- ПРОФИЛЬ --------------
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

// Контейнер карточек
const placesList = document.querySelector('.places__list')




//-------------- МОДАЛЬНЫЕ ОКНА --------------
// Все модальные окна
const modals = document.querySelectorAll('.popup')

// Профиль
const profileEditModal = document.querySelector('.popup_type_edit')
const addNewCardModal = document.querySelector('.popup_type_new-card')

// Аватар
const profileImageEditModal = document.querySelector('.popup_type_new-avatar')

// Карточка
const cardImagePopup = document.querySelector('.popup_type_image')
const popupImage = cardImagePopup.querySelector('.popup__image')
const popupCaption = cardImagePopup.querySelector('.popup__caption')




//-------------- КНОПКИ --------------
// Все кнопки закрытия модальных окон
const closeModalButtons = document.querySelectorAll('.popup__close')

// Профиль
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')




//------------------- ФОРМЫ -------------------
// Профиль
const profileEditForm = document.forms['edit-profile']
const profileNameInput = profileEditForm.querySelector('.popup__input_type_name')
const profileJobInput = profileEditForm.querySelector('.popup__input_type_description')

// Карточка
const addNewCardForm = document.forms['new-place']
const newCardNameInput = addNewCardForm.querySelector('.popup__input_type_card-name')
const newCardLinkInput = addNewCardForm.querySelector('.popup__input_type_url')

// Аватар
const profileEditAvatarForm = document.forms['new-avatar']
const profileEditAvatarInput = profileEditAvatarForm.querySelector('.popup__input_type_url')

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
      profileImage.style.backgroundImage = `url(${data.avatar})`
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
                                                cardAuthorId
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

// Отправка формы изменения аватара
function handleAvatarSubmit(evt) {
    evt.preventDefault()
    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: profileEditAvatarInput.value,
        }),
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Упс, ошибочка вышла: ${res.status}`)
        }
    })
    .then((newAvatar) => {
        profileImage.style.backgroundImage = `url(${newAvatar.avatar})`
        closeModal(profileImageEditModal)
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


//------------------- КНОПКИ -------------------
// Профиль
profileEditBtn.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent
    profileJobInput.value = profileJob.textContent
    openModal(profileEditModal)
    clearValidation(profileEditForm, validationConfig)
})

// Карточка
profileAddBtn.addEventListener('click', () => {
    newCardNameInput.value = ''
    newCardLinkInput.value = ''
    openModal(addNewCardModal)
    clearValidation(addNewCardForm, validationConfig)
})

// Аватар
profileImage.addEventListener('click', () => {
    profileEditAvatarInput.value = ''
    openModal(profileImageEditModal)
    clearValidation(profileEditAvatarForm, validationConfig)
})

// Кнопка "Сохранить" Профиль
profileEditForm.addEventListener('submit', handleProfileFormSubmit)

// Кнопка "Сохранить" Карточка
addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// Кнопка "Сохранить" Аватар
profileEditAvatarForm.addEventListener('submit', handleAvatarSubmit)

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

import '../pages/index.css'
import { getCurrentUserData, getInitialCards, changeProfileData, changeProfileImage, postNewCard, deleteCard, switchLike, checkLinkOnImageType } from './api.js'
import { createCard, deleteCardElement } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'


//------------------- ПРОФИЛЬ -------------------
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

// Контейнер карточек
const cardContainer = document.querySelector('.places__list')


//------------------- МОДАЛЬНЫЕ ОКНА -------------------
// Все модальные окна
const modals = document.querySelectorAll('.popup')

// Профиль
const profileEditModal = document.querySelector('.popup_type_edit')
const addNewCardModal = document.querySelector('.popup_type_new-card')

// Аватар
const profileEditAvatarModal = document.querySelector('.popup_type_new-avatar')

// Карточка
const cardImagePopup = document.querySelector('.popup_type_image')
const popupImage = cardImagePopup.querySelector('.popup__image')
const popupCaption = cardImagePopup.querySelector('.popup__caption')

// Удаление
const confirmDeleteModal = document.querySelector('.popup_type_delete-card')


//------------------- КНОПКИ ------------------
// Все кнопки закрытия модальных окон
const closeModalButtons = document.querySelectorAll('.popup__close')

// Все кнопки модальных окон
const allPopupButtons = document.querySelectorAll('.popup__button')

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

// Удаление
const confirmDeleteForm = document.forms['confirm-delete']

// Объект настроек валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

// Карточка для удаления
const cardForDelete = {
    cardId: '',
    cardElement: null,
}


//------------------- ФУНКЦИИ -------------------
// Лоадер
function renderLoading(isLoading, button, loadingText) {
    if (isLoading) {
        button.classList.add('popup__button_loading')
        button.textContent = loadingText
    } else {
        button.classList.remove('popup__button_loading')
        button.textContent = button.dataset.originalText
    }
}

// Профиль
function updateProfile(profileData) {
    profileName.textContent = profileData.name
    profileJob.textContent = profileData.about
    profileImage.style.backgroundImage = `url(${profileData.avatar})`
}

// Отправка формы Профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    const newProfileData = {
        name: profileNameInput.value,
        about: profileJobInput.value,
    }
    renderLoading(true, evt.submitter, 'Сохранение')

    changeProfileData(newProfileData)
    .then(newProfileData => {
        profileName.textContent = newProfileData.name
        profileJob.textContent = newProfileData.about
        closeModal(profileEditModal)
    })
    .catch(err => console.error(`Упс, ошибочка обновления профиля: ${err}`))
    .finally(() => renderLoading(false, evt.submitter))
}

// Отправка формы Аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault()
    const newAvatar = {avatar: profileEditAvatarInput.value}
    renderLoading(true, evt.submitter, 'Сохранение')

    checkLinkOnImageType(profileEditAvatarInput.value)
    .then(res => {
        if (res) {
            changeProfileImage(newAvatar)
            .then(profileData => {
                profileImage.style.backgroundImage = `url(${profileData.avatar})`
                closeModal(profileEditAvatarModal)
                const errorItem = profileEditAvatarForm.querySelector(`.${profileEditAvatarInput.id}-error`)
                profileEditAvatarInput.classList.remove(validationConfig.inputErrorClass)
                errorItem.classList.remove(validationConfig.errorClass)
            })
        } else {
            throw new Error('Ссылка не ведет на изображение')
        }
    })
    .catch(err => {
        console.error(`Ошибка проверки ссылки аватара: ${err}`)
        const errorItem = profileEditAvatarForm.querySelector(`.${profileEditAvatarInput.id}-error`)
        profileEditAvatarInput.classList.add(validationConfig.inputErrorClass)
        errorItem.classList.add(validationConfig.errorClass)
        errorItem.textContent = 'Увы, эта ссылка не подойдет, попробуйте другую'
    })
    .finally(() => renderLoading(false, evt.submitter))
}

// Отправка формы создания новой Карточки
function handleNewCardFormSubmit(evt) {
    evt.preventDefault()
    const newCard = {
        name: newCardNameInput.value,
        link: newCardLinkInput.value,
    }
    renderLoading(true, evt.submitter, 'Сохранение')

    postNewCard(newCard)
    .then(newCardData => {
        cardContainer.prepend(createCard(newCardData,
                                        switchLike,
                                        openImgModal,
                                        openConfirmDeleteModal,
                                        newCardData.owner._id
        ))
        addNewCardForm.reset()
        closeModal(addNewCardModal)
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
    .finally(() => renderLoading(false, evt.submitter))
}

// Отправка формы подтверждения Удаления
function handleConfirmDeleteFormSubmit(evt) {
    evt.preventDefault()
    renderLoading(true, evt.submitter, 'Удаление')

    deleteCard(cardForDelete.cardId)
    .then(() => {
        deleteCardElement(cardForDelete.cardElement)
        closeModal(confirmDeleteModal)
    })
    .catch(err => console.error("Ошибка удаления:", err))
    .finally(() => renderLoading(false, evt.submitter))
}

// Открытие попапа картинки Карточки
function openImgModal(name, link) {
    openModal(cardImagePopup)
    popupImage.alt = name
    popupCaption.textContent = name
    popupImage.src = link

    cardImagePopup.querySelector('.popup__close').focus()
}

// Открытие попапа Удаления
function openConfirmDeleteModal(cardId, cardElement) {
    cardForDelete.cardId = cardId
    cardForDelete.cardElement = cardElement

    openModal(confirmDeleteModal)

    confirmDeleteForm.elements['delete-button'].focus()
}


//------------------- СЛУШАТЕЛИ -------------------
// Все кнопки закрытия модальных окон
closeModalButtons.forEach(btn => {
    const modal = btn.closest('.popup')
    btn.addEventListener('click', () => closeModal(modal))
})

// Профиль
profileEditBtn.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent
    profileJobInput.value = profileJob.textContent
    openModal(profileEditModal)
    clearValidation(profileEditForm, validationConfig)

    profileNameInput.focus()
})

// Карточка
profileAddBtn.addEventListener('click', () => {
    newCardNameInput.value = ''
    newCardLinkInput.value = ''
    openModal(addNewCardModal)
    clearValidation(addNewCardForm, validationConfig)

    newCardNameInput.focus()
})

// Аватар
profileImage.addEventListener('click', () => {
    profileEditAvatarInput.value = ''
    openModal(profileEditAvatarModal)
    clearValidation(profileEditAvatarForm, validationConfig)

    profileEditAvatarInput.focus()
})

// "Сохранить" Профиль
profileEditForm.addEventListener('submit', handleProfileFormSubmit)

// "Сохранить" Карточка
addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// "Сохранить" Аватар
profileEditAvatarForm.addEventListener('submit', handleAvatarFormSubmit)

// "Да" Удаление
confirmDeleteForm.addEventListener('submit', handleConfirmDeleteFormSubmit)


//-----------------------------------------------
// Записываю оригинальный текст кнопок
allPopupButtons.forEach(btn => {
    btn.dataset.originalText = btn.textContent
})

// Плавное открытие/закрытие всех модальных окон
modals.forEach(modal => {
    modal.classList.add('popup_is-animated')
})

// Вызовы функций
enableValidation(validationConfig)
//-----------------------------------------------


Promise.all([getInitialCards(), getCurrentUserData()])
    .then(([cards, userData]) => {
        cards.forEach(cardData => {
            cardContainer.append(createCard(cardData,
                                            switchLike,
                                            openImgModal,
                                            openConfirmDeleteModal,
                                            userData._id
            ))
        })
        updateProfile(userData)
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
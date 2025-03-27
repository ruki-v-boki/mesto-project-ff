import '../pages/index.css'
import { getCurrentUserData, getInitialCards, changeProfileData, changeProfileImage, postNewCard, deleteCard } from './api.js'
import { createCard, switchTheLikeBtn } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'


//-------------- ПРОФИЛЬ --------------
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

// Контейнер карточек
const cardContainer = document.querySelector('.places__list')


//-------------- МОДАЛЬНЫЕ ОКНА --------------
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


//------------------- ФУНКЦИИ -------------------
// Профиль
function updateProfile() {
    getCurrentUserData()
    .then(profileData => {
      profileName.textContent = profileData.name
      profileJob.textContent = profileData.about
      profileImage.style.backgroundImage = `url(${profileData.avatar})`
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}

// Отправка формы редактирования Профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault()

    const newProfileData = {
        name: profileNameInput.value,
        about: profileJobInput.value,
    }

    changeProfileData(newProfileData)
    .then(newProfileData => {
        profileName.textContent = newProfileData.name
        profileJob.textContent = newProfileData.about
        closeModal(profileEditModal)
    })
    .catch(err => console.error(`Упс, ошибочка обновления профиля: ${err}`))
}

// Отправка формы изменения Аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault()

    const newAvatar = {avatar: profileEditAvatarInput.value}

    changeProfileImage(newAvatar)
    .then((profileData) => {
        profileImage.style.backgroundImage = `url(${profileData.avatar})`
        closeModal(profileEditAvatarModal)
    })
    .catch(err => console.error(`Упс, ошибочка загрузки аватара: ${err}`))
}

// Отправка формы создания новой Карточки
function handleNewCardFormSubmit(evt) {
    evt.preventDefault()

    const newCard = {
        name: newCardNameInput.value,
        link: newCardLinkInput.value,
    }

    postNewCard(newCard)
    .then(newCardData => {
        cardContainer.prepend(createCard(newCardData,
                                        switchTheLikeBtn,
                                        openImgModal,
                                        openConfirmDeleteModal
        ))
        addNewCardForm.reset()
        closeModal(addNewCardModal)
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
}

// Открытие попапа картинки Карточки
function openImgModal(name, link) {
    openModal(cardImagePopup)
    popupImage.alt = `На картинке изображено: ${name}`
    popupCaption.textContent = name
    popupImage.src = link
}

// Открытие попапа Удаления
function openConfirmDeleteModal(cardId) {
    confirmDeleteModal.dataset.cardId = cardId
    openModal(confirmDeleteModal)
}


//------------------- СЛУШАТЕЛИ -------------------
// Все кнопки закрытия модальных окон
closeModalButtons.forEach((btn) => {
    const modal = btn.closest('.popup')
    btn.addEventListener('click', () => closeModal(modal))
})

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
    openModal(profileEditAvatarModal)
    clearValidation(profileEditAvatarForm, validationConfig)
})

// "Сохранить" Профиль
profileEditForm.addEventListener('submit', handleProfileFormSubmit)

// "Сохранить" Карточка
addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// "Сохранить" Аватар
profileEditAvatarForm.addEventListener('submit', handleAvatarFormSubmit)

// "Да" Удаление
confirmDeleteForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const cardId = confirmDeleteModal.dataset.cardId
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)

    deleteCard(cardId)
    .then(() => {
        cardElement.remove()
        closeModal(confirmDeleteModal)
    })
    .catch(err => console.error("Ошибка удаления:", err))
})


//-----------------------------------------------

// Плавное открытие/закрытие всех модальных окон
modals.forEach((modal) => modal.classList.add('popup_is-animated'))

// Вызовы функций
updateProfile()
enableValidation(validationConfig)

Promise.all([getInitialCards(), getCurrentUserData()])
    .then(([cards, userData]) => {
        cards.forEach(cardData => {
            const currentUserId = userData._id
            const cardAuthorId = cardData.owner._id
            cardContainer.append(createCard(cardData, 
                                            switchTheLikeBtn, 
                                            openImgModal, 
                                            openConfirmDeleteModal,
                                            currentUserId, 
                                            cardAuthorId,
            ))
        })
    })
    .catch(err => console.error(`Упс, ошибочка вышла: ${err}`))
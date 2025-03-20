import '../pages/index.css'
import { initialCards } from '../components/cards.js'
import { createCard, deleteCard, switchTheLikeBtn } from '../components/card.js'
import { openModal, closeModal } from '../components/modal.js'
import { enableValidation, clearValidation } from '../components/validation.js'

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
    errorClass: 'popup__error_visible'
}


//------------------- ФУНКЦИИ -------------------
// Отправка формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    profileName.textContent = profileNameInput.value
    profileJob.textContent = profileJobInput.value
    closeModal(profileEditModal)
}

// Отправка формы создания новой карточки
function handleNewCardFormSubmit(evt) {
    evt.preventDefault()
    if (newCardNameInput.value.trim() !== '') {
        const newCard = {
            name: `${newCardNameInput.value}`,
            link: `${newCardLinkInput.value}`
        }
        initialCards.push(newCard)
        placesList.prepend(createCard(newCard, deleteCard, switchTheLikeBtn, openImgModal))

        addNewCardForm.reset()
        closeModal(addNewCardModal)
    } else
      alert('Пожалуйста, заполните все поля. Поле не может быть пустым или содержать одни пробелы')
}

// Функция открытия модального окна изображения карточки
function openImgModal(name, link) {
  openModal(cardImagePopup)
  popupImage.alt = name
  popupCaption.textContent = name
  popupImage.src = link
}

// Вызов функции валидации всех форм
enableValidation(validationConfig)


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

// Вывод карточек на страницу
initialCards.forEach((cardData) => placesList.append(createCard(cardData, deleteCard, switchTheLikeBtn, openImgModal)))

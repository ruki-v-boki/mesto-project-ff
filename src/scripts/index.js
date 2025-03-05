import '../pages/index.css'
import { initialCards } from '../components/cards.js'
import { createCard, deleteCard, toggleLike } from '../components/card.js'
import { openModal, closeModal, closeModalByOverlay, closeModalByKey } from '../components/modal.js'

// профиль
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileJob = profile.querySelector('.profile__description')

// кнопки профиля
const profileEditBtn = profile.querySelector('.profile__edit-button')
const profileAddBtn = profile.querySelector('.profile__add-button')

// слушатели кнопок профиля
profileEditBtn.addEventListener('click', () => {
    openModal(profileEditModal, nameInput, profileName, jobInput, profileJob)
})

profileAddBtn.addEventListener('click', () => openModal(addNewCardModal))

// модальные окна профиля
const profileEditModal = document.querySelector('.popup_type_edit')
const addNewCardModal = document.querySelector('.popup_type_new-card')

//форма редактирования профиля
const profileEditForm = document.forms['edit-profile']
const nameInput = profileEditForm.querySelector('.popup__input_type_name')
const jobInput = profileEditForm.querySelector('.popup__input_type_description')

function handleFormSubmit(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closeModal(profileEditModal)
}

profileEditForm.addEventListener('submit', handleFormSubmit)

//форма создания новой карточки
const addNewCardForm = document.forms['new-place']






// все модальные окна
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', closeModalByOverlay)
    document.addEventListener('keydown', closeModalByKey)
    popup.classList.add('popup_is-animated')
})

//все кнопки закрытия модальных окон
const closeModalButtons = document.querySelectorAll('.popup__close')

closeModalButtons.forEach((button) => {
    const modal = button.closest('.popup')
    button.addEventListener('click', () => {
        closeModal(modal)
    })
})

// контейнер карточек на странице
const placesList = document.querySelector('.places__list')

// вывод карточек на страницу
initialCards.forEach((cardData) => placesList.append(createCard(cardData, deleteCard, openModal, toggleLike)))

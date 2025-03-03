import '../pages/index.css'
import { initialCards, createCard, deleteCard } from './cards.js'
import { openModal, closeModal } from './modal.js'

// профиль
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title').textContent
const profileJob = profile.querySelector('.profile__description').textContent

// кнопки профиля
const profileEditBtn = profile.querySelector('.profile__edit-button')
const profileAddBtn = profile.querySelector('.profile__add-button')

// модальные окна профиля
const profileEditModal = document.querySelector('.popup_type_edit')
const addNewCardModal = document.querySelector('.popup_type_new-card')

// слушатели кнопок
profileEditBtn.addEventListener('click', () => openModal(profileEditModal))
profileAddBtn.addEventListener('click', () => openModal(addNewCardModal))

// контейнер карточек на странице
const placesList = document.querySelector('.places__list')

// вывод карточек на страницу
initialCards.forEach((cardData) => placesList.append(createCard(cardData, deleteCard, openModal)))


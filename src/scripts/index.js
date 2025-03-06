import '../pages/index.css'
import { initialCards } from '../components/cards.js'
import { createCard, deleteCard, toggleLike } from '../components/card.js'
import { openModal, closeModal, closeModalByOverlay } from '../components/modal.js'

// Контейнер карточек на странице
const placesList = document.querySelector('.places__list')

// Профиль
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')// Имя пользвателя
const profileJob = profile.querySelector('.profile__description')// Профессия пользователя

// Кнопки профиля
const profileEditBtn = profile.querySelector('.profile__edit-button')// "Редактировать профиль"
const profileAddBtn = profile.querySelector('.profile__add-button')// "+" Добавить новую карточку


//-------------- МОДАЛЬНЫЕ ОКНА --------------
// Модальные окна профиля
const profileEditModal = document.querySelector('.popup_type_edit')// "Редактировать профиль"
const addNewCardModal = document.querySelector('.popup_type_new-card')// "+" Добавить новую карточку

// Все модальные окна
const modals = document.querySelectorAll('.popup')

// Все кнопки закрытия модальных окон
const closeModalButtons = document.querySelectorAll('.popup__close')


//------------------- ФОРМЫ -------------------
//форма редактирования профиля
const profileEditForm = document.forms['edit-profile']
const profileNameInput = profileEditForm.querySelector('.popup__input_type_name')
const profileJobInput = profileEditForm.querySelector('.popup__input_type_description')

// Форма создания новой карточки
const addNewCardForm = document.forms['new-place']
const newCardNameInput = addNewCardForm.querySelector('.popup__input_type_card-name')
const newCardLinkInput = addNewCardForm.querySelector('.popup__input_type_url')


//------------------- ФУНКЦИИ -------------------
// Отправка формы редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault()
    if (profileNameInput.value.trim() && (profileJobInput.value.trim() !== '')) {
        profileName.textContent = profileNameInput.value
        profileJob.textContent = profileJobInput.value
    
        closeModal(profileEditModal)
    } else
      alert('Пожалуйста, заполните все поля. Поле не может быть пустым или содержать одни пробелы')
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
        placesList.prepend(createCard(newCard, deleteCard, openModal, toggleLike))

        addNewCardForm.reset()
        closeModal(addNewCardModal)
    } else
      alert('Пожалуйста, заполните все поля. Поле не может быть пустым или содержать одни пробелы')
}


//------------------- КНОПКИ -------------------
// Кнопка "Редактировать профиль"
profileEditBtn.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent
    profileJobInput.value = profileJob.textContent
    openModal(profileEditModal)
})

// Кнопка "+" добавить новую карточку
profileAddBtn.addEventListener('click', () => {
    newCardNameInput.value = ''
    newCardLinkInput.value = ''
    openModal(addNewCardModal)
})

// Кнопка "Сохранить" формы редактирования профиля
profileEditForm.addEventListener('submit', handleFormSubmit)

// Кнопка "Сохранить" формы создания новой карточки
addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// Все кнопки закрытия модальных окон
closeModalButtons.forEach((button) => {
    const modal = button.closest('.popup')
    button.addEventListener('click', () => closeModal(modal))
})
//---------------------------------------------

// Все модальные окна
modals.forEach((modal) => modal.classList.add('popup_is-animated'))

// Вывод карточек на страницу
initialCards.forEach((cardData) => placesList.append(createCard(cardData, deleteCard, openModal, toggleLike)))

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
    openModal(profileEditModal, profileNameInput, profileJobInput, profileName, profileJob)
})

profileAddBtn.addEventListener('click', () => openModal(addNewCardModal, newCardNameInput, newCardLinkInput))


// модальные окна профиля
const profileEditModal = document.querySelector('.popup_type_edit')
const addNewCardModal = document.querySelector('.popup_type_new-card')

//форма редактирования профиля
const profileEditForm = document.forms['edit-profile']
const profileNameInput = profileEditForm.querySelector('.popup__input_type_name')
const profileJobInput = profileEditForm.querySelector('.popup__input_type_description')

//отправка формы редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault()
    if (profileNameInput.value.trim() && (profileJobInput.value.trim() !== '')) {
        profileName.textContent = profileNameInput.value
        profileJob.textContent = profileJobInput.value
    
        closeModal(profileEditModal)
    } else
      alert('Пожалуйста, заполните все поля. Поле не может быть пустым или содержать одни пробелы')
}

profileEditForm.addEventListener('submit', handleFormSubmit)


//форма создания новой карточки
const addNewCardForm = document.forms['new-place']
const newCardNameInput = addNewCardForm.querySelector('.popup__input_type_card-name')
const newCardLinkInput = addNewCardForm.querySelector('.popup__input_type_url')

//отправка формы создания новой карточки
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

addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)


// все модальные окна
const modals = document.querySelectorAll('.popup')

modals.forEach((modal) => {
    modal.addEventListener('click', closeModalByOverlay)
    document.addEventListener('keydown', closeModalByKey)
    modal.classList.add('popup_is-animated')
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

'use strict'

const placesList = document.querySelector('.places__list')
const deleteCard = card => card.remove()

function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content
    const card = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = card.querySelector('.card__image')
    const cardTitle = card.querySelector('.card__title')
    const cardDeleteButton = card.querySelector('.card__delete-button')

    cardImage.src = cardData.link
    cardImage.alt = cardData.name
    cardTitle.textContent = cardData.name
    cardDeleteButton.addEventListener('click', () => deleteCard(card))

    return card
}

initialCards.forEach((cardData) => placesList.append(createCard(cardData, deleteCard)))
'use strict'

const placesList = document.querySelector('.places__list')
// получаем доступ к списку в который будут попадать карточки на странице


function createCards(card, deleteCard) {
    const template = document.querySelector('#card-template').content
    // получаем доступ к шаблону

    const cardItem = template.querySelector('.card').cloneNode(true)
    // клонируем шаблон

    const cardImage = cardItem.querySelector('.card__image')
    const cardTitle = cardItem.querySelector('.card__title')
    const cardDeleteButton = cardItem.querySelector('.card__delete-button')
    // получаем доступ к узлам карточки внутри шаблона

    cardImage.src = card.link
    cardImage.alt = card.name
    cardTitle.textContent = card.name
    // наполняем узлы карточки контентом карточек из массива

    cardDeleteButton.addEventListener('click', function () {
        deleteCard(cardItem);
    })
    // добавляем кнопке обработчик клика и функцию-колбэк удаления карточки

    return cardItem
    // возвращаем готовую карточку
}


function deleteCard(card) {
    card.remove()
}
    // функция удаления карточки



initialCards.forEach(function (card) {
    placesList.append(createCards(card, deleteCard));
});
    // добавляем каждую карточку в список на странице


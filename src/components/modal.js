export { openModal, closeModal }

// Функция открытия модального окна
const openModal = (modal) => {
    modal.classList.add('popup_is-opened')
    modal.addEventListener('click', closeModalByOverlayClick)
    document.addEventListener('keydown', closeModalByKey)
}

// Функция закрытия модального окна
const closeModal = modal => {
    modal.classList.remove('popup_is-opened')
    modal.removeEventListener('click', closeModalByOverlayClick)
    document.removeEventListener('keydown', closeModalByKey)
}

// Функция-обработчик события клика по оверлею
function closeModalByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget)
    }
}

// Функция-обработчик события нажатия кнопки "Esc"
function closeModalByKey(evt) {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened')
        modal ? closeModal(modal) : false
    }
}

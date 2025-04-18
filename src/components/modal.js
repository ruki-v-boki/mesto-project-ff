export { openModal, closeModal }

let lastFocusedElement

// Функция открытия модального окна
const openModal = modal => {
    modal.classList.add('popup_is-opened')
    modal.addEventListener('mousedown', closeModalByOverlayClick)
    document.addEventListener('keydown', closeModalByKey)
    lastFocusedElement = document.activeElement
}

// Функция закрытия модального окна
const closeModal = modal => {
    modal.classList.remove('popup_is-opened')
    modal.removeEventListener('mousedown', closeModalByOverlayClick)
    document.removeEventListener('keydown', closeModalByKey)
    if (lastFocusedElement) lastFocusedElement.focus()
}

// Функция-обработчик события клика по оверлею
const closeModalByOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget)
    }
}

// Функция-обработчик события нажатия кнопки "Esc"
const closeModalByKey = evt => {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened')
        if (modal) closeModal(modal)
    }
}
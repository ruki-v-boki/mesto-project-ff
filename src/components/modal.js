export { openModal, closeModal, closeModalByOverlay, closeModalByKey }

// функция открытия модального окна
const openModal = modal => modal.classList.add('popup_is-opened')

// функция закрытия модального окна
const closeModal = modal => modal.classList.remove('popup_is-opened')

// функция-обработчик события клика по оверлею
function closeModalByOverlay(event) {
    if (event.target === event.currentTarget) {
        event.currentTarget.classList.remove('popup_is-opened')
    }
}

// функция-обработчик события нажатия Esc
function closeModalByKey(event) {
    if (event.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened')
        modal ? modal.classList.remove('popup_is-opened') : false
    }
}

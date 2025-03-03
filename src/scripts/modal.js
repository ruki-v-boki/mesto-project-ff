export { openModal, closeModal }

// функция открытия модального окна
const openModal = modal => modal.classList.add('popup_is-opened')

// функция закрытия модального окна
function closeModal(modal) {
    if (modal.classList.contains('popup_is-opened')) {
        modal.classList.remove('popup_is-opened')
    }
}

//все кнопки закрытия
const closeModalButtons = document.querySelectorAll('.popup__close')

    closeModalButtons.forEach((button) => {
        const modal = button.closest('.popup')
        button.addEventListener('click', () => closeModal(modal))
    })



    
// функция-обработчик события нажатия Esc
// функция-обработчик события клика по оверлею;
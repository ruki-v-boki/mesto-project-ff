export { openModal, closeModal, closeModalByOverlay, closeModalByKey }

// функция открытия модального окна
const openModal = (modal, nameInput, nameOutput, jobInput, jobOutput) => {
    modal.classList.add('popup_is-opened')

    if (modal.classList.contains('popup_type_edit')) {
        nameInput.value = nameOutput.textContent
        jobInput.value = jobOutput.textContent
    }
}

// функция закрытия модального окна
const closeModal = modal => modal.classList.remove('popup_is-opened')

// функция-обработчик события клика по оверлею
function closeModalByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        evt.currentTarget.classList.remove('popup_is-opened')
    }
}

// функция-обработчик события нажатия Esc
function closeModalByKey(evt) {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened')
        modal ? modal.classList.remove('popup_is-opened') : false
    }
}

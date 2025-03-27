export { enableValidation, clearValidation }

// Валидация всех форм
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector)

    forms.forEach(form => {
        const inputs = form.querySelectorAll(config.inputSelector)
        const submitButton = form.querySelector(config.submitButtonSelector)

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                isInputValid(form, input, config.inputErrorClass, config.errorClass)
                toggleSubmitButton(inputs, submitButton, config.inactiveButtonClass)
            })
        })

        toggleSubmitButton(inputs, submitButton, config.inactiveButtonClass)
    })
}

// Проверка валидности полей формы
function isInputValid(form, input, inputErrorClass, errorClass) {
    const errorItem = form.querySelector(`.${input.id}-error`)
    const customErrorMessage = input.dataset.errorMessage

    if (input.validity.patternMismatch) {
        input.setCustomValidity(customErrorMessage)
    } else {
        input.setCustomValidity('')
    }

    if (!input.validity.valid) {
        input.classList.add(inputErrorClass)
        errorItem.classList.add(errorClass)
        errorItem.textContent = input.validationMessage
    } else {
        input.classList.remove(inputErrorClass)
        errorItem.classList.remove(errorClass)
        errorItem.textContent = ''
    }
}

// Переключение состояния кнопки при валидации
function toggleSubmitButton(inputs, submitButton, inactiveButtonClass) {
    const hasInvalidInput = Array.from(inputs).some(input => !input.validity.valid)

    if (hasInvalidInput) {
        submitButton.classList.add(inactiveButtonClass)
        submitButton.disabled = true
    } else {
        submitButton.classList.remove(inactiveButtonClass)
        submitButton.disabled = false
    }
}

// Очистка сообщений об ошибках
function clearValidation(form, config) {
    const inputs = form.querySelectorAll(config.inputSelector)
    const submitButton = form.querySelector(config.submitButtonSelector)

    inputs.forEach(input => {
        const errorItem = form.querySelector(`.${input.id}-error`)

        input.setCustomValidity('')
        input.classList.remove(config.inputErrorClass)

        if (errorItem) {
            errorItem.textContent = ''
            errorItem.classList.remove(config.errorClass)
        }
    })

    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
}
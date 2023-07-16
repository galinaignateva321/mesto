const VALIDATION_CONFIG = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__button',
  disabledButtonElement: 'popup__button_disabled',
  inputErrorElement: 'popup__input_type_error',
  errorElement: 'popup__error_visible',
}

function showInputError(formElement, inputElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorElement)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorElement)
}

function hideInputError(formElement, inputElement, config) {
  inputElement.classList.remove(config.inputErrorElement)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove(config.errorElement)
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    )
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputElement),
  )

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config)
    })
  })
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formElement))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement, config)
  })
}
enableValidation(VALIDATION_CONFIG)

const VALIDATION_CONFIG = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

//показывает элемент ошибки;
function showInputError(formElement, inputElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorClass)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

//скрывает элемент ошибки;
function hideInputError(formElement, inputElement, config) {
  inputElement.classList.remove(config.inputErrorClass)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ''
}

//проверяет валидность формы, внутри вызывает showInputError или hideInputError.
function checkInputValidity(formElement, inputElement, config) {
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

// Находит все поля внутри формы и сделает из них массив методом Array.from
// Находит кнопку внутри этой формы при открытии, определит состояние кнопки
// Проверит валидность при инпуте, определит состояние кнопки
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputElement),
  )
  const buttonElement = formElement.querySelector(config.buttonElement)
  // toggleButtonState(inputList, buttonElement, config)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

// Найдёт все формы и сделает из них массив методом Array.from
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

// Проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
// Если поле не валидно, hasInvalidInput вернёт true
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
// Если есть хотя бы один невалидный инпут сделает кнопку неактивной
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    console.log('ne validno')
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    console.log('validno')
    buttonElement.disabled = false
  }
}

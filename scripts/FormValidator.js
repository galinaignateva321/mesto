class FormValidator {
  constructor(validationConfig, formElement) {
    this.formElement = formElement
    this.inputElement = validationConfig.inputSelector
    this.submitButtonElement = formElement.querySelector(
      validationConfig.submitButtonSelector,
    )
    this.inactiveButtonClass = validationConfig.inactiveButtonSelector
    //класс сообщения
    this.inputErrorClass = validationConfig.inputErrorSelector
    //класс красной обводки инпута
    this.errorClass = validationConfig.errorSelector
    this.inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector),
    )
  }

  //показывает элемент ошибки;
  _showInputError(inputElement) {
    inputElement.classList.add(this.inputErrorClass)
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`,
    )
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this.errorClass)
  }

  //скрывает элемент ошибки;
  _hideInputError(inputElement) {
    inputElement.classList.remove(this.inputErrorClass)
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`,
    )
    errorElement.classList.remove(this.errorClass)
    errorElement.textContent = ''
  }

  //проверяет валидность формы, внутри вызывает showInputError или hideInputError.
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  // Находит все поля внутри формы и сделает из них массив методом Array.from
  // Находит кнопку внутри этой формы при открытии, определит состояние кнопки
  // Проверит валидность при инпуте, определит состояние кнопки
  _setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }
  //Проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
  //Если поле не валидно, hasInvalidInput вернёт true
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  inactivePopupButton() {
    this.submitButtonElement.classList.add(this.inactiveButtonClass)
    this.submitButtonElement.disabled = true
  }
  activePopupButton() {
    this.submitButtonElement.classList.remove(this.inactiveButtonClass)
    this.submitButtonElement.disabled = false
  }

  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  // Если есть хотя бы один невалидный инпут сделает кнопку неактивной
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.inactivePopupButton()
    } else {
      this.activePopupButton()
    }
  }
  // Найдёт все формы и сделает из них массив методом Array.from
  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners(this.formElement)
  }
}

export default FormValidator

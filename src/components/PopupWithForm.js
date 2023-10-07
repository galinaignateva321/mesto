import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector)
    this._form = popupSelector.querySelector('.popup__form')

    this._inputList = this._form.querySelectorAll('.popup__input')
    this._submitButton = this._form.querySelector('.popup__button')
    this.submitCallBack = submitCallBack
    // this._avatar = document.querySelector(avatar)
  }

  //Этот метод собирает массив всех полей в форме,
  //обходит их и добавляет их значения в объект
  _getInputValues() {
    // создаём пустой объект
    const data = {}
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      data[input.name] = input.value
    })
    return data
  }

  close() {
    super.close()
    this._form.reset()
  }

  save() {
    this._submitButton.textContent = 'Сохранение...'
  }

  saved() {
    this._submitButton.textContent = 'Сохранить'
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this.submitCallBack(this._getInputValues())
    })
  }
}

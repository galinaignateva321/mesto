import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector)
    this._form = popupSelector.querySelector('.popup__form')

    this._inputList = this._form.querySelectorAll('.popup__input')
    this.submitCallBack = submitCallBack
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

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this.submitCallBack(this._getInputValues())
      this.close()
    })
  }
}

import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector)
    this._form = popupSelector.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input')
    this.submitCallBack = submitCallBack
  }

  _getInputValues() {
    const data = {}
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
      this.submitCallBack(this._getInputValues())
      this.close()
    })
  }
}

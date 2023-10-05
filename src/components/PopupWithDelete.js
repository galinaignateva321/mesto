import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector)
    this._form = popupSelector.querySelector('.popup__form')
    this.submitCallBack = submitCallBack
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitCallBack(this._cardId)
      console.log(this._cardId)
      this.close()
    })
  }
}

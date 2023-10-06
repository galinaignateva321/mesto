import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = popupSelector.querySelector('.popup__form')
  }

  setSubmit(submit) {
    this.submitCallBack = submit
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitCallBack()
      // console.log(cardId)
      this.close()
    })
  }
}

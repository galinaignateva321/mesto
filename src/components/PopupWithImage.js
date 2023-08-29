import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.image = popupSelector.querySelector('.popup__image')
    this.description = popupSelector.querySelector('.popup__description')
  }

  open(evt) {
    super.open()
    this.image.src = evt.target.src
    this.image.alt = evt.target.alt
    this.description.textContent = evt.target.alt
  }
}

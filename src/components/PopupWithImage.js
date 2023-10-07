import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.image = popupSelector.querySelector('.popup__image')
    this.description = popupSelector.querySelector('.popup__description')
  }

  open(link, name) {
    super.open()
    this.image.src = link
    this.image.alt = name
    this.description.textContent = name
  }
}

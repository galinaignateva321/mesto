import { ESC_KEYCODE } from './constants.js'

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  }

  _getTemplate() {
    const popup = document
      .querySelector(this._popupSelector)
      .content.querySelector('.popup')
      .cloneNode(true)

    return popup
  }
  _handleEscClose(e) {
    if (e.keyCode === ESC_KEYCODE) {
      this.handleClosePopup()
    }
  }

  //закрытие попапа при клике по оверлею (общая фунция)
  _handleClickOverlay(e) {
    if (e.target === e.currentTarget) {
      this.handleClosePopup()
    }
  }

  handleOpenPopup() {
    this._popupSelector.classList.add('popup_opened')
    document.addEventListener('keyup', (e) => this._handleEscClose(e))
    this._popupSelector.addEventListener('mousedown', (e) =>
      this._handleClickOverlay(e),
    )
  }

  handleClosePopup() {
    this._popupSelector.classList.remove('popup_opened')
    this._popupSelector.removeEventListener('keyup', (e) =>
      document._handleEscClose(e),
    )
  }

  setEventListeners() {
    this._popupSelector
      .querySelector('.popup__close-button')
      .addEventListener('click', () => this.handleClosePopup())
  }
}

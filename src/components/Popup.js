import { ESCAPE } from '../utils/constants.js'

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

  _handleEscClose = (e) => {
    if (e.keyCode === ESCAPE) {
      this.close()
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
    document.addEventListener('keyup', this._handleEscClose)
  }

  close() {
    this._popupSelector.classList.remove('popup_opened')
    document.removeEventListener('keyup', this._handleEscClose)
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mouseup', (event) => {
      // на попап устанавливаем слушателя события
      const targetClassList = event.target.classList // запишем в переменную класс элемента, на котором произошло событие
      if (
        targetClassList.contains('popup') ||
        targetClassList.contains('popup__close-button')
      ) {
        // проверяем наличие класса попапа ИЛИ кнопки закрытия
        this.close() // если один из классов присутствует, то закрываем попап
      }
    })
  }
}

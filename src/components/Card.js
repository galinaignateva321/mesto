export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardTemplate = cardTemplate
    this.handleCardClick = handleCardClick
  }

  //получаем шаблон
  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector('.card__images')
      .cloneNode(true)
  }

  //присвоение данных к шаблону
  _setData() {
    const photoCardElement = this._newCard.querySelector('.card__image')
    const titleCardElement = this._newCard.querySelector('.card__title')
    photoCardElement.src = this._link
    photoCardElement.alt = this._name
    titleCardElement.textContent = this._name
    this.likebutton = this._newCard.querySelector('.card__like-button')
  }
  // удаление карточки
  _handleDeleteCardButton() {
    this._newCard.remove()
    this._newCard = null
  }
  // лайк карточки
  _handleLikeCardButton() {
    this.likebutton.classList.toggle('card__like-button_active')
  }

  //слушатели
  _setListeners() {
    // удаление карточки
    const deleteButtonElement = this._newCard.querySelector(
      '.card__delete-button',
    )
    deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteCardButton()
    })

    // лайк карточки

    this.likebutton.addEventListener('click', () => {
      this._handleLikeCardButton()
    })

    // слушатель на открытие попапа с картинкой
    // вызывает функцию handleCardClick
    const photoCardElement = this._newCard.querySelector('.card__image')
    photoCardElement.addEventListener('click', (evt) =>
      this.handleCardClick(evt),
    )
  }

  //создание карточки
  generateCard() {
    this._newCard = this._getTemplate()
    this._setData()
    this._setListeners()

    return this._newCard
  }
}

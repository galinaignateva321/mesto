export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    cardTemplate,
    { handleCardClick },
    openDeletePopup,
    { handleLikeCard },
    { handleDeleteLikeCard },
    myID,
  ) {
    this._name = name
    this._link = link
    this._cardId = _id
    this._likes = likes
    this._cardTemplate = cardTemplate
    this.handleCardClick = handleCardClick
    this.openDeletePopup = openDeletePopup
    this._handleLikeCard = handleLikeCard
    this._handleDeleteLikeCard = handleDeleteLikeCard
    this._myID = myID
    this._cardItem = Card
    this._ownerID = owner._id
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
    this.photoCardElement = this._newCard.querySelector('.card__image')
    this.titleCardElement = this._newCard.querySelector('.card__title')
    this.photoCardElement.src = this._link
    this.photoCardElement.alt = this._name
    this.titleCardElement.textContent = this._name
    this.likebutton = this._newCard.querySelector('.card__like-button')
    this.likeCount = this._newCard.querySelector('.card__like-count')
    this.deleteButtonElement = this._newCard.querySelector(
      '.card__delete-button',
    )

    this.likeCount.textContent = this._likes.length
  }

  _handleLikeCardButton() {
    if (this.likebutton.classList.contains('card__like-button_active')) {
      // console.log('есть мой лайк')
      this._handleDeleteLikeCard(this._cardId)
    } else {
      // console.log('нет моего лайка')
      this._handleLikeCard(this._cardId)
    }
  }

  _setListeners() {
    this.deleteButtonElement.addEventListener('click', () => {
      this.openDeletePopup(this._cardId, this)
    })

    this.likebutton.addEventListener('click', () => {
      this._handleLikeCardButton()
    })

    this.photoCardElement.addEventListener('click', () => {
      this.handleCardClick(this._newCard)
      // console.log(this._newCard)
    })
  }

  delete() {
    this._newCard.remove()
  }

  like() {
    this.likebutton.classList.add('card__like-button_active')
  }

  deleteLike() {
    this.likebutton.classList.remove('card__like-button_active')
  }

  setLike(data) {
    this._likes = data.likes
    this.likeCount.textContent = this._likes.length
  }

  _checkLike() {
    this._likes.forEach((like) => {
      if (like._id === this._myID) {
        this.likebutton.classList.add('card__like-button_active')
      }
    })
  }

  _showBasket() {
    if (this._ownerID !== this._myID) {
      this.deleteButtonElement.remove()
    }
  }
  //создание карточки
  generateCard() {
    this._newCard = this._getTemplate()
    this._setData()
    this._setListeners()
    this._checkLike()
    this._showBasket()
    return this._newCard
  }
}

import { Api } from '../components/Api.js'
import '../pages/index.css'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {
  validationConfig,
  cardFormPopup,
  imagePopup,
  editProfileButtonElement,
  addCardButtonElement,
  nameInputElement,
  jobInputElement,
  profileFormPopupSelector,
  formAddElement,
  deleteCardPopup,
} from '../utils/constants.js'
import { data } from 'autoprefixer'
import PopupWithDelete from '../components/PopupWithDelete.js'

//запрос апи
const apiOptions = {
  url: 'https://mesto.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
    authorization: '0bb4e576-850a-4be4-9126-20bd411d5632',
  },
}
const api = new Api(apiOptions)

const newUserInfo = new UserInfo('.profile__title', '.profile__subtitle')

let myID
let myAvatar
api.getUser().then((data) => {
  newUserInfo.setUserInfo(data)
  myID = data._id
  myAvatar = data.avatar
  // console.log(myAvatar)
})

const handleEditAvatar = () => {
  newPopupEditAvatar.open()
  const { avatar } = myAvatar
  avatarLinkInputElement.value = avatar
}

const handleOpenProfileEditButton = () => {
  newPopupEditProfile.open()
  const { name, about } = newUserInfo.getUserInfo()
  nameInputElement.value = name
  jobInputElement.value = about
}

const submitCallBackEditProfile = ({ name, about }) => {
  api.setUser({ name, about }).then(({ name, about }) => {
    // console.log({ name, about })
    newUserInfo.setUserInfo({ name, about })
  })
}

const newPopupEditProfile = new PopupWithForm(
  profileFormPopupSelector,
  submitCallBackEditProfile,
)

newPopupEditProfile.setEventListeners()

const newImagePopup = new PopupWithImage(imagePopup)

const handleCardClick = (evt) => {
  newImagePopup.open(evt)
}
newImagePopup.setEventListeners()

//удаление карточки
const submitCallBackDeleteCard = (cardId) => {
  console.log(cardId)
  api.deleteCard(cardId).then((data) => {
    // card.delete(data)
    console.log(data)
  })
}
// //попап удаления карточки
const newDeletePopup = new PopupWithDelete(
  deleteCardPopup,
  submitCallBackDeleteCard,
)

const openDeletePopup = (cardId) => {
  newDeletePopup.open(cardId)
  console.log(cardId)
}

newDeletePopup.setEventListeners()

//функция открытие попапа добавления карточки по кнопке плюс
const handleOpenAddCardButton = () => {
  newPopupAddCard.open()
  formAddElement.reset()
  formAddCard.inactivePopupButton()
}
const defoultCardList = new Section(
  {
    renderer: (cardData) => {
      const newCard = createCard(cardData)
      defoultCardList.addItem(newCard)
    },
  },
  '.card',
)
//получение массива карточек с cервера
api.getAllCards().then((data) => {
  // console.log(data)
  defoultCardList.renderItems(data)
})

//колбек сабмит класса новой карточки из инпутов
const submitCallBackFormAdd = ({ name, link }) => {
  api.createNewCard({ name, link }).then((cardData) => {
    const newCardElement = createCard(cardData)
    console.log(cardData)
    defoultCardList.addItem(newCardElement)
  })
}

// экземпляр карточки из класса Card
const createCard = (cardData) => {
  const card = new Card(
    cardData,
    '.card__template',
    handleCardClick,
    openDeletePopup,

    {
      handleLikeCard: (cardId) => {
        // console.log(id)
        api.likeCard(cardId).then((data) => {
          card.setLike(data)
          card.like()
        })
      },
    },
    {
      handleDeleteLikeCard: (cardId) => {
        // console.log(id)
        api.deleteLikeCard(cardId).then((data) => {
          card.setLike(data)
          card.deleteLike()
        })
      },
    },

    myID,
  )
  const cardElement = card.generateCard()
  return cardElement
}

// экземпляр PopupWithForm попап добавления новой карточки
//добавление слушателя
const newPopupAddCard = new PopupWithForm(cardFormPopup, submitCallBackFormAdd)
newPopupAddCard.setEventListeners()

//валидация всех попапов
//экземпляр валидации попапа редактирования профиля
const formEditProfile = new FormValidator(
  validationConfig,
  profileFormPopupSelector,
)
//экземпляр валидации попапа добавления карточки
const formAddCard = new FormValidator(validationConfig, cardFormPopup)

//сама валидация форм
formEditProfile.enableValidation()
formAddCard.enableValidation()

//слушатели на клик
editProfileButtonElement.addEventListener('click', handleOpenProfileEditButton)
addCardButtonElement.addEventListener('click', handleOpenAddCardButton)

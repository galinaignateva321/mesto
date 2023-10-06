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
  avatarFormPopup,
  editAvatarButtonElement,
  avatarLinkInputElement,
  avatarElement,
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

const newUserInfo = new UserInfo(
  '.profile__title',
  '.profile__subtitle',
  '.profile__avatar',
)
let myAvatar
let myID
api.getUser().then((data) => {
  newUserInfo.setUserInfo(data)
  myID = data._id
  myAvatar = data.avatar
})

const handleOpenAvatarEditButton = () => {
  newPopupEditAvatar.open()
  avatarLinkInputElement.value = myAvatar
}
const submitCallBackEditAvatar = (data) => {
  newPopupEditAvatar.save()
  api
    .createNewAvatar(data)
    .then((data) => {
      newUserInfo.setUserInfo(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      newPopupEditAvatar.saved()
    })
}
const newPopupEditAvatar = new PopupWithForm(
  avatarFormPopup,
  submitCallBackEditAvatar,
)

const handleOpenProfileEditButton = () => {
  newPopupEditProfile.open()
  const { name, about } = newUserInfo.getUserInfo()
  nameInputElement.value = name
  jobInputElement.value = about
}

const submitCallBackEditProfile = (data) => {
  newPopupEditProfile.save()
  api
    .setUser(data)
    .then((data) => {
      newUserInfo.setUserInfo(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      newPopupEditProfile.saved()
    })
}

const newPopupEditProfile = new PopupWithForm(
  profileFormPopupSelector,
  submitCallBackEditProfile,
)

const newImagePopup = new PopupWithImage(imagePopup)

const handleCardClick = (evt) => {
  newImagePopup.open(evt)
}

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

api.getAllCards().then((data) => {
  data.reverse()
  defoultCardList.renderItems(data)
})

const submitCallBackFormAdd = ({ name, link }) => {
  newPopupAddCard.save()
  api
    .createNewCard({ name, link })
    .then((cardData) => {
      const newCardElement = createCard(cardData)
      defoultCardList.addItem(newCardElement)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      newPopupAddCard.saved()
    })
}

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    '.card__template',
    handleCardClick,
    openDeletePopup,

    {
      handleLikeCard: (cardId) => {
        api.likeCard(cardId).then((data) => {
          card.setLike(data)
          card.like()
        })
      },
    },
    {
      handleDeleteLikeCard: (cardId) => {
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

function submitCallBackDeleteCard(cardId, cardItem) {
  api
    .deleteCard(cardId, cardItem)
    .then(() => {
      cardItem.delete()
    })
    .catch((err) => {
      console.log(err)
    })
}
const newDeletePopup = new PopupWithDelete(deleteCardPopup)

const openDeletePopup = (cardId, cardItem) => {
  newDeletePopup.setSubmit(() => submitCallBackDeleteCard(cardId, cardItem))
  newDeletePopup.open()
}

const newPopupAddCard = new PopupWithForm(cardFormPopup, submitCallBackFormAdd)

const formEditProfile = new FormValidator(
  validationConfig,
  profileFormPopupSelector,
)
const formAddCard = new FormValidator(validationConfig, cardFormPopup)

const formEditAvatar = new FormValidator(validationConfig, avatarFormPopup)

formEditProfile.enableValidation()
formAddCard.enableValidation()
formEditAvatar.enableValidation()

editProfileButtonElement.addEventListener('click', handleOpenProfileEditButton)
addCardButtonElement.addEventListener('click', handleOpenAddCardButton)
editAvatarButtonElement.addEventListener('click', handleOpenAvatarEditButton)

newPopupEditAvatar.setEventListeners()
newPopupEditProfile.setEventListeners()
newImagePopup.setEventListeners()
newDeletePopup.setEventListeners()
newPopupAddCard.setEventListeners()

import '../pages/index.css'
import Section from './Section.js'
import UserInfo from './UserInfo.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {
  initialCards,
  validationConfig,
  cardFormPopup,
  imagePopup,
  editProfileButtonElement,
  addCardButtonElement,
  nameInputElement,
  jobInputElement,
  placeNameInputElement,
  linkInputElement,
  profileFormPopupSelector,
} from './constants.js'

//экземпляр UserInfo отвечает за управление отображением информации о пользователе на странице
const newUserInfo = new UserInfo('.profile__title', '.profile__subtitle')

// функция сабмита callBack PopupWithForm
//добавление значений инпутов в dom дерево
const submitCallBackEditProfile = (inputValues) => {
  newUserInfo.setUserInfo(inputValues)
}
//экземпляр PopupWithForm попапа редактирования профиля
const newPopupEditProfile = new PopupWithForm(
  profileFormPopupSelector,
  submitCallBackEditProfile,
)
//метод попапа редактирования профиля
//отмена деф отправки
//получение значений инпута
//закрытие
newPopupEditProfile.setEventListeners()

//функция открытия редактирование профиля
const handleOpenProfileEditButton = () => {
  newPopupEditProfile.handleOpenPopup()
  const inputDefaultList = newUserInfo.getUserInfo()
  nameInputElement.value = inputDefaultList.userName
  jobInputElement.value = inputDefaultList.aboutUser
}

editProfileButtonElement.addEventListener('click', handleOpenProfileEditButton)

//класс PopupWithImage
const newImagePopup = new PopupWithImage(imagePopup)

// открытие попапа с картинкой
const handleCardClick = (evt) => {
  newImagePopup.handleOpenPopup(evt)
}
newImagePopup.setEventListeners()

//открытие попапа добавления карточки по кнопке плюс
const handleOpenAddCardButton = () => {
  newPopupAddCard.handleOpenPopup()
  placeNameInputElement.value = ''
  linkInputElement.value = ''
  formAddCard.inactivePopupButton()
}
addCardButtonElement.addEventListener('click', handleOpenAddCardButton)

// экземпляр карточки из класса Card
const createCard = (item, cardList) => {
  const card = new Card(item, '.card__template', handleCardClick)
  const cardElement = card.generateCard()
  cardList.addItem(cardElement)
}

//заполнение формы и добавление новой карточки из инпутов, закрытие попапа
const submitCallBackFormAdd = (data) => {
  createCard({ name: data.name, link: data.link }, cardGrid)
}

// экземпляр PopupWithForm попап добавления новой карточки
const newPopupAddCard = new PopupWithForm(cardFormPopup, submitCallBackFormAdd)
newPopupAddCard.setEventListeners()

// класс Section, который отвечает за отрисовку существующего грида на странице.
const cardGrid = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      //создаем экземпляр карточки из класса Card
      createCard(item, cardGrid)
    },
  },
  '.card',
)
//проходим по всему массиву, рендерим все карточки
cardGrid.renderItems()

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

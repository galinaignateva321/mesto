import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {
  initialCards,
  validationConfig,
  profileFormPopup,
  cardFormPopup,
  imagePopup,
  editProfileButtonElement,
  closeProfileFormButtonElement,
  closeCardFormPopupButtonElement,
  addCardButtonElement,
  closeImagePopupButtonElement,
  formEditElement,
  formAddElement,
  nameInputElement,
  jobInputElement,
  placeNameInputElement,
  linkInputElement,
  nameElement,
  jobElement,
  galleryElement,
} from './constants.js'

import {
  openModalWindow,
  closeModalWondow,
  handleEscUp,
  handleClickOverlay,
} from './utils.js'

//открытие попапа редактирования профиля
const handleOpenProfileEditButton = () => {
  //инпуты принимают изначальные значения из разметки профиля
  nameInputElement.value = nameElement.textContent
  jobInputElement.value = jobElement.textContent
  openModalWindow(profileFormPopup)
}

editProfileButtonElement.addEventListener('click', handleOpenProfileEditButton)

//закрытие попапа редактирования профиля по кнопке закрытия
const handleCloseProfileEditPopupButton = () => {
  closeModalWondow(profileFormPopup)
}

closeProfileFormButtonElement.addEventListener(
  'click',
  handleCloseProfileEditPopupButton,
)

//редактирование профиля, закрытие попапа по кнопке сохранения и энтер
const submitFormEditElement = (evt) => {
  //отмена дефолтной отправки сабмит
  evt.preventDefault()
  //значения разметки принимают значения введенные в инпуты попапа
  nameElement.textContent = nameInputElement.value
  jobElement.textContent = jobInputElement.value
  closeModalWondow(profileFormPopup)
}

formEditElement.addEventListener('submit', submitFormEditElement)

//открытие попапа добавления карточки по кнопке плюс
const handleOpenAddCardButton = () => {
  openModalWindow(cardFormPopup)
  //инпуты очищаются
  placeNameInputElement.value = ''
  linkInputElement.value = ''
  //кнопка неактивна при открытии попапа
  formAddCard.inactivePopupButton()
}
addCardButtonElement.addEventListener('click', handleOpenAddCardButton)

//рендер карточки
const renderCard = (item) => {
  //создаем экземпляр карточки из класса Card
  const cardElement = new Card(item, '.card__template')
  //вставляем карточку перед остальными карточками
  galleryElement.prepend(cardElement.generateCard())
}

//проходим по всему массиву, рендерим все карточки
initialCards.forEach((item) => {
  renderCard(item)
})

//заполнение формы и добавление новой карточки из инпутов, закрытие попапа
const submitFormAddElement = (evt) => {
  evt.preventDefault()
  renderCard({
    name: placeNameInputElement.value,
    link: linkInputElement.value,
  })
  closeModalWondow(cardFormPopup)
  //сброс значений
  evt.target.reset()
}
formAddElement.addEventListener('submit', submitFormAddElement)

//закрытие попапа добавления карточки по кнопке закрытия
const handleCloseAddCardPopupButton = () => {
  closeModalWondow(cardFormPopup)
}
closeCardFormPopupButtonElement.addEventListener(
  'click',
  handleCloseAddCardPopupButton,
)

//открытие попапа с картинкой в классе Card
//закрытие попапа с картинкой
const handleCloseImagePopupButton = () => {
  closeModalWondow(imagePopup)
}
closeImagePopupButtonElement.addEventListener(
  'click',
  handleCloseImagePopupButton,
)

//листенеры всех попапов закрытия по оверлею
profileFormPopup.addEventListener('mousedown', handleClickOverlay)
cardFormPopup.addEventListener('mousedown', handleClickOverlay)
imagePopup.addEventListener('mousedown', handleClickOverlay)

//валидация всех попапов
//экземпляр валидации попапа редактирования профиля
const formEditProfile = new FormValidator(validationConfig, profileFormPopup)
//экземпляр валидации попапа добавления карточки
const formAddCard = new FormValidator(validationConfig, cardFormPopup)

//сама валидация форм
formEditProfile.enableValidation()
formAddCard.enableValidation()

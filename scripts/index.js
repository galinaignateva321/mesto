const editButtonElement = document.querySelector('.profile__edit-button')
const popupEditElement = document.querySelector('.popup_theme_edit-profile')
const closeProfileEditPopupButtonElement = popupEditElement.querySelector(
  '.popup__close-button',
)

const nameInputElement = document.querySelector('.popup__input_el_name')
const jobInputElement = document.querySelector('.popup__input_el_job')
const nameElement = document.querySelector('.profile__title')
const jobElement = document.querySelector('.profile__subtitle')
const formEditElement = document.querySelector('.popup__form')

const popupAddElement = document.querySelector('.popup_theme_add')
const addButtonElement = document.querySelector('.profile__add-button')
const closeAddPopupButtonElement = popupAddElement.querySelector(
  '.popup__close-button',
)
const galleryElement = document.querySelector('.photo-grid')
const formAddElement = popupAddElement.querySelector('.popup__form')
const inputNameAddElement = document.querySelector(
  '.popup__input_el_place-name',
)
const inputLinkAddElement = document.querySelector(
  '.popup__input_el_image-link',
)
const cardTemplate = document.querySelector('.photo-grid__template')
const popupImageElement = document.querySelector('.popup-image')

const photoPopupElement = popupImageElement.querySelector('.popup-image__photo')
const descriptionPopupElement = popupImageElement.querySelector(
  '.popup-image__description',
)
const closeImagePopupButtonElement = document.querySelector(
  '.popup-image__close-button',
)

//открытие попапа (общая фунция)
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

//закрытие попапа (общая фунция)
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

//открытие попапа редактирования профиля
const handleOpenProfileEditButton = () => {
  openPopup(popupEditElement)
  nameInputElement.value = nameElement.textContent
  jobInputElement.value = jobElement.textContent
}

editButtonElement.addEventListener('click', handleOpenProfileEditButton)

//закрытие попапа редактирование профиля по кнопке закрытия
const handleCloseProfileEditPopupButton = () => {
  closePopup(popupEditElement)
}

closeProfileEditPopupButtonElement.addEventListener(
  'click',
  handleCloseProfileEditPopupButton,
)

//редактирование профиля, закрытие попапа по кнопке сохранения и энтер
const handleSaveProfileEditPopupButton = (evt) => {
  evt.preventDefault()
  nameElement.textContent = nameInputElement.value
  jobElement.textContent = jobInputElement.value
  closePopup(popupEditElement)
}

formEditElement.addEventListener('submit', handleSaveProfileEditPopupButton)

//открытие попапа добавления карточки по кнопке плюс
const handleOpenAddCardButton = () => {
  openPopup(popupAddElement)
}
addButtonElement.addEventListener('click', handleOpenAddCardButton)

//закрытие попапа добавления карточки по кнопке закрытия
const handleCloseAddCardPopupButton = () => {
  closePopup(popupAddElement)
}
closeAddPopupButtonElement.addEventListener(
  'click',
  handleCloseAddCardPopupButton,
)

//Функция создания галереи с темплейт шаблона
const createCard = ({ name, link }) => {
  const clone = cardTemplate.content.cloneNode(true)
  const cardElement = clone.querySelector('.photo-grid__images')
  const photoCardElement = cardElement.querySelector('.photo-grid__image')
  const titleCardElement = cardElement.querySelector('.photo-grid__title')
  photoCardElement.src = link
  photoCardElement.alt = name
  titleCardElement.textContent = name

  //удаление карточки
  const deleteButtonElement = cardElement.querySelector(
    '.photo-grid__delete-button',
  )
  const handleDeleteCardButton = () => {
    cardElement.remove()
  }
  deleteButtonElement.addEventListener('click', handleDeleteCardButton)

  //лайк карточки
  const likeButtonElement = cardElement.querySelector(
    '.photo-grid__like-button',
  )
  const handleLikeCardButton = () => {
    likeButtonElement.classList.toggle('photo-grid__like-button_active')
  }
  likeButtonElement.addEventListener('click', handleLikeCardButton)

  //открытие попапа с картинкой
  const handleOpenImagePopupButton = () => {
    openPopup(popupImageElement)
    photoPopupElement.src = link
    photoPopupElement.alt = name
    descriptionPopupElement.textContent = name
  }
  photoCardElement.addEventListener('click', handleOpenImagePopupButton)

  return cardElement
}
//отрисовка массива
initialCards.forEach((item) => {
  const cardElement = createCard(item)
  galleryElement.append(cardElement)
})

//закрытие попапа с картинкой
const handleCloseImagePopupButton = () => {
  closePopup(popupImageElement)
}
closeImagePopupButtonElement.addEventListener(
  'click',
  handleCloseImagePopupButton,
)

//заполнение формы и добавление новой карточки из инпутов, закрытие попапа
const handleAddCardImagePopupButton = (evt) => {
  evt.preventDefault()
  const name = inputNameAddElement.value
  const link = inputLinkAddElement.value
  const cardElement = createCard({ name, link })
  galleryElement.prepend(cardElement)
  closePopup(popupAddElement)
  evt.target.reset()
}
formAddElement.addEventListener('submit', handleAddCardImagePopupButton)

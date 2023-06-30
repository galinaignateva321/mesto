//редактирование профиля
const editButtonElement = document.querySelector('.profile__edit-button')
const popupEditElement = document.querySelector('.popup-edit-profile')
const buttonCloseProfileEditPopup = document.querySelector(
  '.popup-edit-profile__close-button',
)
const nameInputElement = document.querySelector(
  '.popup-edit-profile__input_el_name',
)
const jobInputElement = document.querySelector(
  '.popup-edit-profile__input_el_job',
)
const nameElement = document.querySelector('.profile__title')
const jobElement = document.querySelector('.profile__subtitle')
const formEditElement = document.querySelector('.popup-edit-profile__form')

const popupAddElement = document.querySelector('.popup-add')
const addButtonElement = document.querySelector('.profile__add-button')
const closeAddPopupButtonElement = document.querySelector(
  '.popup-add__close-button',
)

const galleryElement = document.querySelector('.photo-grid')
const formAddElement = document.querySelector('.popup-add__form')
const inputNameAddElement = document.querySelector(
  '.popup-add__input_el_place-name',
)
const inputLinkAddElement = document.querySelector(
  '.popup-add__input_el_image-link',
)
const cardTemplate = document.querySelector('.photo-grid__template')
const popupImageElement = document.querySelector('.popup-image')

const photoPopupElement = popupImageElement.querySelector('.popup-image__photo')
const descriptionPopupElement = popupImageElement.querySelector(
  '.popup-image__description',
)

//открытие попапа (общая фунция)
function openPopup(e) {
  e.classList.add('popup_opened')
}

//закрытие попапа (общая фунция)
function closePopup(e) {
  e.classList.remove('popup_opened')
}

//открытие попапа редактирования профиля
editButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement)
  nameInputElement.value = nameElement.textContent
  jobInputElement.value = jobElement.textContent
})

//закрытие попапа редактирование профиля по кнопке закрытия
buttonCloseProfileEditPopup.addEventListener('click', () => {
  closePopup(popupEditElement)
})

//редактирование профиля, закрытие попапа по кнопке сохранения и энтер
formEditElement.addEventListener('submit', (evt) => {
  evt.preventDefault()
  nameElement.textContent = nameInputElement.value
  jobElement.textContent = jobInputElement.value
  closePopup(popupEditElement)
})

//открытие попапа добавления карточки по кнопке плюс
addButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement)
})

//закрытие попапа добавления карточки по кнопке закрытия
closeAddPopupButtonElement.addEventListener('click', () => {
  closePopup(popupAddElement)
})

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
  deleteButtonElement.addEventListener('click', () => {
    cardElement.remove()
  })

  //лайк карточки
  const likeButtonElement = cardElement.querySelector(
    '.photo-grid__like-button',
  )
  likeButtonElement.addEventListener('click', () => {
    likeButtonElement.classList.toggle('photo-grid__like-button_active')
  })

  //открытие попапа с картинкой
  photoCardElement.addEventListener('click', () => {
    openPopup(popupImageElement)
    photoPopupElement.src = link
    photoPopupElement.alt = name
    descriptionPopupElement.textContent = name
  })

  return cardElement
}
//закрытие попапа с картинкой
const closeImagePopupButtonElement = document.querySelector(
  '.popup-image__close-button',
)
closeImagePopupButtonElement.addEventListener('click', () => {
  closePopup(popupImageElement)
})

//отрисовка массива
initialCards.forEach((item) => {
  const cardElement = createCard(item)
  galleryElement.append(cardElement)
})

//заполнение формы и добавление новой карточки из инпутов, закртие попапа
formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const name = inputNameAddElement.value
  const link = inputLinkAddElement.value
  const cardElement = createCard({ name, link })
  galleryElement.prepend(cardElement)
  closePopup(popupAddElement)
  evt.target.reset()
})

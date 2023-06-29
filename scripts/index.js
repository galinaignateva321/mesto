//редактирование профиля
const editButtonElement = document.querySelector('.profile__edit-button')
const popupEditElement = document.querySelector('.popup-edit-profile')
const closeButtonElement = document.querySelector(
  '.popup-edit-profile__close-button',
)

const nameInputElement = document.querySelector(
  '.popup-edit-profile__input_el_name',
)
const jobInputElement = document.querySelector(
  '.popup-edit-profile__input_el_job',
)
const nameEditElement = document.querySelector('.profile__title')
const jobEditElement = document.querySelector('.profile__subtitle')
const formEditElement = document.querySelector('.popup-edit-profile__form')

//открытие попапа по кнопке редактирования
function handlEditClick() {
  popupEditElement.classList.add('popup-edit-profile_opened')
  nameInputElement.value = nameEditElement.textContent
  jobInputElement.value = jobEditElement.textContent
}
editButtonElement.addEventListener('click', handlEditClick)

//закрытие попапа по кнопке закрытия
function handleCloseEditProfilePopup() {
  popupEditElement.classList.remove('popup-edit-profile_opened')
}
closeButtonElement.addEventListener('click', handleCloseEditProfilePopup)

//закрытие попапа по кнопке сохранения и энтер
function handleFormSubmit(evt) {
  evt.preventDefault()
  nameEditElement.textContent = nameInputElement.value
  jobEditElement.textContent = jobInputElement.value
  handleCloseEditProfilePopup()
}
formEditElement.addEventListener('submit', handleFormSubmit)

//добавление фотографий

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

const popupAddElement = document.querySelector('.popup-add')
const addButtonElement = document.querySelector('.profile__add-button')
const closeAddPopupButtonElement = document.querySelector(
  '.popup-add__close-button',
)
const placeNameInputElement = document.querySelector(
  'popup-add__input_el_place-name',
)
const imageLinkInputElement = document.querySelector(
  'popup-add__input_el_image-link',
)

//открытие попапа добавления
function handlAddClick() {
  popupAddElement.classList.add('popup-add_opened')
}
addButtonElement.addEventListener('click', handlAddClick)

//закрытие попапа по кнопке закрытия
function handleCloseAddPopup() {
  popupAddElement.classList.remove('popup-add_opened')
}
closeAddPopupButtonElement.addEventListener('click', handleCloseAddPopup)

const galleryElement = document.querySelector('.photo-grid')
const formAddElement = document.querySelector('.popup-add__form')
const inputNameAddElement = document.querySelector(
  '.popup-add__input_el_place-name',
)
const inputLinkAddElement = document.querySelector(
  '.popup-add__input_el_image-link',
)
const templateElement = document.querySelector('.photo-grid__template')

//работа с темплейт шаблоном
const addCard = ({ name, link }) => {
  const clone = templateElement.content.cloneNode(true)
  const cardElement = clone.querySelector('.photo-grid__images')
  cardElement.querySelector('.photo-grid__image').src = link
  cardElement.querySelector('.photo-grid__image').alt = name
  cardElement.querySelector('.photo-grid__title').textContent = name

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
  const popupImageElement = document.querySelector('.popup-image')
  const imageCardElement = cardElement.querySelector('.photo-grid__image')
  imageCardElement.addEventListener('click', () => {
    popupImageElement.classList.add('popup-image_opened')
    popupImageElement.querySelector('.popup-image__photo').src = link
    popupImageElement.querySelector('.popup-image__description').textContent =
      name
  })

  //закрытие попапа с картинкой
  const closeImagePopupButtonElement = document.querySelector(
    '.popup-image__close-button',
  )
  closeImagePopupButtonElement.addEventListener('click', () => {
    popupImageElement.classList.remove('popup-image_opened')
  })
  return cardElement
}

//отрисовка массива
initialCards.forEach((item) => {
  const cardElement = addCard(item)
  galleryElement.append(cardElement)
})

//заполнение формы и добавление новой карточки из инпутов
const handleAddSubmit = (e) => {
  e.preventDefault()

  const name = inputNameAddElement.value
  const link = inputLinkAddElement.value
  const cardElement = addCard({ name, link })
  galleryElement.prepend(cardElement)
  handleCloseAddPopup()
}

formAddElement.addEventListener('submit', handleAddSubmit)

//закрытие попапа с картинкой

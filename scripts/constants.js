export const initialCards = [
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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonSelector: 'popup__button_disabled',
  inputErrorSelector: 'popup__input_type_error',
  errorSelector: 'popup__error_visible',
}

//Врапперы
export const profileFormPopup = document.querySelector(
  '.popup_theme_edit-profile',
)
export const cardFormPopup = document.querySelector('.popup_theme_create-card')
export const imagePopup = document.querySelector('.popup_theme_image')

//кнопки
//кнопки редактирование профиля
export const editProfileButtonElement = document.querySelector(
  '.profile__edit-button',
)
export const closeProfileFormButtonElement = document.querySelector(
  '.popup__close-button_el_edit-profile',
)
//кнопки добавления карточки
export const closeCardFormPopupButtonElement = document.querySelector(
  '.popup__close-button_el_add-card',
)
export const addCardButtonElement = document.querySelector(
  '.profile__add-button',
)
//кнопки фото-попапа
export const closeImagePopupButtonElement = document.querySelector(
  '.popup__close-button_el_image',
)

//Формы и инпуты форм
export const formEditElement = profileFormPopup.querySelector('.popup__form')
export const formAddElement = cardFormPopup.querySelector('.popup__form')
export const nameInputElement = document.querySelector('.popup__input_el_name')
export const jobInputElement = document.querySelector('.popup__input_el_job')
export const placeNameInputElement = document.querySelector(
  '.popup__input_el_place-name',
)
export const linkInputElement = document.querySelector(
  '.popup__input_el_image-link',
)

//DOM узлы фото-попапа
export const photoImagePopup = imagePopup.querySelector('.popup__image')
export const descriptionImagePopup = imagePopup.querySelector(
  '.popup__description',
)

//DOM узлы профиля из разметки
export const nameElement = document.querySelector('.profile__title')
export const jobElement = document.querySelector('.profile__subtitle')

//DOM узел всех карточек
export const galleryElement = document.querySelector('.card')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonSelector: 'popup__button_disabled',
  inputErrorSelector: 'popup__input_type_error',
  errorSelector: 'popup__error_visible',
}
export const ESCAPE = 27

//Врапперы
export const profileFormPopupSelector = document.querySelector(
  '.popup_theme_edit-profile',
)
export const cardFormPopup = document.querySelector('.popup_theme_create-card')
export const imagePopup = document.querySelector('.popup_theme_image')
export const popupCloseButton = document.querySelector('.popup__close-button')
export const deleteCardPopup = document.querySelector(
  '.popup_theme_delete-card',
)
export const avatarFormPopup = document.querySelector('.popup_theme_avatar')
//кнопки
//кнопки редактирование профиля
export const editProfileButtonElement = document.querySelector(
  '.profile__edit-button',
)
export const editAvatarButtonElement =
  document.querySelector('.profile__pencil')
//кнопки добавления карточки
export const addCardButtonElement = document.querySelector(
  '.profile__add-button',
)

//Формы и инпуты форм
export const formEditElement =
  profileFormPopupSelector.querySelector('.popup__form')
export const formAddElement = cardFormPopup.querySelector('.popup__form')

export const nameInputElement = document.querySelector('.popup__input_el_name')
export const jobInputElement = document.querySelector('.popup__input_el_job')
export const placeNameInputElement = document.querySelector(
  '.popup__input_el_place-name',
)
export const linkInputElement = document.querySelector(
  '.popup__input_el_image-link',
)
export const avatarLinkInputElement = document.querySelector(
  '.popup__input_el_avatar',
)
//DOM узлы фото-попапа
export const photoImagePopup = imagePopup.querySelector('.popup__image')
export const descriptionImagePopup = imagePopup.querySelector(
  '.popup__description',
)

//DOM узлы профиля из разметки
export const nameElement = document.querySelector('.profile__title')
export const jobElement = document.querySelector('.profile__subtitle')

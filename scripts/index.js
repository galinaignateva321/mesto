const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup-edit-profile');
const closeButtonElement = document.querySelector('.popup-edit-profile__close-button');

const nameInputElement = document.querySelector('.popup-edit-profile__input_el_name');
const jobInputElement = document.querySelector('.popup-edit-profile__input_el_job');
const nameEditElement = document.querySelector('.profile__title');
const jobEditElement = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup-edit-profile__form');

function handlEditClick() {
  popupElement.classList.add('popup-edit-profile_opened')
  nameInputElement.value = nameEditElement.textContent
  jobInputElement.value = jobEditElement.textContent
}
editButtonElement.addEventListener('click', handlEditClick);

function handleClosePopupEditProfile() {
  popupElement.classList.remove('popup-edit-profile_opened')
}
closeButtonElement.addEventListener('click', handleClosePopupEditProfile);

function handleFormSubmit(evt) {
  evt.preventDefault()
  nameEditElement.textContent = nameInputElement.value
  jobEditElement.textContent = jobInputElement.value
  handleClosePopupEditProfile()
}
formElement.addEventListener('submit', handleFormSubmit);

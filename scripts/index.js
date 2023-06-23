const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closeButtonElement = document.querySelector('.popup__close-button');

const nameInputElement = document.querySelector('.popup__input_el_name');
const jobInputElement = document.querySelector('.popup__input_el_job');
const nameEditElement = document.querySelector('.profile__title');
const jobEditElement = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');

function handlEditClick() {
  popupElement.classList.add('popup_opened')
  nameInputElement.value = nameEditElement.textContent
  jobInputElement.value = jobEditElement.textContent
}
editButtonElement.addEventListener('click', handlEditClick);

function handleClosePopup() {
  popupElement.classList.remove('popup_opened')
}
closeButtonElement.addEventListener('click', handleClosePopup);

function handleFormSubmit(evt) {
  evt.preventDefault()
  nameEditElement.textContent = nameInputElement.value
  jobEditElement.textContent = jobInputElement.value
  handleClosePopup()
}
formElement.addEventListener('submit', handleFormSubmit);


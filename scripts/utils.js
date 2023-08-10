//открытие попапа (общая фунция)
const openModalWindow = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keyup', handleEscUp)
}

//закрытие попапа (общая фунция)
const closeModalWondow = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keyup', handleEscUp)
}

// закрытие попапа профиля по escape (общая фунция)
const ESC_KEYCODE = 27
const handleEscUp = (e) => {
  if (e.keyCode === ESC_KEYCODE) {
    const activePopup = document.querySelector('.popup_opened')
    closeModalWondow(activePopup)
  }
}

//закрытие попапа при клике по оверлею (общая фунция)
const handleClickOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closeModalWondow(e.target)
  }
}

export { openModalWindow, closeModalWondow, handleEscUp, handleClickOverlay }

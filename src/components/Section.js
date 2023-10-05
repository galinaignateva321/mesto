export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem(element) {
    this._container.append(element)
  }

  renderItems(data) {
    data.forEach((cardData) => {
      // console.log()
      this._renderer(cardData)
    })
  }
}

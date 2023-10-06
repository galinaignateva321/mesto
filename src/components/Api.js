export class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _getRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Что-то пошло не так...')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getUser() {
    return this._getRequest(`${this._url}/v1/cohort-76/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  setUser(data) {
    return this._getRequest(`${this._url}/v1/cohort-76/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
  }
  $

  createNewAvatar(data) {
    return this._getRequest(`${this._url}/v1/cohort-76/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
  }

  getAllCards() {
    return this._getRequest(`${this._url}/v1/cohort-76/cards`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  createNewCard(data) {
    return this._getRequest(`${this._url}/v1/cohort-76/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
  }

  deleteCard(cardId) {
    return this._getRequest(`${this._url}/v1/cohort-76/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  likeCard(cardId) {
    return this._getRequest(`${this._url}/v1/cohort-76/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  deleteLikeCard(cardId) {
    return this._getRequest(`${this._url}/v1/cohort-76/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

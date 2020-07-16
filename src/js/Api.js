export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getUser = () => {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      // Можно лучше
      // Повторяющийся код разбора ответа ошибки сервера можно вынести в отдельный метод класса.
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  loadingCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  updateProfile(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}
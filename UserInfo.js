class UserInfo {

  setUserInfo = ({ user, about, avatar }) => {
    this._user = user;
    this._about = about;
    this._avatar = avatar;
  }

  updateRender = (userElement, aboutElement, userAvater) => {
    userElement.textContent = this._user;
    aboutElement.textContent = this._about;

    userAvater.style.backgroundImage = `url(${this._avatar})`;
  }

  getUserInfo = () => {
    return { user: this._user, about: this._about };
  }
}

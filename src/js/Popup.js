export class Popup {
  constructor(popupForm, closeForm) {
    this._popupForm = popupForm;
    this._closeForm = closeForm;
    this.close = this.close.bind(this);
    this.setListeners();
  }

  open() {
    this._popupForm.classList.add('popup_is-opened');
  }

  close() {
    this._popupForm.classList.remove('popup_is-opened');
  }

  setListeners() {
    this._closeForm.addEventListener('click', this.close);
  }
}
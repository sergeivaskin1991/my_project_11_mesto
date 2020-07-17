import './pages/index.css'
import {Api} from "./js/Api"
import {Card} from "./js/Card"
import {CardList} from "./js/CardList"
import {FormValidator} from "./js/FormValidator"
import {Popup} from "./js/Popup"
import {AddCardPopup} from "./js/AddCardPopup"
import {UserInfo} from "./js/UserInfo"

(function () {


  const placesList = document.querySelector('.places-list');
  const form = document.querySelector('.popup__form');
  const userName = document.querySelector('.user-info__name');
  const userAbout = document.querySelector('.user-info__job');
  const userAvatar = document.querySelector('.user-info__photo');
  const openEditForm = document.querySelector('.user-info__edit');
  const closeEditForm = document.querySelector('.popup__close_type_profile');
  const editForm = document.querySelector('.popup_type_profile');
  const formUser = document.querySelector('#edit');
  const formNewMesto = document.querySelector('#new');

  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка'
  };
  const config = {
    url: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: 'e68fb6ad-453f-4883-819e-2174dfda84ad',
      'Content-Type': 'application/json'
    }
  };
  const openCardForm = document.querySelector('.user-info__button');
  const closeCardForm = document.querySelector('.popup__close_type_card');
  const cardForm = document.querySelector('.popup_type_card')

  const closedImage = document.querySelector('.popup__close_image');
  const imagePopup = document.querySelector('.popup_type_image');
  const imageZoom = document.querySelector('.popup__image');

  const link = formNewMesto.elements.link;
  const name = formNewMesto.elements.name;

  //сброс ошибок
  function resetPopup() {
    form.reset();
    formValidCardAdd.resetErrorsPopup();
    formValidEdit.resetErrorsPopup();

    formValidCardAdd.setSubmitButtonState(false);
  }
  const popupEditForm = new AddCardPopup(editForm, openEditForm, closeEditForm, resetPopup);
  const popupCardForm = new AddCardPopup(cardForm, openCardForm, closeCardForm, resetPopup);
  const popupImgPic = new Popup(imagePopup, closedImage);
  const formValidCardAdd = new FormValidator(formNewMesto, errorMessages);
  const formValidEdit = new FormValidator(formUser, errorMessages);
  const userInfo = new UserInfo();

  const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';

  const apiData = {
    baseUrl: `${API_URL}/cohort11`,
    headers: {
      authorization: 'e68fb6ad-453f-4883-819e-2174dfda84ad',
      'Content-Type': 'application/json'
    }
  }

  const api = new Api(apiData);

  const cardsArray = [];

  api.getUser()
    .then(data => {
      userInfo.setUserInfo({
        user: data.name,
        about: data.about,
        avatar: data.avatar,
      });

      userInfo.updateRender(userName, userAbout, userAvatar);
    })
    .catch(err => {
      console.log(err);
    });

  api.loadingCards()
    .then(res => {
      cardList.render(iteratingArray(res))
    })
    .catch(err => {
      console.log(err);
    });


  function formAddEdit(event) {
    event.preventDefault();

    const name = formUser.elements.user.value;
    const about = formUser.elements.about.value;

    api.updateProfile(name, about)
      .then((data) => {
        userInfo.setUserInfo({ user: data.name, about: data.about, avatar: data.avatar });
        userInfo.updateRender(userName, userAbout, userAvatar);
        popupEditForm.close();
      })
      .catch(err => {
        console.log(err);
      });

  }


  function addImg(url) {
    imageZoom.src = url;
    popupImgPic.open();
  }

  function iteratingArray(arr) {
    arr.forEach(function (item) {
      const card = new Card(item.link, item.name, addImg);
      const newCard = card.create();
      cardsArray.push(newCard);
    });
  }
  const cardList = new CardList(placesList, cardsArray);

  function formAddCard(event) {
    event.preventDefault();

    const card = new Card(link.value, name.value, addImg);
    cardList.addCard(card.create());

    popupCardForm.close();
    formValidCardAdd.setSubmitButtonState(false);
  }

  function formEditAdd() {

    const getUserAbout = userInfo.getUserInfo();
    formUser.elements.user.value = getUserAbout.user;
    formUser.elements.about.value = getUserAbout.about;

    formValidEdit.setSubmitButtonState(true);
  }

  openEditForm.addEventListener('click', formEditAdd);
  formNewMesto.addEventListener('submit', formAddCard);
  formUser.addEventListener('submit', formAddEdit);
})();

// ## Итог


export class Card {
	constructor(url, name, imageOpen) {
	  this._url = url;
	  this._name = name;
	  this._imageOpen = imageOpen;
	}

	like = (event) => {
		event.target.classList.toggle('place-card__like-icon_liked');
	  }
	
	remove = () => {
		this.removeListeners();
		this.placeCard.remove();
	  }

	create() {
	  this.placeCard = document.createElement('div');
	  this.placeCardImage = document.createElement('div');
	  this.placeCardDeleteIcon = document.createElement('button');
	  this.placeCardDescription = document.createElement('div');
	  this.placeCardName = document.createElement('h3');
	  this.placeCardLikeIcon = document.createElement('button');
  
	  this.placeCard.classList.add('place-card');
	  this.placeCardImage.classList.add('place-card__image');
	  this.placeCardImage.setAttribute('style', 'url');
	  this.placeCardImage.style.backgroundImage = `url(${this._url})`;
	  this.placeCardImage.style.cursor = 'pointer';
	  this.placeCardDeleteIcon.classList.add('place-card__delete-icon');
	  this.placeCardDescription.classList.add('place-card__description');
	  this.placeCardName.classList.add('place-card__name');
	  this.placeCardName.textContent = this._name;
	  this.placeCardLikeIcon.classList.add('place-card__like-icon');
  
	  this.placeCard.appendChild(this.placeCardImage);
	  this.placeCardImage.appendChild(this.placeCardDeleteIcon);
	  this.placeCard.appendChild(this.placeCardDescription);
	  this.placeCardDescription.appendChild(this.placeCardName);
	  this.placeCardDescription.appendChild(this.placeCardLikeIcon);
  
	  this.setEventListeners();
	  return this.placeCard;
	}
  
	/** REVIEW: Можно лучше:
	 * 
	 * Вынести реализацию открытия попапа с большой картинкой в отдельный класс, например ImagePopup, который будет
	 * наследоваться от базового класса Popup
	 */
	openImage = () => {
	  this._imageOpen(this._url);
	}
  
	setEventListeners() {
	  this.placeCardLikeIcon.addEventListener('click', this.like);
	  this.placeCardDeleteIcon.addEventListener('click', this.remove);
	  this.placeCardImage.addEventListener('click', this.openImage);
	}
  
	removeListeners() {
	  this.placeCardLikeIcon.removeEventListener('click', this.like);
	  this.placeCardDeleteIcon.removeEventListener('click', this.remove);
	  this.placeCardImage.removeEventListener('click', this.openImage);
	}
  }
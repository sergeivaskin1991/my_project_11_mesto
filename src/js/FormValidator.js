export class FormValidator {
	constructor(form, errorMessages) {
	  this.form = form;
	  this._errorMessages = errorMessages;
	  this.setListeners();
	}
  //проверки поля на ошибки
	isValidate = (input) => { 
		input.setCustomValidity('');
	  if (input.validity.valueMissing) {
		input.setCustomValidity(this._errorMessages.valueMissing);
		return false
	  } else if (input.validity.tooShort || input.validity.tooLong) {
		input.setCustomValidity(this._errorMessages.tooShort);
		return false
	  } else if (input.validity.typeMismatch && input.type === 'url') {
		input.setCustomValidity(this._errorMessages.typeMismatch);
		return false
	  }
  
	  return input.checkValidity();
	}
  
	inputErrorAdd = (input) => {  
	  this.errorMessage = this.form.querySelector(`#${input.id}-error`);
	  this.errorMessage.textContent = input.validationMessage;
	}
  
	isFieldValid = (input) => {  
	  const valid = this.isValidate(input);
	  this.inputErrorAdd(input);
	  return valid;
	}
  
	setSubmitButtonState = (stateElement) => {  
		if (stateElement) {
			this.button.removeAttribute('disabled');
			this.button.classList.add('popup__button_valid');
		  } else {
			this.button.setAttribute('disabled', 'true');
			this.button.classList.remove('popup__button_valid');
		  }
	}
  /**слушатесь события на input */
	handlerInputForm = (event) => {  
	  this.isFieldValid(event.target);
	  if (this.form.checkValidity()) {
		this.setSubmitButtonState(true);
	  } else {
		this.setSubmitButtonState(false);
	  }
	}
  

	setListeners = () => {
	  this.errors = this.form.querySelectorAll('.error');
	  this.button = this.form.querySelector('.button');
	  this.form.addEventListener('input', this.handlerInputForm);
	}
	resetErrorsPopup = () => {
		this.errors.forEach((errorElement) =>
		  errorElement.textContent = '');
	  }
  }
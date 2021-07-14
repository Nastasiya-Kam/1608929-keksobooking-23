import {isEscEvent} from './utils.js';
import {resetOfferForm} from './validation.js';

const body = document.body;
const templateSuccess = document.querySelector('#success').content.querySelector('.success');

const onMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    templateSuccess.remove();
    resetOfferForm();
  }
};

const openMessageSuccess = () => {
  body.appendChild(templateSuccess);
  document.addEventListener('keydown', onMessageEscKeydown);
};

const closeMessageSuccess = () => {
  templateSuccess.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

templateSuccess.addEventListener('click', () => {
  closeMessageSuccess();
  resetOfferForm();
});

const templateError = document.querySelector('#error').content.querySelector('.error');

const openMessageError = () => {
  body.appendChild(templateError);
  document.addEventListener('keydown', onMessageEscKeydown);
};

const closeMessageError = () => {
  templateError.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

templateError.addEventListener('click', () => {
  closeMessageError();
});

export {openMessageSuccess, openMessageError};

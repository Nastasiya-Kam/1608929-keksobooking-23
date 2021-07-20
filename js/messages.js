import {isEscEvent} from './utils.js';
import {resetOfferForm} from './validation.js';

const body = document.body;
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    templateSuccess.remove();
    resetOfferForm();
  }
};

const openMessageSuccess = () => {
  body.appendChild(templateSuccess);
  document.addEventListener('keydown', onSuccessEscKeydown);
};

const closeMessageSuccess = () => {
  templateSuccess.remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
};

templateSuccess.addEventListener('click', () => {
  closeMessageSuccess();
  resetOfferForm();
});

const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    templateError.remove();
  }
};

const openMessageError = () => {
  body.appendChild(templateError);
  document.addEventListener('keydown', onErrorEscKeydown);
};

const closeMessageError = () => {
  templateError.remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
};

templateError.addEventListener('click', () => {
  closeMessageError();
});

export {openMessageSuccess, openMessageError};

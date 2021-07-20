import {resetOfferForm} from './validation.js';
import {openMessageError} from './messages.js';
import {sendData} from './api.js';

const offerForm = document.querySelector('.ad-form');
const buttonFormReset = document.querySelector('.ad-form__reset');

const setDisabled = (className, isDisabled) => {
  const element = document.querySelector(`.${className}`);

  (isDisabled) ? element.classList.add(`${className}--disabled`) : element.classList.remove(`${className}--disabled`);

  for (let index = 0; index < element.length; index++) {
    (isDisabled) ? element[index].disabled = true : element[index].disabled = false;
  }
};

const disableFilter = () => {
  setDisabled('map__filters', true);
};

const disableFormFill = () => {
  setDisabled('ad-form', true);
};

disableFilter();
disableFormFill();

const enableFilter = () => {
  setDisabled('map__filters', false);
};

const enableFormFill = () => {
  setDisabled('ad-form', false);
};

const setOfferFormSubmit = (onSuccess) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => openMessageError(),
      new FormData(evt.target),
    );
  });
};

buttonFormReset.addEventListener('click', () => {
  resetOfferForm();
});

export {enableFilter, enableFormFill, disableFilter, disableFormFill, setOfferFormSubmit};

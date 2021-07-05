// todo Разбить на модули?

// todo time-module.js - прописана логика работы полей timein и timeout
// !всего шесть строк. Нужно ли его выносить в отдельный модуль?
// todo price-type-module.js - работа поля с ценой и типом жилья
// todo rooms-capacity-module.js - работа модулей количество комнат и количество мест

import {resetFilter} from './filter.js';
import {setMarkerLatLngDefault} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const NOT_CAPACITY = 100;

// ?Перечисление?
// Б8. Название классов, конструкторов и перечислений начинается с заглавной буквы. В названии используются английские существительные. Значения перечислений объявлены как константы.
const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;

const titleInput = document.querySelector('input[name=title]');
const addressInput = document.querySelector('input[name=address]');
const priceInput = document.querySelector('input[name=price]');
const roomsSelect = document.querySelector('select[name=rooms]');
const capacitySelect = document.querySelector('select[name=capacity]');
const typeSelect = document.querySelector('select[name=type]');
const timeinSelect = document.querySelector('select[name=timein]');
const timeoutSelect = document.querySelector('select[name=timeout]');
const featuresCheckbox = document.querySelectorAll('.features__checkbox');
const textareaDescription = document.querySelector('textarea[name=description]');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  let customMessage = '';

  if (valueLength > MAX_TITLE_LENGTH) {
    customMessage = `Превышено количество допустимых знаков на ${valueLength - MAX_TITLE_LENGTH}`;
  } else if (valueLength < MIN_TITLE_LENGTH) {
    customMessage = `Минимальное количество знаков ${MIN_TITLE_LENGTH}. Осталось ${MIN_TITLE_LENGTH - valueLength}`;
  }

  titleInput.setCustomValidity(customMessage);

  titleInput.reportValidity();
});

const onInput = () => {
  const value = priceInput.value;
  const minValue = priceInput.min;
  let customMessage = '';

  if (value > MAX_PRICE) {
    customMessage = `Максимальная цена за ночь ${MAX_PRICE}`;
  } else if (value < minValue && value !== '') {
    customMessage = `Минимальная цена за ночь ${minValue}`;
  }

  priceInput.setCustomValidity(customMessage);

  if (value !== '') {
    priceInput.reportValidity();
  }
};

priceInput.addEventListener('input', onInput);

const setPrice = (type) => {
  switch (type) {
    case 'bungalow':
      priceInput.min = BUNGALOW_MIN_PRICE;
      return priceInput.placeholder = BUNGALOW_MIN_PRICE;
    case 'flat':
      priceInput.min = FLAT_MIN_PRICE;
      return priceInput.placeholder = FLAT_MIN_PRICE;
    case 'hotel':
      priceInput.min = HOTEL_MIN_PRICE;
      return priceInput.placeholder = HOTEL_MIN_PRICE;
    case 'house':
      priceInput.min = HOUSE_MIN_PRICE;
      return priceInput.placeholder = HOUSE_MIN_PRICE;
    case 'palace':
      priceInput.min = PALACE_MIN_PRICE;
      return priceInput.placeholder = PALACE_MIN_PRICE;
  }
};

typeSelect.addEventListener('input', () => {
  setPrice(typeSelect.value);

  onInput();
});

timeinSelect.addEventListener('change', () => {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeinSelect.value = timeoutSelect.value;
});

const checkCapacity = (rooms, capacity) => {
  const roomsNumber = Number(rooms.value);
  const capacityValue = Number(capacity.value);
  let customMessage = '';

  if (roomsNumber !== 100) {
    if (roomsNumber < capacityValue || capacityValue === 0) {
      customMessage = `Выбранное количестно комнат предполагает размещение гостей, но не более ${roomsNumber}`;
    }
  } else {
    if (capacityValue !== 0) {
      customMessage = 'Выбранное количестно комнат не предполагает размещение гостей';
    }
  }

  return capacity.setCustomValidity(customMessage);
};

const setDisabledOption = (options, rooms) => {
  rooms = Number(rooms);

  for (let index = 0; index < options.length; index++) {
    const option = options[index];

    if (rooms === NOT_CAPACITY) {
      option.disabled = (Number(option.value) !== 0);
    } else {
      option.disabled = (rooms < Number(option.value) || Number(option.value) === 0);
    }
  }
};

roomsSelect.addEventListener('input', () => {
  checkCapacity(roomsSelect, capacitySelect);
  setDisabledOption(capacitySelect, roomsSelect.value);

  capacitySelect.reportValidity();
});

capacitySelect.addEventListener('input', () => {
  checkCapacity(roomsSelect, capacitySelect);

  capacitySelect.reportValidity();
});

const resetOfferForm = () => {
  titleInput.value = '';
  addressInput.value = '35.68080, 139.76710';
  priceInput.value = '';
  priceInput.placeholder = 1000;
  typeSelect.value = 'flat';
  timeinSelect.value = '12:00';
  timeoutSelect.value = '12:00';
  roomsSelect.value = 1;
  capacitySelect.value = 1;

  featuresCheckbox.forEach((value) => {
    value.checked = false;
  });

  textareaDescription.value = '';

  setMarkerLatLngDefault();
  resetFilter();
};

export {resetOfferForm};

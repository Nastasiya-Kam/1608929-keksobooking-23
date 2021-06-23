// 2.4. Страница реагирует на неправильно введённые значения в форму.

// При попытке отправить форму с неправильными данными, отправки не происходит,
// а неверно заполненные поля подсвечиваются красной рамкой.

// function makeValidation () {}

// 2.5. При успешной отправке формы или её очистке...
// ?либо отдельная функция
// function resetForm () {
// }
// ?либо часть makeValidation

// todo Разбить на модули?

// todo time-module.js - прописана логика работы полей timein и timeout
// !всего шесть строк. Нужно ли его выносить в отдельный модуль?
// todo price-type-module.js - работа поля с ценой и типом жилья
// todo rooms-capacity-module.js - работа модулей количество комнат и количество мест

// todo прописать на листе взаимосвязи модулей

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const NOT_CAPACITY = 100;

const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;

const titleInput = document.querySelector('input[name=title]');
const priceInput = document.querySelector('input[name=price]');
const roomsSelect = document.querySelector('select[name=rooms]');
const capacitySelect = document.querySelector('select[name=capacity]');
const typeSelect = document.querySelector('select[name=type]');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Превышено количество допустимых знаков на ${valueLength - MAX_TITLE_LENGTH}`);
  } else if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Минимальное количество знаков ${MIN_TITLE_LENGTH}. Осталось ${MIN_TITLE_LENGTH - valueLength}`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const value = priceInput.value;
  const minValue = priceInput.min;

  if (value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  if (value < minValue && value !== '') {
    priceInput.setCustomValidity(`Минимальная цена за ночь ${minValue}`);
  } else {
    priceInput.setCustomValidity('');
  }

  if (value !== '') {
    priceInput.reportValidity();
  }
});

function setPrice (type) {
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
}

typeSelect.addEventListener('input', () => {
  setPrice(typeSelect.value);
  const value = priceInput.value;

  if (value !== '') {
    priceInput.reportValidity();
  }
});

function checkCapacity (rooms, capacity) {
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
}

function setDisabledOption (options, rooms) {
  rooms = Number(rooms);

  for (let index = 0; index < options.length; index++) {

    const option = options[index];

    if (rooms === NOT_CAPACITY) {
      (Number(option.value) !== 0) ? option.disabled = true : option.disabled = false;
    } else {
      (rooms < Number(option.value) || Number(option.value) === 0) ? option.disabled = true : option.disabled = false;
    }
  }
}

roomsSelect.addEventListener('input', () => {
  checkCapacity(roomsSelect, capacitySelect);
  setDisabledOption(capacitySelect, roomsSelect.value);

  capacitySelect.reportValidity();
});

capacitySelect.addEventListener('input', () => {
  checkCapacity(roomsSelect, capacitySelect);

  capacitySelect.reportValidity();
});

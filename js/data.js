const TITLE = 'Секундное предложение. Завтра уже не будет';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = 'Уютная квартира в центре города со своей кухней и ванной комнатой';

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomInteger (start, finish) {
  if (start < 0 || finish < 0) {
    return 'Диапазон может быть только положительный. Переопределите границы диапазона';
  }

  if (start >= finish) {
    return 'Начало диапазона больше или совпадает с его окончанием. Переопределите начало диапазона';
  }

  return Math.floor(Math.random() * (finish - start + 1) + start); //  Взято с MDN: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

function getInteger (number, decimal) {
  for (let index = 0; index < decimal; index++) {
    number *= 10;
  }

  return Math.floor(number);
}

function getRandomFloat (start, finish, decimalPlaces) {
  if (start < 0 || finish < 0) {
    return 'Диапазон может быть только положительный. Переопределите границы диапазона';
  }

  if (start >= finish) {
    return 'Начало диапазона больше или совпадает с его окончанием. Переопределите начало диапазона';
  }

  const startInt = getInteger(start, decimalPlaces);
  const finishInt = getInteger(finish, decimalPlaces);

  let number = Math.floor(Math.random() * (finishInt - startInt + 1) + startInt); // Взято с MDN: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const lengthNumber = (start === 0) ? decimalPlaces + 2 : String(number).length;

  for (let index = 0; index < decimalPlaces; index++) {
    number /= 10;
  }

  return (number < start) ? 'Число ниже указанного диапазона' : Number(String(number).substr(0, decimalPlaces + (lengthNumber - decimalPlaces + 1)));
}

function getAuthor (number) {
  const result = (number < 10) ? `0${number}` : number;
  const randomAvatar = `img/avatars/user${result}.png`;

  return {
    avatar: randomAvatar,
  };
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function isExistsElement(array, element) {
  return array.some((value) => element === value);
}

function getRandomArrayUniqueElements(array) {
  const arrayLength = getRandomInteger(1, array.length);
  const resultArray = [];
  let element = getRandomArrayElement(array);

  while (resultArray.length < arrayLength) {
    if (isExistsElement(resultArray, element)) {
      element = getRandomArrayElement(array);
    } else {
      resultArray.push(element);
    }
  }

  return resultArray;
}

function getOffer ({lat, lng}) {
  return {
    title: TITLE,
    address: `${lat}, ${lng}`,
    price: getRandomInteger(0, 1000000),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomInteger(0, 100),
    guests: getRandomInteger(0, 3),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getRandomArrayUniqueElements(FEATURES),
    description: DESCRIPTION,
    photos: getRandomArrayUniqueElements(PHOTOS),
  };
}

function getLocation () {
  const randomLatitude = getRandomFloat(35.65000, 35.70000, 5);
  const randomLongitude = getRandomFloat(139.70000, 139.80000, 5);

  return {
    lat: randomLatitude,
    lng: randomLongitude,
  };
}

function createOffer (number) {
  const description = {};

  description.author = getAuthor(number);
  description.location = getLocation();
  description.offer = getOffer(description.location);

  return description;
}

function getSimilarDescriptions (count) {
  return new Array(count).fill(null).map((value, index) => value = createOffer(index + 1));
}

export {getSimilarDescriptions};

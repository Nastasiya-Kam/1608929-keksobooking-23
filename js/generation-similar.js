const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const Price = {
  LOW: 10000,
  HIGH: 50000,
};

const DEFAULT_VALUE = 'any';

const SIMILAR_DESCRIPTION_COUNT = 10;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getType = (type) => typeHousing[type];
const hideElement = (element) => element.classList.add('hidden');

const getFeatures = (features, card) => {
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  const list = card.querySelector('.popup__features');

  list.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
};

const getPhotos = (list, arrayPhotos) => {
  const popupPhoto = list.querySelector('.popup__photo');
  const popupPhotosFragment = document.createDocumentFragment();

  arrayPhotos.forEach((photo) => {
    const photoElement = popupPhoto.cloneNode(true);
    photoElement.src = photo;
    popupPhotosFragment.appendChild(photoElement);
  });

  popupPhoto.remove();
  list.appendChild(popupPhotosFragment);
};

const checkParameter = (template, parameter, text, className) => {
  const element = template.querySelector(className);

  (parameter) ? element.textContent = text : hideElement(element);
};

const getCheckedFeatures = (array) => {
  const checkedArray = [];

  array.forEach((element) => {
    if (element.checked) {
      checkedArray.push(element.value);
    }
  });

  return checkedArray;
};

const filterOffers = (property) => {
  const housingTypeFilter = document.querySelector('select[name="housing-type"]');
  const housingPriceFilter = document.querySelector('select[name="housing-price"]');
  const housingRoomsFilter = document.querySelector('select[name="housing-rooms"]');
  const housingGuestsFilter = document.querySelector('select[name="housing-guests"]');
  const housingMapFeatures = document.querySelectorAll('.map__checkbox');

  const checkedFeatures = getCheckedFeatures(housingMapFeatures);

  let isValidType = false;
  let isValidPrice = false;
  let isValidRooms = false;
  let isValidGuests = false;
  let isValidFeatures = true;

  isValidType = (property.offer.type === housingTypeFilter.value || housingTypeFilter.value === DEFAULT_VALUE);

  switch (true) {
    case housingPriceFilter.value === DEFAULT_VALUE:
      isValidPrice = true;
      break;
    case housingPriceFilter.value === 'middle' && property.offer.price >= Price.LOW && property.offer.price < Price.HIGH:
      isValidPrice = true;
      break;
    case housingPriceFilter.value === 'low' && property.offer.price < Price.LOW:
      isValidPrice = true;
      break;
    case housingPriceFilter.value === 'high' && property.offer.price >= Price.HIGH:
      isValidPrice = true;
      break;
  }

  if (property.offer.rooms === Number(housingRoomsFilter.value) || housingRoomsFilter.value === DEFAULT_VALUE) {
    isValidRooms = true;
  }

  if (property.offer.guests === Number(housingGuestsFilter.value) || housingGuestsFilter.value === DEFAULT_VALUE) {
    isValidGuests = true;
  }

  if (checkedFeatures.length) {
    if (property.offer.features) {
      isValidFeatures = checkedFeatures.every((feature) => property.offer.features.includes(feature));
    } else {
      isValidFeatures = false;
    }
  }

  if (isValidType && isValidPrice && isValidRooms && isValidGuests && isValidFeatures) {
    return property;
  }
};

const generateSimilarProperties = (descriptionOffer) => {
  const array = descriptionOffer
    .slice()
    .filter(filterOffers)
    .slice(0, SIMILAR_DESCRIPTION_COUNT)
    .map(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, location}) => {
      const cardElement = cardTemplate.cloneNode(true);

      checkParameter(cardElement, title, title, '.popup__title');
      checkParameter(cardElement, address, address, '.popup__text--address');
      checkParameter(cardElement, price, `${price} ₽/ночь`, '.popup__text--price');
      checkParameter(cardElement, type, getType(type), '.popup__type');
      checkParameter(cardElement, rooms && guests, `${rooms} комнаты для ${guests} гостей`, '.popup__text--capacity');
      checkParameter(cardElement, checkin && checkout, `Заезд после ${checkin}, выезд до ${checkout}`, '.popup__text--time');
      (features) ? getFeatures(features, cardElement) : hideElement(cardElement.querySelector('.popup__features'));
      checkParameter(cardElement, description, description, '.popup__description');
      (photos) ? getPhotos(cardElement.querySelector('.popup__photos'), photos) : hideElement(cardElement.querySelector('.popup__photos'));
      (avatar) ? cardElement.querySelector('.popup__avatar').src = avatar : hideElement(cardElement.querySelector('.popup__avatar'));

      return [cardElement, location];
    });

  return array;
};

export {generateSimilarProperties};

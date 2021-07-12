const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// ?Нужна ли переменная
const Default = {
  TYPE: 'any',
  PRICE: 'any',
  ROOMS: 'any',
  GUESTS: 'any',
};

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

const getPropertiesRank = (property) => {
  const housingFeatures = document.querySelectorAll('.map__checkbox');

  let rank = 0;

  if (property.offer.features) {
    property.offer.features.forEach((featureOffer) => {
      housingFeatures.forEach((featureCheckbox) => {
        if (featureOffer === featureCheckbox.value && featureCheckbox.checked) {
          rank += 2;
        } else if (featureOffer === featureCheckbox.value && !featureCheckbox.checked) {
          rank += 1;
        }
      });
    });
  }

  return rank;
};

const compareProperties = (propertyA, propertyB) => {
  const rankA = getPropertiesRank(propertyA);
  const rankB = getPropertiesRank(propertyB);

  return rankB - rankA;
};

const filterOffers = (property) => {
  const housingTypeFilter = document.querySelector('select[name="housing-type"]');
  const housingPriceFilter = document.querySelector('select[name="housing-price"]');
  const housingRoomsFilter = document.querySelector('select[name="housing-rooms"]');
  const housingGuestsFilter = document.querySelector('select[name="housing-guests"]');

  let isValidType = false;
  let isValidPrice = false;
  let isValidRooms = false;
  let isValidGuests = false;

  isValidType = (property.offer.type === housingTypeFilter.value || housingTypeFilter.value === Default.TYPE);

  // ?Нужно ли завести "коллекцию" или словарь на any, middle, low...
  switch (housingPriceFilter.value) {
    case 'any':
      isValidPrice = true;
      break;
    case 'middle':
      if (property.offer.price >= 10000 && property.offer.price < 50000) {
        isValidPrice = true;
      }
      break;
    case 'low':
      if (property.offer.price < 10000) {
        isValidPrice = true;
      }
      break;
    case 'high':
      if (property.offer.price >= 50000) {
        isValidPrice = true;
      }
      break;
  }

  // ? Если комнат больше, чем 2, то какой фильтр?
  if (property.offer.rooms === Number(housingRoomsFilter.value) || housingRoomsFilter.value === Default.ROOMS) {
    isValidRooms = true;
  }

  // ? Если гостей больше, чем 2, то какой фильтр?
  if (property.offer.guests === Number(housingGuestsFilter.value) || housingGuestsFilter.value === Default.GUESTS) {
    isValidGuests = true;
  }

  if (isValidType && isValidPrice && isValidRooms && isValidGuests) {
    return property;
  }
};

const generateSimilarProperties = (descriptionOffer) => {

  const array = descriptionOffer
    .slice()
    .filter(filterOffers)
    .sort(compareProperties)
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

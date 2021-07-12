const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// const Default = {
//   TYPE: 'any',
//   PRICE: 'any',
//   ROOMS: 'any',
//   GUESTS: 'any',
// };

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
  const housingTypeFilter = document.querySelector('select[name="housing-type"]');
  const housingPriceFilter = document.querySelector('select[name="housing-price"]');
  const housingRoomsFilter = document.querySelector('select[name="housing-rooms"]');
  const housingGuestsFilter = document.querySelector('select[name="housing-guests"]');
  const housingFeatures = document.querySelectorAll('.map__checkbox');

  let rank = 0;

  if (property.offer.type === housingTypeFilter.value) {// || housingTypeFilter.value === Default.TYPE) {
    rank += 1;
  }

  switch (housingPriceFilter.value) {
    // case 'any':
    //   rank +=1;
    //   break;
    case 'middle':
      if (property.offer.price >= 10000 && property.offer.price < 50000) {
        rank +=1;
      }
      break;
    case 'low':
      if (property.offer.price < 10000) {
        rank +=1;
      }
      break;
    case 'high':
      if (property.offer.price >= 50000) {
        rank +=1;
      }
      break;
  }

  if (property.offer.rooms === Number(housingRoomsFilter.value)) {// || housingRoomsFilter.value === Default.ROOMS) {
    rank += 1;
  }

  // ? Если гостей больше, чем 2, то какой фильтр?
  switch (housingGuestsFilter.value) {
    // case 'any':
    //   rank +=1;
    //   break;
    case '2':
      if (property.offer.guests === 2) {
        rank +=1;
      }
      break;
    case '1':
      if (property.offer.guests === 1) {
        rank +=1;
      }
      break;
    case '0':
      if (property.offer.guests === 0) {
        rank +=1;
      }
      break;
  }

  if (property.offer.features) {
    property.offer.features.forEach((value) => {
      housingFeatures.forEach((feature) => {
        if (value === feature.value && feature.checked) {
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

  // console.log(rankA);
  return rankB - rankA;
};

const generateSimilarProperties = (descriptionOffer) => {
  const array = descriptionOffer
    .slice()
    .sort(compareProperties)
    // .filter()
    .slice(0, SIMILAR_DESCRIPTION_COUNT)
    .map(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, location}) => {
      const cardElement = cardTemplate.cloneNode(true);

      // console.log(price);
      // console.log(type);
      // console.log(rooms);
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


// switch (housingRoomsFilter.value) {
//   case 'any':
//     rank +=1;
//     break;
//   case '1':
//     if (property.offer.rooms === '1') {
//       rank +=1;
//     }
//     break;
//   case '2':
//     if (property.offer.rooms === '2') {
//       rank +=1;
//     }
//     break;
//   case '3':
//     if (property.offer.rooms === '3') {
//       rank +=1;
//     }
//     break;
// }

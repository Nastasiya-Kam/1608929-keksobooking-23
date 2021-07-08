const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

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

const generateSimilarProperties = (descriptionOffer) => {
  const array = descriptionOffer.map(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, location}) => {
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

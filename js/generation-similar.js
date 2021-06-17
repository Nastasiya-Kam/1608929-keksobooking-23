import {getSimilarDescriptions} from './data.js';

const SIMILAR_DESCRIPTION_COUNT = 10;
const similarProperties = getSimilarDescriptions(SIMILAR_DESCRIPTION_COUNT);
const similarListFragment = document.createDocumentFragment();

const mapCanvas = document.querySelector('.map__canvas');

const cardTemplate =  document.querySelector('#card')
  .content
  .querySelector('.popup');

function getType (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return 'Непонятно!';
  }
}

function hideElement (element) {
  element.classList.add('hidden');
}

function getFeatures (features, card) {
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  const list = card.querySelector('.popup__features');

  list.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
}

function getPhotos (list, arrayPhotos) {
  const popupPhoto = list.querySelector('.popup__photo');
  const popupPhotosFragment = document.createDocumentFragment();

  arrayPhotos.forEach((photo) => {
    const photoElement = popupPhoto.cloneNode(true);
    photoElement.src = photo;
    popupPhotosFragment.appendChild(photoElement);
  });

  popupPhoto.remove();
  list.appendChild(popupPhotosFragment);
}

function generateSimilarProperties ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) {
  const cardElement = cardTemplate.cloneNode(true);

  (title) ? cardElement.querySelector('.popup__title').textContent = title : hideElement(cardElement.querySelector('.popup__title'));
  (address) ? cardElement.querySelector('.popup__text--address').textContent = address : hideElement(cardElement.querySelector('.popup__text--address'));
  (price) ? cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь` : hideElement(cardElement.querySelector('.popup__text--price'));
  (type) ? cardElement.querySelector('.popup__type').textContent = getType(type) : hideElement(cardElement.querySelector('.popup__type'));
  (rooms && guests) ? cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей` : hideElement(cardElement.querySelector('.popup__text--capacity'));
  (checkin && checkout) ? cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}` : hideElement(cardElement.querySelector('.popup__text--time'));
  (features) ? getFeatures(features, cardElement) : hideElement(cardElement.querySelector('.popup__features'));
  (description) ? cardElement.querySelector('.popup__description').textContent = description : hideElement(cardElement.querySelector('.popup__description'));
  (photos) ? getPhotos(cardElement.querySelector('.popup__photos'), photos) : hideElement(cardElement.querySelector('.popup__photos'));
  (avatar) ? cardElement.querySelector('.popup__avatar').src = avatar : hideElement(cardElement.querySelector('.popup__avatar'));

  similarListFragment.appendChild(cardElement);

  return similarListFragment;
}

generateSimilarProperties(similarProperties[1]);
mapCanvas.appendChild(similarListFragment);

const DEFAULT_VALUE = 'any';
const Price = {
  LOW: 10000,
  HIGH: 50000,
};

const formMapFilters = document.querySelector('.map__filters');
const housingTypeFilter = document.querySelector('select[name=housing-type]');
const housingPriceFilter = document.querySelector('select[name=housing-price]');
const housingRoomsFilter = document.querySelector('select[name=housing-rooms]');
const housingGuestsFilter = document.querySelector('select[name=housing-guests]');
const housingMapFeatures = document.querySelectorAll('.map__checkbox');

const getCheckedFeatures = (elements) => {
  const checkedElements = [];

  elements.forEach((element) => {
    if (element.checked) {
      checkedElements.push(element.value);
    }
  });

  return checkedElements;
};

const filterOffers = (property) => {
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

const onFilterChange = (cb) => {
  formMapFilters.addEventListener('change', (evt) => {
    if (evt.target && (evt.target.matches('select') || evt.target.matches('input[type="checkbox"]'))) {
      cb();
    }
  });
};

export {onFilterChange, filterOffers};

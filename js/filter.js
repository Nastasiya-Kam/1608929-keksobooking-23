const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__checkbox');
const housingTypeFilter = document.querySelector('select[name=housing-type]');
const housingPriceFilter = document.querySelector('select[name=housing-price]');
const housingRoomsFilter = document.querySelector('select[name=housing-rooms]');
const housingGuestsFilter = document.querySelector('select[name=housing-guests]');
const housingMapFeatures = document.querySelector('.map__features');

const resetFilter = () => {
  mapFilters.forEach((value) => value.value = 'any');
  mapFeatures.forEach((value) => value.checked = false);
};

const onTypeFilterClick = (cb) => {
  housingTypeFilter.addEventListener('change', () => {
    cb();
  });
};

const onPriceFilterClick = (cb) => {
  housingPriceFilter.addEventListener('change', () => {
    cb();
  });
};

const onRoomsFilterClick = (cb) => {
  housingRoomsFilter.addEventListener('change', () => {
    cb();
  });
};

const onGuestsFilterClick = (cb) => {
  housingGuestsFilter.addEventListener('change', () => {
    cb();
  });
};

const onHousingMapFeaturesChange = (cb) => {
  housingMapFeatures.addEventListener('change', (evt) => {
    if (evt.target && evt.target.matches('input[type="checkbox"]')) {
      cb();
    }
  });
};

export {resetFilter, onTypeFilterClick, onPriceFilterClick, onRoomsFilterClick, onGuestsFilterClick, onHousingMapFeaturesChange};

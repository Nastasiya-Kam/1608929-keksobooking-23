const formMapFilters = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__checkbox');
// const housingTypeFilter = document.querySelector('select[name=housing-type]');
// const housingPriceFilter = document.querySelector('select[name=housing-price]');
// const housingRoomsFilter = document.querySelector('select[name=housing-rooms]');
// const housingGuestsFilter = document.querySelector('select[name=housing-guests]');
// const housingMapFeaturesFilter = document.querySelector('.map__features');

const resetFilter = () => {
  mapFilters.forEach((value) => value.value = 'any');
  mapFeatures.forEach((value) => value.checked = false);
};

const onFilterChange = (cb) => {
  formMapFilters.addEventListener('change', (evt) => {
    if (evt.target && (evt.target.matches('select') || evt.target.matches('input[type="checkbox"]'))) {
      cb();
    }
  });
};

export {resetFilter, onFilterChange};

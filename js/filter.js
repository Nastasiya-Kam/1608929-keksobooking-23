// 5.8. Объекты, расположенные неподалёку, можно фильтровать.

const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__checkbox');

const resetFilter = () => {
  mapFilters.forEach((value) => value.value = 'any');
  mapFeatures.forEach((value) => value.checked = false);
};

export {resetFilter};

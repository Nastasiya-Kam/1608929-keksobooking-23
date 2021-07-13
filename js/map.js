import {generateSimilarProperties} from './generation-similar.js';
import {enablePage} from './form.js';
import {getData} from './api.js';
import {onTypeFilterClick, onPriceFilterClick, onRoomsFilterClick, onGuestsFilterClick, onHousingMapFeaturesChange} from './filter.js';
import {throttle} from './utils.js';

const RERENDER_DELAY = 500;
const LAT_LNG_DIGIT = 5;

const LatLngDefault = {
  LAT: 35.68080,
  LNG: 139.76710,
};

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => enablePage())
  .setView({
    lat: LatLngDefault.LAT,
    lng: LatLngDefault.LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: LatLngDefault.LAT,
    lng: LatLngDefault.LNG,
  }, {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setMarkerLatLngDefault = () => {
  marker.setLatLng(
    {
      lat: LatLngDefault.LAT,
      lng: LatLngDefault.LNG,
    });
};

marker.addTo(map);

marker.on('moveend', (evt) => {
  const addressLatLng = evt.target.getLatLng();
  const latitude = addressLatLng.lat.toFixed(LAT_LNG_DIGIT);
  const longitude = addressLatLng.lng.toFixed(LAT_LNG_DIGIT);

  const addressValue = `${latitude}, ${longitude}`;
  address.value = addressValue;
});

const showPins = (properties) => {
  const pins = properties.map(([value, location]) => {
    const lat = location.lat;
    const lng = location.lng;

    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const pin = L.marker(
      {
        lat,
        lng,
      }, {
        // ?Нужно ли убрать draggable, т.к. при перемещении меток адрес не меняется
        // draggable: true,
        icon: pinIcon,
      },
    );

    pin
      .addTo(map)
      .bindPopup(value);

    return pin;
  });

  return pins;
};

// ?Как вынести общую функцию
// const resetMarkers = (markers, offers) => {
//   markers.forEach((value) => map.removeLayer(value));
//   markers = showPins(generateSimilarProperties(offers));
// };

getData((offers) => {
  let markers = showPins(generateSimilarProperties(offers));

  onTypeFilterClick(throttle(
    () => {
      markers.forEach((value) => map.removeLayer(value));
      markers = showPins(generateSimilarProperties(offers));
    }, RERENDER_DELAY,
  ));

  onPriceFilterClick(throttle(
    () => {
      markers.forEach((value) => map.removeLayer(value));
      markers = showPins(generateSimilarProperties(offers));
    }, RERENDER_DELAY,
  ));

  onRoomsFilterClick(throttle(
    () => {
      markers.forEach((value) => map.removeLayer(value));
      markers = showPins(generateSimilarProperties(offers));
    }, RERENDER_DELAY,
  ));

  onGuestsFilterClick(throttle(
    () => {
      markers.forEach((value) => map.removeLayer(value));
      markers = showPins(generateSimilarProperties(offers));
    }, RERENDER_DELAY,
  ));

  onHousingMapFeaturesChange(throttle(
    () => {
      markers.forEach((value) => map.removeLayer(value));
      markers = showPins(generateSimilarProperties(offers));
    }, RERENDER_DELAY,
  ));
});

export {setMarkerLatLngDefault, LatLngDefault};

import {enablePage} from './form.js';
import {generateSimilarProperties, similarProperties} from './generation-similar.js';

const LAT_LNG_DIGIT = 5;
const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => enablePage())
  .setView({
    lat: 35.68080,
    lng: 139.76710,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52], // todo size??
  iconAnchor: [26, 52], // todo size??
});

const marker = L.marker(
  {
    lat: 35.68080,
    lng: 139.76710,
  }, {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  const addressLatLng = evt.target.getLatLng();
  const latitude = addressLatLng.lat.toFixed(LAT_LNG_DIGIT);
  const longitude = addressLatLng.lng.toFixed(LAT_LNG_DIGIT);

  const addressValue = `${latitude}, ${longitude}`;
  address.value = addressValue;
});

const points = similarProperties.map((value) => {
  const lat = value.location.lat;
  const lng = value.location.lng;

  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40], // todo size??
    iconAnchor: [20, 40], // todo size??
  });

  const pin = L.marker(
    {
      lat,
      lng,
    }, {
      draggable: true,
      icon: pinIcon,
    },
  );

  pin
    .addTo(map)
    .bindPopup(generateSimilarProperties(value));
});

points;

// 6. С помощью API карт реализуйте показ балуна
// с подробной информацией об объявлении.
// Учтите нюансы поведения и ограничения для обычных меток и главной.

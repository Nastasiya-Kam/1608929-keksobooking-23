import {generateSimilarProperties} from './generation-similar.js';
import {enableFilter, enableFormFill} from './form.js';
import {getData} from './api.js';
import {onFilterChange} from './filter.js';
import {debounce} from './utils.js';

const RERENDER_DELAY = 500;
const LAT_LNG_DIGIT = 5;
const ZOOM = 12;

const LatLngDefault = {
  LAT: 35.68080,
  LNG: 139.76710,
};

const MainPinIconSize = {
  ICON_SIZES: [52, 52],
  ANCHOR_SIZES: [26, 52],
};

const PinIconSize = {
  ICON_SIZES: [40, 40],
  ANCHOR_SIZES: [20, 40],
};

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => enableFormFill())
  .setView({
    lat: LatLngDefault.LAT,
    lng: LatLngDefault.LNG,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MainPinIconSize.ICON_SIZES,
  iconAnchor: MainPinIconSize.ANCHOR_SIZES,
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

const setLatLngDefault = () => {
  map.setView(
    {
      lat: LatLngDefault.LAT,
      lng: LatLngDefault.LNG,
    });
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

const markerGroup = L.layerGroup().addTo(map);

const showPins = (properties) => {
  const pins = properties.map(([value, location]) => {
    const lat = location.lat;
    const lng = location.lng;

    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: PinIconSize.ICON_SIZES,
      iconAnchor: PinIconSize.ANCHOR_SIZES,
    });

    const pin = L.marker(
      {
        lat,
        lng,
      }, {
        icon: pinIcon,
      },
    );

    pin
      .addTo(markerGroup)
      .bindPopup(value);

    return pin;
  });

  return pins;
};

const closePins = () => map.closePopup();

const putOffersOnMap = (offers) => {
  markerGroup.clearLayers();
  showPins(generateSimilarProperties(offers));

  onFilterChange(debounce(
    () => {
      markerGroup.clearLayers();
      showPins(generateSimilarProperties(offers));
    }, RERENDER_DELAY,
  ));
};

getData((offers) => {
  enableFilter();
  putOffersOnMap(offers);
});

export {setLatLngDefault, putOffersOnMap, closePins};

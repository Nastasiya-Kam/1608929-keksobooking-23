import {showAlert} from './utils.js';
import {openMessageError} from './messages.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((offersData) => onSuccess(offersData))
    .catch(() => showAlert('Не удалось пoлучить данные с сервера'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(openMessageError());
      }
    })
    .catch(() => {
      onFail(openMessageError());
    });
};

export {getData, sendData};

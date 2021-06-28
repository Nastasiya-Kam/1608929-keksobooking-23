// 3. Ограничения, накладываемые на поля ввода
// ?Возможно соединить с модулем validation.js, т.к. в нём происходит проверка на валидность заполненных данных

// function submitForm () {
//   Если отправка данных прошла успешно, показывается соответствующее сообщение.
//   Если при отправке данных произошла ошибка запроса, показывается соответствующее сообщение
// }

import './validation.js';

function setDisabled (className, isDisabled) {
  const element = document.querySelector(`.${className}`);

  (isDisabled) ? element.classList.add(`${className}--disabled`) : element.classList.remove(`${className}--disabled`);

  for (let index = 0; index < element.length; index++) {
    (isDisabled) ? element[index].disabled = true : element[index].disabled = false;
  }
}

function disablePage () {
  // TODO Реализация позднее. На месте карты отображается серый прямоугольник.

  setDisabled('ad-form', true);
  setDisabled('map__filters', true);
}

disablePage();

function enablePage () {
  // TODO После загрузки данных с сервера просматривать похожие объявления на карте,
  // TODO фильтровать их и
  // TODO уточнять подробную информацию о них, показывая для каждого из объявлений карточку.

  setDisabled('ad-form', false);
  setDisabled('map__filters', false);
}

export {enablePage};

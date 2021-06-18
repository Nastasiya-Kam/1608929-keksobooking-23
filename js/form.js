// 3. Ограничения, накладываемые на поля ввода
// ?Возможно соединить с модулем validation.js, т.к. в нём происходит проверка на валидность заполненных данных

// function submitForm () {
//   Если отправка данных прошла успешно, показывается соответствующее сообщение.
//   Если при отправке данных произошла ошибка запроса, показывается соответствующее сообщение
// }

function setDisabled (className, isDisabled) {
  const element = document.querySelector(`.${className}`);
  const elements = element.children;

  (isDisabled) ? element.classList.add(`${className}--disabled`) : element.classList.remove(`${className}--disabled`);

  for (let index = 0; index < elements.length; index++) {
    (isDisabled) ? elements[index].disabled = true : elements[index].disabled = false;
  }
}

function disablePage () {
  // TODO Реализация позднее. На месте карты отображается серый прямоугольник.

  setDisabled('ad-form', true);
  setDisabled('map__filters', true);
}

function enablePage () {
  // Загрузка и успешная инициализация карты (карта реализуется сторонней библиотекой Leaflet) переводит страницу в активное состояние.
  // ?if (карта загрузилась) {
  // ?или проверка загрузки карты будет в main.js: если загрузиласть, то enablePage(), иначе - disablePage();
  //   переводим в активное состояние
  // TODO После загрузки данных с сервера просматривать похожие объявления на карте,
  // TODO фильтровать их и
  // TODO уточнять подробную информацию о них, показывая для каждого из объявлений карточку.
  setDisabled('ad-form', false);
  setDisabled('map__filters', false);
  // ?}
}

export {disablePage, enablePage};

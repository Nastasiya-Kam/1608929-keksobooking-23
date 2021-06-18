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
  setDisabled('ad-form', true);
  setDisabled('map__filters', true);
}

function enablePage () {
  setDisabled('ad-form', false);
  setDisabled('map__filters', false);
}

export {disablePage, enablePage};

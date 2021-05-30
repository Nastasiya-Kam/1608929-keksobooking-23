function getRandomInteger (start, finish) {
  if (start < 0 || finish < 0) {
    return 'Диапазон может быть только положительный. Переопределите границы диапазона';
  }

  if (start >= finish) {
    return 'Начало диапазона больше или совпадает с его окончанием. Переопределите начало диапазона';
  }

  return Math.floor(Math.random() * (finish - start + 1) + start); //  Взято с MDN: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

getRandomInteger(2, 10);

function getInteger (number, decimal) {
  for (let index = 0; index < decimal; index++) {
    number *= 10;
  }

  return Math.floor(number);
}

function getRandomFloat (start, finish, decimalPlaces) {
  if (start < 0 || finish < 0) {
    return 'Диапазон может быть только положительный. Переопределите границы диапазона';
  }

  if (start >= finish) {
    return 'Начало диапазона больше или совпадает с его окончанием. Переопределите начало диапазона';
  }

  const startInt = getInteger(start, decimalPlaces);
  const finishInt = getInteger(finish, decimalPlaces);

  let number = Math.floor(Math.random() * (finishInt - startInt + 1) + startInt); // Взято с MDN: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const lengthNumber = (start === 0) ? decimalPlaces + 2 : String(number).length;

  for (let index = 0; index < decimalPlaces; index++) {
    number /= 10;
  }

  return (number < start) ? 'Число ниже указанного диапазона' : Number(String(number).substr(0, decimalPlaces + (lengthNumber - decimalPlaces + 1)));
}

getRandomFloat(0, 10, 5);

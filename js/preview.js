const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_SIZE = 70;

const chooserAvatar = document.querySelector('.ad-form-header input[type=file]');
const imgAvatar = document.querySelector('.ad-form-header__preview img');
const chooserImageProperty = document.querySelector('.ad-form__element input[type=file]');
const imgProperty = document.querySelector('.ad-form__photo');

const checkFormatFile = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

chooserAvatar.addEventListener('change', () => {
  const file = chooserAvatar.files[0];
  const isMatched = checkFormatFile(file);

  if (isMatched) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const createImageElement = () => {
  const element = document.createElement('img');

  element.alt = 'Фотография жилья';
  element.width = IMAGE_SIZE;
  element.height = IMAGE_SIZE;

  return element;
};

const imageElement = createImageElement();

chooserImageProperty.addEventListener('change', () => {
  const file = chooserImageProperty.files[0];
  const isMatched = checkFormatFile(file);

  if (isMatched) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imageElement.src = reader.result;
      imgProperty.appendChild(imageElement);
    });

    reader.readAsDataURL(file);
  }
});

'use strict';

const MOCK_DESCRTIPTIONS = [
  `фото`,
  `Как получилось`,
  `Отдых`,
  `Как вам`,
  `я не понял`,
];

const MOCK_MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const MOCK_NAMES = [
  `Арутур`,
  `Саша`,
  `Лена`,
  `Яна`
];

const NUMBER_OF_PHOTOS = 25;

function getRandomInt(min, max) {
  return Math.floor(Math.random(min) * Math.floor(max));
}

function getRandomElementFromArray(arr) {
  return arr[getRandomInt(1, arr.length)];
}

function generatePhotos(cnt) {
  const result = [];

  for (let i = 1; i <= cnt; i++) {
    result.push(generatePost(i));
  }

  return result;
}

function generatePost(i) {
  const post = {
    url: `photos/${i}.jpg`,
    description: getRandomElementFromArray(MOCK_DESCRTIPTIONS),
    likes: getRandomInt(15, 200),
    comments: [],
  };

  const commentsCount = getRandomInt(0, 5);

  for (let j = 1; j <= commentsCount; j++) {
    const comment = {
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomElementFromArray(MOCK_MESSAGES),
      name: getRandomElementFromArray(MOCK_NAMES)
    };

    post.comments.push(comment);
  }

  return post;
}

const photos = generatePhotos(NUMBER_OF_PHOTOS);

function init() {
  const picturesСontainerElement = document.querySelector(`.pictures`);
  const pictureTemplateElement = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const getPictureElement = function (photo) {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const pictureImgElement = pictureElement.querySelector(`.picture__img`);
    const image = photo.url;
    pictureImgElement.setAttribute(`src`, image);
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    return pictureElement;
  };
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(getPictureElement(photo));
  });
  picturesСontainerElement.appendChild(fragment);
}

init();

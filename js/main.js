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
  // const photos = generatePhotos(NUMBER_OF_PHOTOS);
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


// больше деталей часть 2

function usingComments() {
  const commentsElement = document.querySelector(`.social__comments`);

  for (let i = 0; i < photos[0].comments.length; i++) {
    const avatar = photos[0].comments[i].avatar;
    const commentatorName = photos[0].comments[i].name;
    const message = photos[0].comments[i].message;
    const templateСomments =
    `<li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${commentatorName}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`;
    commentsElement.insertAdjacentHTML(`beforeend`, templateСomments);
  }
}

usingComments();

function bigPictureInit() {
  const bigPictureElement = document.querySelector(`.big-picture`);
  bigPictureElement.classList.remove(`hidden`);
  const bigPictureImgElement = document.querySelector(`.big-picture__img`);
  const bigImg = bigPictureImgElement.children[0];
  bigImg.setAttribute(`src`, photos[0].url);

  const likesCountElement = document.querySelector(`.likes-count`);
  likesCountElement.textContent = photos[0].likes;

  const commentsCountElement = document.querySelector(`.comments-count`);
  commentsCountElement.textContent = photos[0].comments.length;

  const descriptionElement = document.querySelector(`.social__caption`);
  descriptionElement.textContent = photos[0].description;

  const commentCounterElement = document.querySelector(`.social__comment-count`);
  commentCounterElement.classList.add(`hidden`);
  const commentsLoaderElement = document.querySelector(`.comments-loader`);
  commentsLoaderElement.classList.add(`hidden`);

  const bodyElement = document.querySelector(`body`);
  bodyElement.classList.add(`modal-open`);

}

bigPictureInit();

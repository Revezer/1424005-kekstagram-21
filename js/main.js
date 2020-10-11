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

function showComments(photo) {
  const commentsElement = document.querySelector(`.social__comments`);

  photo.comments.forEach(function (comment) {
    const templateСomments =
      `<li class="social__comment">
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>`;
    commentsElement.insertAdjacentHTML(`beforeend`, templateСomments);
  });
}

const bodyElement = document.querySelector(`body`);

function bigPictureInit(photo) {
  const bigPictureElement = document.querySelector(`.big-picture`);
  const bigImg = bigPictureElement.querySelector(`.big-picture__img img`);
  bigImg.setAttribute(`src`, photo.url);

  const likesCountElement = bigPictureElement.querySelector(`.likes-count`);
  likesCountElement.textContent = photo.likes;

  const commentsCountElement = bigPictureElement.querySelector(`.comments-count`);
  commentsCountElement.textContent = photo.comments.length;

  const descriptionElement = bigPictureElement.querySelector(`.social__caption`);
  descriptionElement.textContent = photo.description;

  const commentCounterElement = bigPictureElement.querySelector(`.social__comment-count`);
  commentCounterElement.classList.add(`hidden`);
  const commentsLoaderElement = bigPictureElement.querySelector(`.comments-loader`);
  commentsLoaderElement.classList.add(`hidden`);

  bodyElement.classList.add(`modal-open`);

  showComments(photo);

}

bigPictureInit(photos[0]);


const modalOnload = document.querySelector(`#upload-file`);
const modalOpen = document.querySelector(`.img-upload__overlay`);
const modalClose = document.querySelector(`#upload-cancel`);

modalOnload.addEventListener(`click`, function () {
  modalOpen.classList.remove(`hidden`);
  bodyElement.classList.add(`modal-open`);
});

modalClose.addEventListener(`click`, function () {
  modalOpen.classList.add(`hidden`);
  bodyElement.classList.remove(`modal-open`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    modalOpen.classList.add(`hidden`);
    bodyElement.classList.remove(`modal-open`);
  }
});


const switchDownElement = document.querySelector(`.scale__control--smaller`);
const switchUpElement = document.querySelector(`.scale__control--bigger`);
const switchingValueElement = document.querySelector(`.scale__control--value`);
const imgCsaleElement = document.querySelector(`.img-upload__preview`);
switchingValueElement.value = `100%`;
const MIN_VALUE = `25%`;
const MAX_VALUE = `100%`;
const VALUE = 25;

function scale() {
  if (parseInt(switchingValueElement.value, 10) === 100) {
    imgCsaleElement.style.transform = `scale(1.0)`;
  } else {
    imgCsaleElement.style.transform = `scale(0.${switchingValueElement.value})`;
  }
}

switchDownElement.addEventListener(`click`, function () {
  if (switchingValueElement.value === MIN_VALUE) {
    return;
  } else {
    switchingValueElement.value = parseInt(switchingValueElement.value, 10) - VALUE;
    scale();
    switchingValueElement.value += `%`;
  }
});

switchUpElement.addEventListener(`click`, function () {
  if (switchingValueElement.value === MAX_VALUE) {
    return;
  } else {
    switchingValueElement.value = parseInt(switchingValueElement.value, 10) + VALUE;
    scale();
    switchingValueElement.value += `%`;
  }
});


const effectPinElement = document.querySelector(`.effect-level__pin`);
const filterImgElement = document.querySelector(`.img-upload__preview`);
const sliderElement = document.querySelector(`.img-upload__effect-level`);

effectPinElement.addEventListener(`mouseup`, function () {
  filterImgElement.style.filter = null;
});


const effectNoneElement = document.querySelector(`#effect-none`);

const effectsElements = {
  chrome: document.querySelector(`#effect-chrome`),
  sepia: document.querySelector(`#effect-sepia`),
  marvin: document.querySelector(`#effect-marvin`),
  phobos: document.querySelector(`#effect-phobos`),
  heat: document.querySelector(`#effect-heat`)
};

const filter = {
  chromium: `filter: grayscale(1)`,
  sepia: `filter: sepia(1)`,
  marvin: `filter: invert(100%)`,
  phobos: `filter: blur(3px)`,
  heat: `filter: brightness(3)`
};

effectNoneElement.addEventListener(`click`, function () {
  sliderElement.style = `display: none`;
  filterImgElement.style.filter = null;
  switchingValueElement.value = `100%`;
});

function filterInit(effectsImg, filterImg) {
  effectsImg.addEventListener(`click`, function () {
    sliderElement.style.display = null;
    filterImgElement.style.filter = null;
    filterImgElement.style = filterImg;
    switchingValueElement.value = `100%`;
  });
}

filterInit(effectsElements.chrome, filter.chromium);
filterInit(effectsElements.sepia, filter.sepia);
filterInit(effectsElements.marvin, filter.marvin);
filterInit(effectsElements.phobos, filter.phobos);
filterInit(effectsElements.heat, filter.heat);


const hasttagsElement = document.querySelector(`.text__hashtags`);
const re = /^#[\w]{1,19}/;
const MAX_TAGS = 6;

hasttagsElement.addEventListener(`input`, function () {
  let arrayTags = hasttagsElement.value;
  const arrayHasttags = arrayTags.split(` `);
  arrayHasttags.forEach(function (i) {
    if (re.test(i) === false) {
      hasttagsElement.setCustomValidity(`перед началом тэга поставьте #, используйте буквы и цифры`);
    } else {
      hasttagsElement.setCustomValidity(``);
    }
  });
  if (arrayHasttags.length >= MAX_TAGS) {
    hasttagsElement.setCustomValidity(`тэгов может быть не больше 5`);
  }

  hasttagsElement.reportValidity();
});



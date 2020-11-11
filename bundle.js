/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/const.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const NUMBER_OF_PHOTOS = 25;

const FILTER_CHROMIUM_SEPIA_VALUE = 1;
const FILTER_MARVIN_VALUE = `100%`;
const FILTER_PHOBOS_VALUE = `3px`;
const FILTER_HEAT_VALUE = 3;

const MIN_ZOOM_VALUE = 25;
const MAX_ZOOM_VALUE = 100;
const ZOOM_VALUE_STEP = 25;
const STANDART_SLIDER_POSITION = `450px`;
const STANDART_SCALE_IMG = 1;

const FILTER_LETTERS = /[^grayscale|sepia|invert|blur|brightness][{(0-9px)}]+/g;
const FILTER_EFFECTS = {
  chromium: {
    min: 0,
    max: 1
  },
  sepia: {
    min: 0,
    max: 1
  },
  marvin: {
    min: 0,
    max: 100
  },
  phobos: {
    min: 0,
    max: 3
  },
  heat: {
    min: 1,
    max: 3
  }
};

const FILTER_TAGS = /^#[\wА-Яа-я]{1,19}$/;
const MAX_TAGS = 6;
const MAX_COMMENT_LENGTH = 140;

const MAX_PIN_VALUE = 450;
const MIN_PIN_VALUE = 0;

const COMMENTS_PER_PAGE = 5;

const RANDOM_PICTURE_LENGTH = 10;
const FILTER_DEFAULT = 1;
const FILTER_RANDOM = 2;
const FILTER_COMMENTS = 3;
const DEBOUNCE_INTERVAL = 5000;

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

window.const = {
  NUMBER_OF_PHOTOS,
  FILTER_CHROMIUM_SEPIA_VALUE,
  FILTER_MARVIN_VALUE,
  FILTER_PHOBOS_VALUE,
  FILTER_HEAT_VALUE,
  MIN_ZOOM_VALUE,
  MAX_ZOOM_VALUE,
  ZOOM_VALUE_STEP,
  STANDART_SLIDER_POSITION,
  STANDART_SCALE_IMG,
  FILTER_LETTERS,
  FILTER_EFFECTS,
  FILTER_TAGS,
  MAX_TAGS,
  MAX_COMMENT_LENGTH,
  MAX_PIN_VALUE,
  MIN_PIN_VALUE,
  COMMENTS_PER_PAGE,
  RANDOM_PICTURE_LENGTH,
  FILTER_DEFAULT,
  FILTER_RANDOM,
  FILTER_COMMENTS,
  DEBOUNCE_INTERVAL,
  FILE_TYPES
};

})();

(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const bodyElement = document.querySelector(`body`);
const picturesListElement = document.querySelector(`.pictures`);
const filtersButtonsElement = document.querySelectorAll(`.img-filters__button`);

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getRandomElementFromArray(arr) {
  return arr[getRandomInt(1, arr.length)];
}

function resetGallery() {
  while (picturesListElement.children.length > 2) {
    picturesListElement.removeChild(picturesListElement.lastChild);
  }
}

function activeButton(button) {
  Array.from(filtersButtonsElement).forEach(function (element) {
    element.classList.remove(`img-filters__button--active`);
  });
  button.classList.add(`img-filters__button--active`);
}

function getRandomPicture(pictureObjects) {
  const randomPictureObjects = [];
  const pictureObjectsCopy = pictureObjects.slice();
  for (let i = 0; i < window.const.RANDOM_PICTURE_LENGTH; i++) {
    const randomIndex = window.util.getRandomInt(0, pictureObjectsCopy.length - 1);
    randomPictureObjects.push(pictureObjectsCopy[randomIndex]);
    pictureObjectsCopy.splice(randomIndex, 1);
  }
  return randomPictureObjects;
}
function sortByCommentsPicture(pictureObjects) {
  return pictureObjects.slice().sort((left, right) => right.comments.length - left.comments.length);
}

window.util = {
  bodyElement,
  getRandomInt,
  getRandomElementFromArray,
  resetGallery,
  activeButton,
  getRandomPicture,
  sortByCommentsPicture
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL_ADDRESS = `https://21.javascript.pages.academy/kekstagram`;
const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};

const handleRequest = (onSuccess, onError, xhr) => {
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};


const loadPhotos = (successHandler, errorHandler) => {
  const xhr = new XMLHttpRequest();
  handleRequest(successHandler, errorHandler, xhr);

  xhr.open(`GET`, `${URL_ADDRESS}/data`);
  xhr.send();
};

const uploadPhoto = (data, successHandler, errorHandler) => {
  const xhr = new XMLHttpRequest();
  handleRequest(successHandler, errorHandler, xhr);

  xhr.open(`POST`, URL_ADDRESS);
  xhr.send(data);
};

window.backend = {
  loadPhotos,
  uploadPhoto
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const modalOpenElement = document.querySelector(`.img-upload__overlay`);
const modalCloseElement = document.querySelector(`#upload-cancel`);
const photoPreviewElement = document.querySelector(`.img-upload__preview img`);
const effectPreviewElement = document.querySelectorAll(`.effects__preview`);
const hasttagsElement = document.querySelector(`.text__hashtags`);
const textDescriptionElement = document.querySelector(`.text__description`);

function resetForm() {
  modalOpenElement.classList.add(`hidden`);
  filterImgElement.style.filter = null;
  effectPinElement.style.left = window.const.STANDART_SLIDER_POSITION;
  effectDepthElement.style.width = window.const.STANDART_SLIDER_POSITION;
  hasttagsElement.value = ``;
  textDescriptionElement.value = ``;
  window.util.bodyElement.classList.remove(`modal-open`);
  photoPreviewElement.src = `img/upload-default-image.jpg`;
  effectPreviewElement.forEach(function (element) {
    element.style = ``;
  });
}


modalCloseElement.addEventListener(`click`, function () {
  resetForm();
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    if (evt.target.className === `text__hashtags`) {
      return;
    }
    if (evt.target.className === `text__description`) {
      return;
    }
    resetForm();
    window.resetPreview();
  }
});


const switchDownElement = document.querySelector(`.scale__control--smaller`);
const switchUpElement = document.querySelector(`.scale__control--bigger`);
const switchingValueElement = document.querySelector(`.scale__control--value`);
const imgCsaleElement = document.querySelector(`.img-upload__preview`);


switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;

function scale() {
  imgCsaleElement.style.transform = `scale(${switchingValueElement.value / window.const.MAX_ZOOM_VALUE})`;
}

switchDownElement.addEventListener(`click`, function () {
  if (parseInt(switchingValueElement.value, 10) <= window.const.MIN_ZOOM_VALUE) {
    return;
  }
  switchingValueElement.value = parseInt(switchingValueElement.value, 10) - window.const.ZOOM_VALUE_STEP;
  scale();
  switchingValueElement.value += `%`;
});

switchUpElement.addEventListener(`click`, function () {
  if (parseInt(switchingValueElement.value, 10) >= window.const.MAX_ZOOM_VALUE) {
    return;
  }
  switchingValueElement.value = parseInt(switchingValueElement.value, 10) + window.const.ZOOM_VALUE_STEP;
  scale();
  switchingValueElement.value += `%`;
});


const effectPinElement = document.querySelector(`.effect-level__pin`);
const filterImgElement = document.querySelector(`.img-upload__preview`);
const sliderElement = document.querySelector(`.img-upload__effect-level`);
const effectDepthElement = document.querySelector(`.effect-level__depth`);


const effectNoneElement = document.querySelector(`#effect-none`);

const effectsElements = {
  chrome: document.querySelector(`#effect-chrome`),
  sepia: document.querySelector(`#effect-sepia`),
  marvin: document.querySelector(`#effect-marvin`),
  phobos: document.querySelector(`#effect-phobos`),
  heat: document.querySelector(`#effect-heat`)
};

const filter = {
  chromium: `filter: grayscale(${window.const.FILTER_CHROMIUM_SEPIA_VALUE})`,
  sepia: `filter: sepia(${window.const.FILTER_CHROMIUM_SEPIA_VALUE})`,
  marvin: `filter: invert(${window.const.FILTER_MARVIN_VALUE})`,
  phobos: `filter: blur(${window.const.FILTER_PHOBOS_VALUE})`,
  heat: `filter: brightness(${window.const.FILTER_HEAT_VALUE})`
};

effectNoneElement.addEventListener(`click`, function () {
  sliderElement.style = `display: none`;
  filterImgElement.style.filter = null;
  switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;
});

function filterInit(effectsImg, filterImg) {
  effectsImg.addEventListener(`click`, function () {
    sliderElement.style.display = null;
    filterImgElement.style.filter = null;
    filterImgElement.style = filterImg;
    switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;
    effectPinElement.style.left = window.const.STANDART_SLIDER_POSITION;
    effectDepthElement.style.width = window.const.STANDART_SLIDER_POSITION;
  });
}

filterInit(effectsElements.chrome, filter.chromium);
filterInit(effectsElements.sepia, filter.sepia);
filterInit(effectsElements.marvin, filter.marvin);
filterInit(effectsElements.phobos, filter.phobos);
filterInit(effectsElements.heat, filter.heat);

function checkMacthingHashtags(arr) {
  let hashtagsCopy = arr.slice();
  let element;
  let checkMacth;
  while (hashtagsCopy.length) {
    element = hashtagsCopy.shift();
    if (hashtagsCopy.indexOf(element) >= 0) {
      checkMacth = true;
    }
  }
  return checkMacth;
}


hasttagsElement.addEventListener(`input`, function () {
  let arrayTags = hasttagsElement.value.toLowerCase();
  const arrayHasttags = arrayTags.split(` `);
  arrayHasttags.forEach(function (i) {
    if (window.const.FILTER_TAGS.test(i) === false) {
      hasttagsElement.setCustomValidity(`перед началом тэга поставьте #, используйте буквы и цифры`);
    } else {
      hasttagsElement.setCustomValidity(``);
    }
  });
  if (arrayHasttags.length >= window.const.MAX_TAGS) {
    hasttagsElement.setCustomValidity(`тэгов может быть не больше 5`);
  }
  if (checkMacthingHashtags(arrayHasttags) === true) {
    hasttagsElement.setCustomValidity(`повторение тегов недопустимо`);
  }

  hasttagsElement.reportValidity();
});

textDescriptionElement.addEventListener(`input`, function () {
  let valueLength = textDescriptionElement.value.length;

  if (valueLength > window.const.MAX_COMMENT_LENGTH) {
    textDescriptionElement.setCustomValidity(`Удалите лишние ` + (valueLength - window.const.MAX_COMMENT_LENGTH) + ` симв.`);
  } else {
    textDescriptionElement.setCustomValidity(``);
  }

  textDescriptionElement.reportValidity();
});

const formElement = document.querySelector(`.img-upload__form`);

const outputStatusContainerElement = document.querySelector(`main`);
const errorTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
const successTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);

function outputStatusError() {
  const errorTemplate = errorTemplateElement.cloneNode(true);
  outputStatusContainerElement.appendChild(errorTemplate);
}

function outputStatusSuccess() {
  const successTemplate = successTemplateElement.cloneNode(true);
  outputStatusContainerElement.appendChild(successTemplate);
}

outputStatusSuccess();
outputStatusError();

const successPopupElement = document.querySelector(`.success`);
const errorPopupElement = document.querySelector(`.error`);

document.addEventListener(`click`, function () {
  successPopupElement.classList.add(`hidden`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    successPopupElement.classList.add(`hidden`);
  }
});

document.addEventListener(`click`, function () {
  errorPopupElement.classList.add(`hidden`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    errorPopupElement.classList.add(`hidden`);
  }
});


formElement.addEventListener(`submit`, function (evt) {
  window.backend.uploadPhoto(new FormData(formElement), function () {
    successPopupElement.classList.remove(`hidden`);
    resetForm();
  }, function () {
    errorPopupElement.classList.remove(`hidden`);
    resetForm();
  });
  evt.preventDefault();
});

const fileChooser = document.querySelector(`#upload-file`);

fileChooser.addEventListener(`change`, function () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.const.FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      photoPreviewElement.src = reader.result;
      effectPreviewElement.forEach(function (element) {
        element.style = `background-image: url("` + reader.result + `")`;
      });
      modalOpenElement.classList.remove(`hidden`);
      window.util.bodyElement.classList.add(`modal-open`);
      switchingValueElement.value = window.const.MAX_ZOOM_VALUE + `%`;
      imgCsaleElement.style.transform = `scale(` + window.const.STANDART_SCALE_IMG + `)`;
      sliderElement.style = `display: none`;
    });

    reader.readAsDataURL(file);
  }
});

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const filtersButtonsElement = document.querySelectorAll(`.img-filters__button`);
const FILTER_DEFAULT_BUTTON = filtersButtonsElement[0];
const FILTER_RANDOM_BUTTON = filtersButtonsElement[1];
const FILTER_COMMENTS_BUTTON = filtersButtonsElement[2];
const fragment = document.createDocumentFragment();
const imgFiltersElement = document.querySelector(`.img-filters`);
const picturesСontainerElement = document.querySelector(`.pictures`);
const pictureTemplateElement = document.querySelector(`#picture`).content.querySelector(`.picture`);
let defaultList = [];

function defaultLoadPhotos() {
  window.backend.loadPhotos(function (photos) {
    defaultList = photos;
    init(window.const.FILTER_DEFAULT);
    imgFiltersElement.classList.remove(`hidden`);
  }, function () {});
}

const getPictureElement = function (photo) {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector(`.picture__img`);
  const image = photo.url;
  pictureImgElement.setAttribute(`src`, image);
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  return pictureElement;
};

function init(comparison) {
  switch (comparison) {
    case window.const.FILTER_DEFAULT:
      defaultList.forEach((photo) => {
        fragment.appendChild(getPictureElement(photo));
      });
      picturesСontainerElement.appendChild(fragment);
      window.setListener(defaultList);
      break;
    case window.const.FILTER_RANDOM:
      const randomList = window.util.getRandomPicture(defaultList);
      randomList.forEach((photo) => {
        fragment.appendChild(getPictureElement(photo));
      });
      picturesСontainerElement.appendChild(fragment);
      window.setListener(randomList);
      break;
    case window.const.FILTER_COMMENTS:
      const commentsList = window.util.sortByCommentsPicture(defaultList);
      commentsList.forEach((photo) => {
        fragment.appendChild(getPictureElement(photo));
      });
      picturesСontainerElement.appendChild(fragment);
      window.setListener(commentsList);
  }
}

defaultLoadPhotos();

const filterDefaultElement = document.querySelector(`#filter-default`);
const buttonRandomElement = document.querySelector(`#filter-random`);
const filterCommentsElement = document.querySelector(`#filter-discussed`);
let lastTimeout;

function debounce(filter) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function () {
    window.util.resetGallery();
    init(filter);
  }, window.const.DEBOUNCE_INTERVAL);
}

filterDefaultElement.addEventListener(`click`, function () {
  window.util.activeButton(FILTER_DEFAULT_BUTTON);
  debounce(window.const.FILTER_DEFAULT);
});

buttonRandomElement.addEventListener(`click`, function () {
  window.util.activeButton(FILTER_RANDOM_BUTTON);
  debounce(window.const.FILTER_RANDOM);
});

filterCommentsElement.addEventListener(`click`, function () {
  window.util.activeButton(FILTER_COMMENTS_BUTTON);
  debounce(window.const.FILTER_COMMENTS);
});

})();

(() => {
/*!***********************!*\
  !*** ./js/preview.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const commentsElement = document.querySelector(`.social__comments`);
const showingCommentsElement = document.querySelector(`.comments-showing`);
const commentLoaderElement = document.querySelector(`.social__comments-loader`);
let displayCount = window.const.COMMENTS_PER_PAGE;
let photosComments = [];

function showComments(photo, commentCount) {
  const commentsToDisplay = photo.comments.slice(0, commentCount);
  commentsToDisplay.forEach(function (comment) {
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


const bigPictureElement = document.querySelector(`.big-picture`);
const bigImgElement = bigPictureElement.querySelector(`.big-picture__img img`);
const likesCountElement = bigPictureElement.querySelector(`.likes-count`);
const commentsCountElement = bigPictureElement.querySelector(`.comments-count`);
const descriptionElement = bigPictureElement.querySelector(`.social__caption`);

function bigPictureInit(photo) {
  bigPictureElement.classList.remove(`hidden`);

  bigImgElement.setAttribute(`src`, photo.url);

  likesCountElement.textContent = photo.likes;

  commentsCountElement.textContent = photo.comments.length;

  descriptionElement.textContent = photo.description;

  window.util.bodyElement.classList.add(`modal-open`);

  showComments(photo, displayCount);

  showingCommentsElement.textContent = commentsElement.children.length;
}


const closePreviewElement = document.querySelector(`.big-picture__cancel`);
const deleteCommentsElement = document.querySelector(`.social__comments`);

window.resetPreview = function () {
  bigPictureElement.classList.add(`hidden`);
  window.util.bodyElement.classList.remove(`modal-open`);
  deleteCommentsElement.innerText = ``;
  displayCount = window.const.COMMENTS_PER_PAGE;
  commentLoaderElement.classList.remove(`hidden`);
};

closePreviewElement.addEventListener(`click`, function () {
  window.resetPreview();
});

window.setListener = function (photos) {
  const openPreviewElements = document.querySelectorAll(`.picture`);

  openPreviewElements.forEach((element, i) => {
    element.addEventListener(`click`, function () {
      bigPictureInit(photos[i]);
      photosComments = photos[i];
    });
  });
};

const sliderPinElement = document.querySelector(`.effect-level__pin`);
const filterValueElement = document.querySelector(`.img-upload__preview`);
const sliderDepthElement = document.querySelector(`.effect-level__depth`);
const effectLevelElement = document.querySelector(`.effect-level__line`);

function filterChange(name, filters, value, sign) {
  filterValueElement.style.filter = name + (filters.max - filters.min) * value + sign;
}

sliderPinElement.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX
  };

  function onDocumentMouseMove(moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    let numLevel = (sliderPinElement.offsetLeft - shift.x);

    if (numLevel > window.const.MAX_PIN_VALUE) {
      numLevel = window.const.MAX_PIN_VALUE;
    }

    if (numLevel < window.const.MIN_PIN_VALUE) {
      numLevel = window.const.MIN_PIN_VALUE;
    }

    sliderPinElement.style.left = numLevel + `px`;
    sliderDepthElement.style.width = sliderPinElement.style.left;


    const value = sliderPinElement.offsetLeft / effectLevelElement.clientWidth;

    switch (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``)) {
      case `grayscale`:
        filterChange(`grayscale(`, window.const.FILTER_EFFECTS.chromium, value, `)`);
        break;
      case `sepia`:
        filterChange(`sepia(`, window.const.FILTER_EFFECTS.sepia, value, `)`);
        break;
      case `invert`:
        filterChange(`invert(`, window.const.FILTER_EFFECTS.marvin, value, `%)`);
        break;
      case `blur`:
        filterChange(`blur(`, window.const.FILTER_EFFECTS.phobos, value, `px)`);
        break;
      case `brightness`:
        filterChange(`brightness(`, window.const.FILTER_EFFECTS.heat, value, `)`);
    }
  }


  function onDocumentMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onDocumentMouseMove);
    document.removeEventListener(`mouseup`, onDocumentMouseUp);
  }
  document.addEventListener(`mousemove`, onDocumentMouseMove);
  document.addEventListener(`mouseup`, onDocumentMouseUp);
});


commentLoaderElement.addEventListener(`click`, function () {
  displayCount += window.const.COMMENTS_PER_PAGE;
  if (displayCount >= commentsCountElement.textContent) {
    displayCount = commentsCountElement.textContent;
    commentLoaderElement.classList.add(`hidden`);
  }
  deleteCommentsElement.innerText = ``;
  showComments(photosComments, displayCount);
  showingCommentsElement.textContent = commentsElement.children.length;
});

})();

/******/ })()
;
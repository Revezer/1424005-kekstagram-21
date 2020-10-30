'use strict';

const commentsElement = document.querySelector(`.social__comments`);
const showingCommentsElement = document.querySelector(`.comments-showing`);
let arrayСounter = window.const.NUMBER_COMMENTS;
let sliderArray = [];

function showComments(photo) {
  for (let i = 0; i < photo.comments.length; i += window.const.ARRAY_SIZE) {
    sliderArray.push(photo.comments.slice(i, i + window.const.ARRAY_SIZE));
  }
  sliderArray[window.const.NUMBER_COMMENTS].forEach(function (comment) {
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
const bigImg = bigPictureElement.querySelector(`.big-picture__img img`);
const likesCountElement = bigPictureElement.querySelector(`.likes-count`);
const commentsCountElement = bigPictureElement.querySelector(`.comments-count`);
const descriptionElement = bigPictureElement.querySelector(`.social__caption`);

function bigPictureInit(photo) {
  bigPictureElement.classList.remove(`hidden`);

  bigImg.setAttribute(`src`, photo.url);

  likesCountElement.textContent = photo.likes;

  commentsCountElement.textContent = photo.comments.length;

  descriptionElement.textContent = photo.description;

  window.util.bodyElement.classList.add(`modal-open`);

  showComments(photo);

  showingCommentsElement.textContent = commentsElement.children.length;

  arrayСounter = window.const.NUMBER_COMMENTS;
}


const closePreviewElement = document.querySelector(`.big-picture__cancel`);
const deleteCommentsElement = document.querySelector(`.social__comments`);

closePreviewElement.addEventListener(`click`, function () {
  bigPictureElement.classList.add(`hidden`);
  window.util.bodyElement.classList.remove(`modal-open`);
  deleteCommentsElement.innerHTML = ``;
  sliderArray = [];
  commentLoaderElement.classList.remove(`hidden`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    bigPictureElement.classList.add(`hidden`);
    window.util.bodyElement.classList.remove(`modal-open`);
    deleteCommentsElement.innerHTML = ``;
    sliderArray = [];
    commentLoaderElement.classList.remove(`hidden`);
  }
});
window.setListener = function () {
  const openPreviewElements = document.querySelectorAll(`.picture`);

  openPreviewElements.forEach((element, i) => {
    element.addEventListener(`click`, function () {
      window.backend.loadPhotos(function (photos) {
        bigPictureInit(photos[i]);
      }, function () { });
    });
  });
};


const sliderPinElement = document.querySelector(`.effect-level__pin`);
const filterValueElement = document.querySelector(`.img-upload__preview`);
const sliderDepthElement = document.querySelector(`.effect-level__depth`);
const effectLevelElement = document.querySelector(`.effect-level__line`);

function filterСhange(name, filters, value, sign) {
  filterValueElement.style.filter = name + (filters.max - filters.min) * value + sign;
}

sliderPinElement.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    sliderPinElement.style.left = (sliderPinElement.offsetLeft - shift.x) + `px`;
    sliderDepthElement.style.width = sliderPinElement.style.left;
    if (startCoords.x > window.const.MAX_VALUE_SIZE) {
      sliderPinElement.style.left = window.const.MAX_PIN_VALUE;
    }

    if (startCoords.x < window.const.MIN_VALUE_SIZE) {
      sliderPinElement.style.left = window.const.MIN_PIN_VALUE;
    }

    const value = sliderPinElement.offsetLeft / effectLevelElement.clientWidth;

    switch (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``)) {
      case `grayscale`:
        filterСhange(`grayscale(`, window.const.FILTER_EFFECTS.chromium, value, `)`);
        break;
      case `sepia`:
        filterСhange(`sepia(`, window.const.FILTER_EFFECTS.sepia, value, `)`);
        break;
      case `invert`:
        filterСhange(`invert(`, window.const.FILTER_EFFECTS.marvin, value, `%)`);
        break;
      case `blur`:
        filterСhange(`blur(`, window.const.FILTER_EFFECTS.phobos, value, `px)`);
        break;
      case `brightness`:
        filterСhange(`brightness(`, window.const.FILTER_EFFECTS.heat, value, `)`);
    }
  };


  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

const commentLoaderElement = document.querySelector(`.social__comments-loader`);

commentLoaderElement.addEventListener(`click`, function () {

  if (arrayСounter < sliderArray.length) {
    arrayСounter += window.const.STEP_COMMENT;
  }

  sliderArray[arrayСounter].forEach(function (comment) {
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

  showingCommentsElement.textContent = commentsElement.children.length;

  if (commentsElement.children.length >= commentsCountElement.textContent) {
    commentLoaderElement.classList.add(`hidden`);
  }
});

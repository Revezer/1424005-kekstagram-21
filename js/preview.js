'use strict';

const commentsElement = document.querySelector(`.social__comments`);

function showComments(photo) {
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

const bigPictureElement = document.querySelector(`.big-picture`);
const bigImg = bigPictureElement.querySelector(`.big-picture__img img`);
const likesCountElement = bigPictureElement.querySelector(`.likes-count`);
const commentsCountElement = bigPictureElement.querySelector(`.comments-count`);
const descriptionElement = bigPictureElement.querySelector(`.social__caption`);
const commentCounterElement = bigPictureElement.querySelector(`.social__comment-count`);
const commentsLoaderElement = bigPictureElement.querySelector(`.comments-loader`);

function bigPictureInit(photo) {
  bigPictureElement.classList.remove(`hidden`);

  bigImg.setAttribute(`src`, photo.url);

  likesCountElement.textContent = photo.likes;

  commentsCountElement.textContent = photo.comments.length;

  descriptionElement.textContent = photo.description;

  commentCounterElement.classList.add(`hidden`);
  commentsLoaderElement.classList.add(`hidden`);

  window.util.bodyElement.classList.add(`modal-open`);

  showComments(photo);

}


const openPreviewElements = document.querySelectorAll(`.picture`);
const closePreviewElement = document.querySelector(`.big-picture__cancel`);

closePreviewElement.addEventListener(`click`, function () {
  bigPictureElement.classList.add(`hidden`);
  commentCounterElement.classList.remove(`hidden`);
  commentsLoaderElement.classList.remove(`hidden`);
  window.util.bodyElement.classList.remove(`modal-open`);
  const deleteCommentsElement = document.querySelector(`.social__comments`);
  deleteCommentsElement.innerHTML = ``;
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    bigPictureElement.classList.add(`hidden`);
    window.util.bodyElement.classList.remove(`modal-open`);
  }
});

openPreviewElements.forEach((element, i) => {
  element.addEventListener(`click`, function () {
    bigPictureInit(window.main.photos[i]);
  });
});


const sliderPinElement = document.querySelector(`.effect-level__pin`);
const filterValueElement = document.querySelector(`.img-upload__preview`);
const sliderDepthElement = document.querySelector(`.effect-level__depth`);
const effectLevelElement = document.querySelector(`.effect-level__line`);
const FILTER_EFFECTS = {
  chromium: {
    min: 0,
    max: 100
  },
  sepia: {
    min: 0,
    max: 100
  },
  marvin: {
    min: 0,
    max: 100
  },
  phobos: {
    min: 0,
    max: 18
  },
  heat: {
    min: 1,
    max: 10
  }
};
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
        filterСhange(`grayscale(`, FILTER_EFFECTS.chromium, value, `%)`);
        break;
      case `sepia`:
        filterСhange(`sepia(`, FILTER_EFFECTS.sepia, value, `%)`);
        break;
      case `invert`:
        filterСhange(`invert(`, FILTER_EFFECTS.marvin, value, `%)`);
        break;
      case `blur`:
        filterСhange(`blur(`, FILTER_EFFECTS.phobos, value, `px)`);
        break;
      case `brightness`:
        filterСhange(`brightness(`, FILTER_EFFECTS.heat, value, `)`);
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

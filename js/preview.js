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
const chromium = {};
const sepia = {};
const marvin = {};
const phobos = {};
const heat = {};


window.util.filterValue(chromium, `grayscale`, window.const.STEP_FILTER_CHROMIUM_SEPIA_MARVIN, `%`);
window.util.filterValue(sepia, `sepia`, window.const.STEP_FILTER_CHROMIUM_SEPIA_MARVIN, `%`);
window.util.filterValue(marvin, `invert`, window.const.STEP_FILTER_CHROMIUM_SEPIA_MARVIN, `%`);
window.util.filterValue(phobos, `blur`, window.const.STEP_FILTER_PHOBOS, `px`);
window.util.filterValue(heat, `brightness`, window.const.STEP_FILTER_PHOBOS, ``);


function filterСhange(filters, value) {
  if (value <= 0) {
    filterValueElement.style.filter = filters.value0;
  }

  if (value > 0) {
    filterValueElement.style.filter = filters.value10;
  }

  if (value > 50) {
    filterValueElement.style.filter = filters.value20;
  }

  if (value > 100) {
    filterValueElement.style.filter = filters.value30;
  }

  if (value > 150) {
    filterValueElement.style.filter = filters.value40;
  }

  if (value > 200) {
    filterValueElement.style.filter = filters.value50;
  }

  if (value > 250) {
    filterValueElement.style.filter = filters.value60;
  }

  if (value > 300) {
    filterValueElement.style.filter = filters.value70;
  }

  if (value > 350) {
    filterValueElement.style.filter = filters.value80;
  }

  if (value > 400) {
    filterValueElement.style.filter = filters.value90;
  }

  if (value >= 450) {
    filterValueElement.style.filter = filters.value100;
  }
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

    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `grayscale`) {
      filterСhange(chromium, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `sepia`) {
      filterСhange(sepia, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `invert`) {
      filterСhange(marvin, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `blur`) {
      filterСhange(phobos, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
    }
    if (filterValueElement.style.filter.replace(window.const.FILTER_LETTERS, ``) === `brightness`) {
      filterСhange(heat, sliderPinElement.style.left.match(window.const.FILTER_NUMBER));
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

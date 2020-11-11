'use strict';

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

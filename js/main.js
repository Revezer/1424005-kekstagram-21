'use strict';

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

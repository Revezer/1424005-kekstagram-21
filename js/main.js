'use strict';


function init(comparison) {
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
  switch (comparison) {
    case window.const.FILTER_DEFAULT:
      window.backend.loadPhotos(function (photos) {
        const fragment = document.createDocumentFragment();
        photos.forEach((photo) => {
          fragment.appendChild(getPictureElement(photo));
        });
        picturesСontainerElement.appendChild(fragment);
        window.setListener(photos);
      }, function () {});
      break;
    case window.const.FILTER_RANDOM:
      window.backend.loadPhotos(function (photos) {
        const randomList = window.util.getRandomPicture(photos);
        const fragment = document.createDocumentFragment();
        randomList.forEach((photo) => {
          fragment.appendChild(getPictureElement(photo));
        });
        picturesСontainerElement.appendChild(fragment);
        window.setListener(randomList);
      }, function () {});
      break;
    case window.const.FILTER_COMMENTS:
      window.backend.loadPhotos(function (photos) {
        const commentsList = window.util.sortByCommentsPicture(photos);
        const fragment = document.createDocumentFragment();
        commentsList.forEach((photo) => {
          fragment.appendChild(getPictureElement(photo));
        });
        picturesСontainerElement.appendChild(fragment);
        window.setListener(commentsList);
      }, function () {});
  }
}

init(window.const.FILTER_DEFAULT);

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
  window.util.activeButton(window.const.FILTER_DEFAULT_BUTTON);
  debounce(window.const.FILTER_DEFAULT);
});

buttonRandomElement.addEventListener(`click`, function () {
  window.util.activeButton(window.const.FILTER_RANDOM_BUTTON);
  debounce(window.const.FILTER_RANDOM);
});

filterCommentsElement.addEventListener(`click`, function () {
  window.util.activeButton(window.const.FILTER_COMMENTS_BUTTON);
  debounce(window.const.FILTER_COMMENTS);
});

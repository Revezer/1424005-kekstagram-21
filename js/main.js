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
        window.setListener();
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
        window.setListener();
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
        window.setListener();
      }, function () {});
  }
}

init(window.const.FILTER_DEFAULT);

const filterDefaultElement = document.querySelector(`#filter-default`);
const buttonRandomElement = document.querySelector(`#filter-random`);
const filterCommentsElement = document.querySelector(`#filter-discussed`);

filterDefaultElement.addEventListener(`click`, function () {
  window.util.resetGallery();
  window.util.activeButton(window.const.FILTER_DEFAULT_BUTTON);
  init(window.const.FILTER_DEFAULT);
});

buttonRandomElement.addEventListener(`click`, function () {
  window.util.resetGallery();
  window.util.activeButton(window.const.FILTER_RANDOM_BUTTON);
  init(window.const.FILTER_RANDOM);
});

filterCommentsElement.addEventListener(`click`, function () {
  window.util.resetGallery();
  window.util.activeButton(window.const.FILTER_COMMENTS_BUTTON);
  init(window.const.FILTER_COMMENTS);
});

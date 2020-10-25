'use strict';

(function () {
  const photos = window.data.generatePhotos(window.const.NUMBER_OF_PHOTOS);

  window.main = {
    photos
  };
})();


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
  window.download(function (photos) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(getPictureElement(photos[i]));
    }
    picturesСontainerElement.appendChild(fragment);
    window.setListener();
  }, function () {});
}

init();

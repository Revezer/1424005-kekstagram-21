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
  const fragment = document.createDocumentFragment();
  window.main.photos.forEach((photo) => {
    fragment.appendChild(getPictureElement(photo));
  });
  picturesСontainerElement.appendChild(fragment);
}

init();

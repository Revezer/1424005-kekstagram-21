'use strict';


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
  window.backend.loadPhotos(function (photos) {
    const fragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      fragment.appendChild(getPictureElement(photo));
    });
    picturesСontainerElement.appendChild(fragment);
    window.setListener();
  }, function () {});
}

init();
